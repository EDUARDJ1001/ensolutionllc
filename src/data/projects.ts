import { ProjectItem } from '../types';

/**
 * Static showcase projects rendered in the #gallery section.
 * Empty on purpose: real projects are published from the admin panel (Supabase).
 * Adding entries here restores the category filter bar and the static grid.
 */
export const projectsData: ProjectItem[] = [];

export const testimonialsData = [
  {
    id: 't1',
    clientName: 'Carlos M. & Sofia R.',
    location: 'Metro Area',
    rating: 5,
    serviceCategory: { es: 'Entrada de Concreto Estampado', en: 'Stamped Concrete Driveway' },
    comment: {
      es: 'Contratamos a E & N Solution LLC para rehacer completamente la entrada de nuestra casa en concreto estampado. El equipo fue extremadamente puntual, profesional y cuidadoso con la limpieza. El acabado superó nuestras expectativas.',
      en: 'We hired E & N Solution LLC to completely replace our home driveway with stamped concrete. The crew was extremely punctual, professional, and kept the jobsite spotless. The finish exceeded our expectations.'
    },
    date: 'July 2026'
  },
  {
    id: 't2',
    clientName: 'David L.',
    location: 'North Suburbs',
    rating: 5,
    serviceCategory: { es: 'Remodelación de Cocina y Pintura', en: 'Kitchen Remodel & Painting' },
    comment: {
      es: 'Es difícil encontrar contratistas que cumplan con los plazos prometidos. E & N Solution terminó la remodelación de nuestra cocina y la pintura del primer piso exactamente el día acordado y sin costos sorpresa.',
      en: 'It is hard to find contractors who stick to promised schedules. E & N Solution finished our kitchen remodeling and first-floor painting exactly on the target date with zero surprise costs.'
    },
    date: 'June 2026'
  },
  {
    id: 't3',
    clientName: 'María Elena V.',
    location: 'West Hills',
    rating: 5,
    serviceCategory: { es: 'Carpintería de Molduras y Pintura', en: 'Trim Carpentry & Painting' },
    comment: {
      es: 'Instalaron zócalos altos y molduras de corona en toda la casa, además de pintar la sala principal. La atención al detalle en las esquinas y uniones fue impecable. Muy recomendados.',
      en: 'They installed tall baseboards and crown molding throughout our home, along with painting the main living area. The attention to detail in tight joints was impeccable. Highly recommended.'
    }
  }
];
