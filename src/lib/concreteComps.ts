import { ConcreteComp } from '../types';
import { requireSupabase } from './supabase';

/** Postgres table that stores the dynamic gallery records. */
export const CONCRETE_COMP_TABLE = 'concrete_comp_edgar';

/** Supabase Storage bucket that stores the gallery images. */
export const GALLERY_BUCKET = 'galery_edgar';

/** Maximum accepted image size (5 MB). */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

/** Stages reported back to the UI so it can show precise loading states. */
export type ConcreteCompStage = 'uploading' | 'creating' | 'updating' | 'deleting';

export interface ConcreteCompInput {
  titulo: string;
  descripcion: string;
  file?: File | null;
}

interface StageOptions {
  onStage?: (stage: ConcreteCompStage) => void;
}

/**
 * Validates a file before it reaches Storage.
 * Returns null when the file is acceptable, otherwise a machine-readable reason.
 */
export function validateImageFile(file: File): 'invalid-type' | 'too-large' | null {
  if (!file.type.startsWith('image/')) return 'invalid-type';
  if (file.size > MAX_IMAGE_SIZE_BYTES) return 'too-large';
  return null;
}

function buildUniqueFileName(file: File): string {
  const dotIndex = file.name.lastIndexOf('.');
  const rawExtension = dotIndex > -1 ? file.name.slice(dotIndex + 1) : '';
  const extension = rawExtension.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const rawBase = dotIndex > -1 ? file.name.slice(0, dotIndex) : file.name;
  const base =
    rawBase
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'imagen';

  const uniqueId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `${uniqueId}-${base}.${extension}`;
}

/**
 * Uploads an image to the gallery bucket and returns its public URL.
 */
export async function uploadGalleryImage(file: File): Promise<string> {
  const supabase = requireSupabase();
  const filePath = buildUniqueFileName(file);

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined
    });

  if (uploadError) {
    console.error('[Supabase] Storage upload failed', { bucket: GALLERY_BUCKET, filePath, uploadError });
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(filePath);

  if (!data?.publicUrl) {
    console.error('[Supabase] getPublicUrl returned no URL', { bucket: GALLERY_BUCKET, filePath });
    throw new Error('No fue posible obtener la URL pública de la imagen subida.');
  }

  return data.publicUrl;
}

/**
 * Extracts the storage object path from a public URL that belongs to this bucket.
 * Returns null for external URLs so we never delete arbitrary files.
 */
export function getStoragePathFromPublicUrl(publicUrl: string | null | undefined): string | null {
  if (!publicUrl) return null;

  const marker = `/storage/v1/object/public/${GALLERY_BUCKET}/`;
  const markerIndex = publicUrl.indexOf(marker);
  if (markerIndex === -1) return null;

  const rawPath = publicUrl.slice(markerIndex + marker.length).split('?')[0];
  if (!rawPath) return null;

  try {
    return decodeURIComponent(rawPath);
  } catch (error) {
    console.error('[Supabase] Could not decode storage path', { publicUrl, error });
    return null;
  }
}

/**
 * Best-effort removal of a previously uploaded image.
 * Never throws: a leftover file must not break the record operation.
 */
export async function removeGalleryImageByUrl(publicUrl: string | null | undefined): Promise<void> {
  const path = getStoragePathFromPublicUrl(publicUrl);
  if (!path) return;

  try {
    const supabase = requireSupabase();
    const { error } = await supabase.storage.from(GALLERY_BUCKET).remove([path]);
    if (error) {
      console.error('[Supabase] Could not remove old image from storage', { path, error });
    }
  } catch (error) {
    console.error('[Supabase] Unexpected error removing image from storage', { path, error });
  }
}

/** SELECT ordered by fecha_creacion DESC. */
export async function fetchConcreteComps(): Promise<ConcreteComp[]> {
  const supabase = requireSupabase();

  const { data, error } = await supabase
    .from(CONCRETE_COMP_TABLE)
    .select('id, titulo, descripcion, imagen_url, fecha_creacion')
    .order('fecha_creacion', { ascending: false });

  if (error) {
    console.error('[Supabase] SELECT failed', { table: CONCRETE_COMP_TABLE, error });
    throw new Error(error.message);
  }

  return (data ?? []) as ConcreteComp[];
}

