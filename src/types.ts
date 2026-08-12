export type Language = 'es' | 'en';

export type ServiceCategory = 'concrete' | 'remodeling' | 'carpentry' | 'painting';

export interface ServiceDetail {
  id: string;
  category: ServiceCategory;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  description: { es: string; en: string };
  bulletPoints: { es: string[]; en: string[] };
  /** Optional: the static site no longer ships preloaded images. */
  image?: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: { es: string; en: string };
  category: ServiceCategory;
  categoryLabel: { es: string; en: string };
  description: { es: string; en: string };
  /** Optional: the static site no longer ships preloaded images. */
  image?: string;
  additionalImages?: string[];
  location: string;
  completionDate: string;
  duration: { es: string; en: string };
  materialsUsed: { es: string[]; en: string[] };
  keyHighlights: { es: string[]; en: string[] };
}

/** Row of the Supabase table `concrete_comp_edgar` (dynamic gallery). */
export interface ConcreteComp {
  id: number;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  fecha_creacion: string;
}

export interface QuoteFormData {
  category: ServiceCategory;
  specificService: string;
  areaSizeSqFt: number;
  timeframe: string;
  propertyType: 'residential' | 'commercial';
  name: string;
  phone: string;
  email: string;
  zipCode: string;
  details: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
}
