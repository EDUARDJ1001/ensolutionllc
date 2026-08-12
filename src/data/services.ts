import { ServiceDetail } from '../types';

export const servicesData: ServiceDetail[] = [
  {
    id: 'concrete-flatwork',
    category: 'concrete',
    popular: true,
    title: {
      es: 'Servicios de Concreto y Cimentaciones',
      en: 'Concrete Services & Foundations'
    },
    subtitle: {
      es: 'Vías de acceso, losas, concreto estampado, patios y estructuras duraderas',
      en: 'Driveways, slabs, stamped concrete, patios, and durable structures'
    },
    description: {
      es: 'Nuestra especialidad principal. Realizamos vertido, nivelación, armado con varilla y acabados de concreto residencial y comercial. Desde entradas de autos (driveways) y aceras hasta losas de cimentación y concreto decorativo estampado.',
      en: 'Our primary specialty. We handle excavation, rebar reinforcement, pouring, leveling, and high-durability finishing for residential and commercial concrete. From driveways and walkways to foundation slabs and decorative stamped patios.'
    },
    bulletPoints: {
      es: [
        'Entradas de autos (Driveways) y estacionamientos',
        'Patios de concreto estampado con variedad de patrones y colores',
        'Losas de cimentación para garajes, cobertizos y extensiones',
        'Muros de contención y escalones de concreto',
        'Sellado protector e impermeabilización contra desgaste'
      ],
      en: [
        'Driveways, aprons, and commercial parking pads',
        'Stamped decorative patios with stone/slate textures and custom colors',
        'Foundation slabs for garages, sheds, and room additions',
        'Retaining walls, footings, and custom concrete steps',
        'Protective sealing and weatherproofing against heavy usage'
      ]
    }
  },
  {
    id: 'interior-remodeling',
    category: 'remodeling',
    popular: true,
    title: {
      es: 'Remodelación Interior Integral',
      en: 'Comprehensive Interior Remodeling'
    },
    subtitle: {
      es: 'Transformación de cocinas, baños, sótanos y espacios habitables',
      en: 'Kitchen, bathroom, basement, and living area overhauls'
    },
    description: {
      es: 'Renovamos espacios interiores para maximizar la funcionalidad, el valor y el atractivo estético de su propiedad. Coordinamos estructuración, instalación de tablaroca (drywall), pisos y acabados completos.',
      en: 'We renovate interior spaces to maximize functionality, property value, and modern aesthetics. We coordinate framing, drywall installation, flooring, and complete turnkey finishes.'
    },
    bulletPoints: {
      es: [
        'Remodelación de cocinas (gabinetes, encimeras, iluminación)',
        'Renovación completa de baños con azulejos y plomería moderna',
        'Instalación de pisos LVP, vinílicos, cerámicos y madera',
        'Enmarcado (framing), tablaroca, texturizado y aislamiento',
        'Acondicionamiento y conversión de sótanos habitables'
      ],
      en: [
        'Kitchen remodeling (cabinetry, countertops, island layouts)',
        'Full bathroom renovations with custom tiling and fixtures',
        'LVP, porcelain tile, laminate, and hardwood flooring installation',
        'Framing, drywall installation, taping, texturing, and insulation',
        'Basement finishing and habitable space conversions'
      ]
    }
  },
  {
    id: 'custom-carpentry',
    category: 'carpentry',
    popular: false,
    title: {
      es: 'Carpintería Fina y Estructural',
      en: 'Fine & Structural Carpentry'
    },
    subtitle: {
      es: 'Marcos, zócalos, molduras, terrazas de madera y armarios a medida',
      en: 'Framing, baseboards, crown molding, decks, and custom woodwork'
    },
    description: {
      es: 'Trabajos de carpintería con cortes limpios y encajes precisos. Instalamos zócalos, molduras decorativas, marcos de puertas, terrazas (decks), pergolas y mobiliario fijo a medida.',
      en: 'Carpentry work executed with tight joinery and clean alignments. We install baseboards, crown molding, door framing, custom wood decks, pergolas, and built-in shelving.'
    },
    bulletPoints: {
      es: [
        'Instalación de zócalos, molduras de corona y marcos',
        'Construcción de terrazas (decks) y pérgolas de madera o composite',
        'Estructuras de madera y marcos de pared (rough carpentry)',
        'Reparación e instalación de puertas de interior y exterior',
        'Estanterías y armarios empotrados personalizados'
      ],
      en: [
        'Baseboard, crown molding, and trim architectural installation',
        'Custom wood and composite decks, railings, and pergolas',
        'Structural rough framing and load-bearing timber work',
        'Interior and exterior door hanging and jamb repair',
        'Custom built-in shelving, closets, and accent wood walls'
      ]
    }
  },
  {
    id: 'professional-painting',
    category: 'painting',
    popular: false,
    title: {
      es: 'Pintura Profesional Interior y Exterior',
      en: 'Professional Interior & Exterior Painting'
    },
    subtitle: {
      es: 'Preparación rigurosa de superficies, acabados uniformes y sellado',
      en: 'Thorough surface prep, crisp uniform lines, and protective sealers'
    },
    description: {
      es: 'Pintura de alto rendimiento para interiores y exteriores. Enfatizamos la preparación minuciosa de la superficie (reparación de grietas, lijado, imprimación) para garantizar adherencia y elegancia duradera.',
      en: 'High-performance interior and exterior painting services. We emphasize meticulous surface prep (crack repair, sanding, priming) to ensure long-lasting durability and sharp color definitions.'
    },
    bulletPoints: {
      es: [
        'Pintura de paredes interiores, techos, puertas y molduras',
        'Pintura exterior para fachadas, revestimientos y garajes',
        'Preparación, lijado, sellado de grietas y aplicación de primer',
        'Barnizado y teñido de estructuras de madera y molduras',
        'Aplicación de epoxi y selladores para pisos de garaje en concreto'
      ],
      en: [
        'Interior wall, ceiling, trim, and door precision painting',
        'Exterior siding, trim, masonry, and garage door painting',
        'Comprehensive prep, crack repair, power washing, and priming',
        'Staining and sealing for wood decks, fences, and pergolas',
        'Epoxy coating and protective sealers for concrete garage floors'
      ]
    }
  }
];