/** INSERT: uploads the image first (when present) and stores its public URL. */
export async function createConcreteComp(
  input: ConcreteCompInput,
  { onStage }: StageOptions = {}
): Promise<ConcreteComp> {
  const supabase = requireSupabase();

  const titulo = input.titulo.trim();
  if (!titulo) {
    throw new Error('El título es obligatorio.');
  }

  let imagenUrl: string | null = null;
  if (input.file) {
    onStage?.('uploading');
    imagenUrl = await uploadGalleryImage(input.file);
  }

  onStage?.('creating');
  const { data, error } = await supabase
    .from(CONCRETE_COMP_TABLE)
    .insert({
      titulo,
      descripcion: input.descripcion.trim() || null,
      imagen_url: imagenUrl
    })
    .select('id, titulo, descripcion, imagen_url, fecha_creacion')
    .single();

  if (error) {
    console.error('[Supabase] INSERT failed', { table: CONCRETE_COMP_TABLE, error });
    // The row was not created: drop the orphan image we just uploaded.
    await removeGalleryImageByUrl(imagenUrl);
    throw new Error(error.message);
  }

  if (!data) {
    console.error('[Supabase] INSERT returned no row', { table: CONCRETE_COMP_TABLE });
    await removeGalleryImageByUrl(imagenUrl);
    throw new Error('El registro no fue devuelto por Supabase después de insertarlo.');
  }

  return data as ConcreteComp;
}

/** UPDATE: replaces the image only when a new file is provided. */
export async function updateConcreteComp(
  current: ConcreteComp,
  input: ConcreteCompInput,
  { onStage }: StageOptions = {}
): Promise<ConcreteComp> {
  const supabase = requireSupabase();

  const titulo = input.titulo.trim();
  if (!titulo) {
    throw new Error('El título es obligatorio.');
  }

  let imagenUrl = current.imagen_url;
  let uploadedUrl: string | null = null;

  if (input.file) {
    onStage?.('uploading');
    uploadedUrl = await uploadGalleryImage(input.file);
    imagenUrl = uploadedUrl;
  }

  onStage?.('updating');
  const { data, error } = await supabase
    .from(CONCRETE_COMP_TABLE)
    .update({
      titulo,
      descripcion: input.descripcion.trim() || null,
      imagen_url: imagenUrl
    })
    .eq('id', current.id)
    .select('id, titulo, descripcion, imagen_url, fecha_creacion')
    .single();

  if (error) {
    console.error('[Supabase] UPDATE failed', { table: CONCRETE_COMP_TABLE, id: current.id, error });
    // Keep the previous image intact: only remove the one we just uploaded.
    await removeGalleryImageByUrl(uploadedUrl);
    throw new Error(error.message);
  }

  if (!data) {
    console.error('[Supabase] UPDATE returned no row', { table: CONCRETE_COMP_TABLE, id: current.id });
    await removeGalleryImageByUrl(uploadedUrl);
    throw new Error('El registro no fue devuelto por Supabase después de actualizarlo.');
  }

  // The row now points at the new image, so the replaced file can be dropped safely.
  if (uploadedUrl && current.imagen_url && current.imagen_url !== uploadedUrl) {
    await removeGalleryImageByUrl(current.imagen_url);
  }

  return data as ConcreteComp;
}

/** DELETE: removes the row and, only if the path is resolvable, its stored image. */
export async function deleteConcreteComp(
  item: ConcreteComp,
  { onStage }: StageOptions = {}
): Promise<void> {
  const supabase = requireSupabase();

  onStage?.('deleting');
  const { error } = await supabase.from(CONCRETE_COMP_TABLE).delete().eq('id', item.id);

  if (error) {
    console.error('[Supabase] DELETE failed', { table: CONCRETE_COMP_TABLE, id: item.id, error });
    throw new Error(error.message);
  }

  await removeGalleryImageByUrl(item.imagen_url);
}
