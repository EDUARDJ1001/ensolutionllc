-- =====================================================================
-- E & N Solution LLC — Configuración de administrador y seguridad
-- Ejecutar en Supabase > SQL Editor, en este orden.
-- =====================================================================

-- ---------------------------------------------------------------------
-- PASO 1. Tabla de administradores
-- Marca qué usuarios de auth.users pueden gestionar la galería.
-- ---------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_users enable row level security;

-- Cada admin puede leer su propia fila (nadie más lee esta tabla).
drop policy if exists "admin_users_select_self" on public.admin_users;
create policy "admin_users_select_self"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());

-- Función auxiliar usada por el resto de políticas.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a where a.user_id = auth.uid()
  );
$$;


-- ---------------------------------------------------------------------
-- PASO 2. Crear el usuario administrador manualmente
-- CAMBIE el correo y la contraseña antes de ejecutar.
-- (Alternativa recomendada: Dashboard > Authentication > Users > Add user)
-- ---------------------------------------------------------------------
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
)
values (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@ensolutionllc.com',                      -- <== CAMBIAR correo
  crypt('CAMBIE_ESTA_CLAVE_SEGURA', gen_salt('bf')), -- <== CAMBIAR contraseña
  now(),                                          -- correo ya confirmado
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"role":"admin"}'::jsonb,
  '', '', '', ''
)
on conflict (id) do nothing;

-- Identidad de tipo email asociada al usuario (requerida para login por password).
insert into auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
select
  gen_random_uuid(),
  u.id,
  u.id::text,
  jsonb_build_object(
    'sub', u.id::text,
    'email', u.email,
    'email_verified', true,
    'phone_verified', false
  ),
  'email',
  now(),
  now(),
  now()
from auth.users u
where u.email = 'admin@ensolutionllc.com'         -- <== mismo correo del paso anterior
  and not exists (
    select 1 from auth.identities i
    where i.user_id = u.id and i.provider = 'email'
  );

-- Registrar al usuario como administrador.
insert into public.admin_users (user_id, email)
select u.id, u.email
from auth.users u
where u.email = 'admin@ensolutionllc.com'         -- <== mismo correo
on conflict (user_id) do nothing;


-- ---------------------------------------------------------------------
-- PASO 3. Políticas RLS de la tabla concrete_comp_edgar
-- Lectura pública (la web muestra la galería a cualquier visitante).
-- Escritura solo para administradores autenticados.
-- ---------------------------------------------------------------------
alter table public.concrete_comp_edgar enable row level security;

drop policy if exists "concrete_comp_edgar_select" on public.concrete_comp_edgar;
create policy "concrete_comp_edgar_select"
  on public.concrete_comp_edgar for select
  to anon, authenticated
  using (true);

drop policy if exists "concrete_comp_edgar_insert" on public.concrete_comp_edgar;
create policy "concrete_comp_edgar_insert"
  on public.concrete_comp_edgar for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "concrete_comp_edgar_update" on public.concrete_comp_edgar;
create policy "concrete_comp_edgar_update"
  on public.concrete_comp_edgar for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "concrete_comp_edgar_delete" on public.concrete_comp_edgar;
create policy "concrete_comp_edgar_delete"
  on public.concrete_comp_edgar for delete
  to authenticated
  using (public.is_admin());


-- ---------------------------------------------------------------------
-- PASO 4. Políticas del bucket galery_edgar
-- Lectura pública de las imágenes, escritura solo para administradores.
-- ---------------------------------------------------------------------
update storage.buckets set public = true where id = 'galery_edgar';

drop policy if exists "galery_edgar_select" on storage.objects;
create policy "galery_edgar_select"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'galery_edgar');

drop policy if exists "galery_edgar_insert" on storage.objects;
create policy "galery_edgar_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'galery_edgar' and public.is_admin());

drop policy if exists "galery_edgar_update" on storage.objects;
create policy "galery_edgar_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'galery_edgar' and public.is_admin())
  with check (bucket_id = 'galery_edgar' and public.is_admin());

drop policy if exists "galery_edgar_delete" on storage.objects;
create policy "galery_edgar_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'galery_edgar' and public.is_admin());


-- ---------------------------------------------------------------------
-- VERIFICACIÓN
-- ---------------------------------------------------------------------
-- select u.id, u.email, u.email_confirmed_at, (a.user_id is not null) as es_admin
-- from auth.users u
-- left join public.admin_users a on a.user_id = u.id;

-- ---------------------------------------------------------------------
-- CAMBIAR LA CONTRASEÑA MÁS ADELANTE
-- ---------------------------------------------------------------------
-- update auth.users
-- set encrypted_password = crypt('NUEVA_CLAVE', gen_salt('bf')), updated_at = now()
-- where email = 'admin@ensolutionllc.com';

-- ---------------------------------------------------------------------
-- ELIMINAR EL ADMIN
-- ---------------------------------------------------------------------
-- delete from auth.users where email = 'admin@ensolutionllc.com';
--   (borra en cascada admin_users e identities)
