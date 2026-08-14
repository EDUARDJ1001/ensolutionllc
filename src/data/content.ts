export const uiTranslations = {
  es: {
    companyName: "E & N Solution LLC",
    tagline: "Especialistas en Concreto y Remodelación Profesional",
    phone: "1 (667) 304-9332",
    email: "contacto@ensolutionllc.com",
    address: "Área Metropolitana y Alrededores",
    
    // Navigation
    nav: {
      home: "Inicio",
      services: "Servicios",
      concrete: "Especialidad Concreto",
      gallery: "Galería de Proyectos",
      estimator: "Cotizador Interactivo",
      about: "Nosotros",
      contact: "Contacto",
      getQuote: "Solicitar Cotización",
      callNow: "Llamar Ahora",
    },

    // Hero Section
    hero: {
      badge: "Trabajo Estructural & Remodelaciones Integrales",
      title: "Especialistas en Trabajos de Concreto y Remodelación",
      subtitle: "Ofrecemos soluciones duraderas de alta precisión en concreto residencial y comercial, junto con remodelaciones interiores, carpintería fina y pintura profesional de primera calidad.",
      primaryCTA: "Solicitar Cotización Gratuita",
      secondaryCTA: "Explorar Galería de Proyectos",
      stats: {
        experience: "Años de Experiencia",
        projects: "Proyectos Completados",
        satisfaction: "Garantía de Satisfacción"
      },
      badges: [
        "Estimaciones Presenciales Gratis",
        "Materiales de Alta Durabilidad",
        "Garantía por Escrito"
      ]
    },

    // Services Section
    servicesSection: {
      badge: "Servicios Integrales",
      title: "Soluciones Profesionales para su Propiedad",
      subtitle: "Desde cimentaciones y concreto estampado hasta remodelaciones interiores completas, brindamos acabados excepcionales con atención al detalle.",
      categories: {
        concrete: "Trabajos en Concreto",
        remodeling: "Remodelación Interior",
        carpentry: "Carpintería Profesional",
        painting: "Pintura Residencial & Comercial"
      },
      viewDetails: "Ver Detalles del Servicio",
      requestQuoteForService: "Cotizar Este Servicio",
      popularTag: "Servicio Principal"
    },

    // Project Gallery
    gallery: {
      badge: "Portafolio de Trabajo",
      title: "Proyectos Realizados Recientemente",
      subtitle: "Explore nuestra galería de trabajos terminados con los más altos estándares de calidad y durabilidad.",
      allCategories: "Todos los Proyectos",
      filterBy: "Filtrar por Categoría",
      viewProject: "Ver Detalles del Proyecto",
      closeModal: "Cerrar",
      requestSimilar: "Solicitar Proyecto Similar",
      specs: {
        location: "Ubicación",
        completion: "Fecha de Finalización",
        duration: "Tiempo de Ejecución",
        materials: "Materiales Utilizados",
        highlights: "Aspectos Destacados"
      }
    },

    // Dynamic Gallery (Supabase: concrete_comp_edgar)
    dynamicGallery: {
      badge: "Publicaciones Recientes",
      title: "Últimos Trabajos Publicados",
      subtitle: "Avances y fotografías de obra cargados directamente por nuestro equipo de trabajo.",
      loading: "Cargando trabajos publicados...",
      empty: "Aún no hay trabajos publicados en esta galería.",
      emptyHint: "Los nuevos trabajos aparecerán aquí automáticamente al ser publicados.",
      errorTitle: "No fue posible cargar la galería",
      retry: "Reintentar",
      publishedOn: "Publicado el",
      noImage: "Sin imagen",
      notConfigured: "Supabase no está configurado. Defina VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env y reinicie el servidor de desarrollo."
    },

    // Gallery Admin Panel (CRUD)
    admin: {
      title: "Administrador de Galería",
      subtitle: "Cree, edite y elimine los trabajos publicados en la galería.",
      newRecord: "Publicar Nuevo Trabajo",
      editRecord: "Editando Trabajo",
      fieldTitle: "Título",
      fieldTitlePlaceholder: "Ej. Entrada de concreto estampado",
      fieldDescription: "Descripción",
      fieldDescriptionPlaceholder: "Detalles del trabajo realizado (opcional)",
      fieldImage: "Imagen del Trabajo",
      chooseImage: "Seleccionar Imagen",
      changeImage: "Cambiar Imagen",
      clearSelection: "Quitar selección",
      keepCurrentImage: "Si no selecciona una nueva imagen, se conservará la actual.",
      imageHint: "Formatos de imagen hasta 5 MB.",
      save: "Publicar Trabajo",
      update: "Guardar Cambios",
      cancel: "Cancelar Edición",
      close: "Cerrar",
      uploading: "Subiendo imagen...",
      saving: "Guardando registro...",
      updating: "Actualizando registro...",
      deleting: "Eliminando registro...",
      edit: "Editar",
      delete: "Eliminar",
      confirmDeleteTitle: "¿Eliminar este trabajo?",
      confirmDeleteBody: "Se eliminará el registro y, si corresponde, su imagen del almacenamiento. Esta acción no se puede deshacer.",
      confirmDelete: "Sí, eliminar",
      keepRecord: "Conservar",
      titleRequired: "El título es obligatorio.",
      invalidImage: "El archivo seleccionado debe ser una imagen.",
      imageTooLarge: "La imagen no debe superar los 5 MB.",
      createdOk: "Trabajo publicado correctamente.",
      updatedOk: "Trabajo actualizado correctamente.",
      deletedOk: "Trabajo eliminado correctamente.",
      errorPrefix: "Error de Supabase",
      recordsCount: "trabajos publicados",
      listEmpty: "Todavía no hay registros para administrar."
    },

    // Admin Authentication (Supabase Auth)
    auth: {
      signInTitle: "Acceso de Administrador",
      signInSubtitle: "Ingrese con la cuenta de administrador para gestionar la galería.",
      email: "Correo Electrónico",
      emailPlaceholder: "admin@ensolutionllc.com",
      password: "Contraseña",
      passwordPlaceholder: "Su contraseña",
      signIn: "Iniciar Sesión",
      signingIn: "Verificando credenciales...",
      signOut: "Cerrar Sesión",
      signingOut: "Cerrando sesión...",
      checkingSession: "Verificando sesión...",
      signedInAs: "Sesión iniciada como",
      credentialsRequired: "Ingrese correo y contraseña.",
      signInError: "No fue posible iniciar sesión",
      restrictedNotice: "Área restringida. Las credenciales se administran desde Supabase."
    },

    // Interactive Estimator
    estimator: {
      badge: "Herramienta Interactiva",
      title: "Calcule la Estimación de su Proyecto",
      subtitle: "Obtenga un rango estimado aproximado para su proyecto en pocos pasos y solicite una inspección técnica presencial sin compromiso.",
      step1Title: "1. Seleccione el Tipo de Servicio",
      step2Title: "2. Parámetros del Proyecto",
      step3Title: "3. Datos de Contacto y Confirmación",
      serviceTypeLabel: "Tipo de Trabajo Requerido",
      subServiceLabel: "Especialidad Concreta",
      areaLabel: "Superficie Estimada (Pies Cuadrados / sq ft)",
      propertyTypeLabel: "Tipo de Propiedad",
      residential: "Residencial",
      commercial: "Comercial",
      timeframeLabel: "Plazo Deseado de Inicio",
      timeframeOptions: {
        immediate: "Lo antes posible (1 - 2 semanas)",
        soon: "Próximo mes",
        flexible: "Flexible / Planificación futura"
      },
      contactLabels: {
        name: "Nombre Completo",
        phone: "Teléfono de Contacto",
        email: "Correo Electrónico",
        zipCode: "Código Postal / Ciudad",
        details: "Detalles adicionales sobre el trabajo",
        detailsPlaceholder: "Describa brevemente las condiciones actuales, dimensiones específicas o requerimientos especiales...",
        preferredContact: "Preferencia de Contacto",
        phoneOption: "Llamada Telefónica",
        whatsappOption: "Mensaje por WhatsApp",
        emailOption: "Correo Electrónico"
      },
      estimatedRangeTitle: "Rango Estimado de Inversión",
      estimateDisclaimer: "Esta cifra es un cálculo orientativo no vinculante. La cotización oficial definitiva se confirmará tras realizar una inspección técnica presencial gratuita en su propiedad.",
      submitButton: "Enviar Solicitud de Cotización Oficial",
      submitting: "Enviando Solicitud...",
      successTitle: "¡Solicitud Recibida con Éxito!",
      successMessage: "Gracias por comunicarse con E & N Solution LLC. Un especialista de nuestro equipo revisará los detalles y se pondrá en contacto con usted en un plazo máximo de 24 horas laborables.",
      referenceCode: "Número de Referencia",
      resetForm: "Calcular Otro Proyecto"
    },

    // Why Choose Us
    whyUs: {
      badge: "Compromiso de Calidad",
      title: "¿Por qué Elegir E & N Solution LLC?",
      subtitle: "Nos destacamos por la responsabilidad, el cumplimiento estricto de tiempos y acabados de máxima durabilidad.",
      features: [
        {
          title: "Especialización y Estructura",
          description: "Dominio técnico avanzado en mezcla, armado, nivelación y curado de concreto para soportar inclemencias del tiempo y cargas pesadas."
        },
        {
          title: "Soluciones Integrales",
          description: "Ahorre tiempo y dinero contratando a una sola empresa confiable para sus proyectos de concreto, carpintería, pintura y remodelación."
        },
        {
          title: "Presupuestos Transparentes",
          description: "Sin cargos ocultos ni sorpresas de último momento. Proporcionamos desgloses claros y detallados por escrito antes de iniciar."
        },
        {
          title: "Área de Trabajo Limpia y Segura",
          description: "Respetamos su propiedad manteniendo un espacio ordenado durante la ejecución y realizando una limpieza profunda al finalizar."
        }
      ]
    },

    // Contact Section
    contact: {
      badge: "Atención Directa",
      title: "Póngase en Contacto con Nosotros",
      subtitle: "Estamos listos para evaluar su proyecto y ofrecerle asesoría técnica personalizada.",
      phoneTitle: "Llamada Directa",
      whatsappTitle: "Atención por WhatsApp",
      emailTitle: "Correo Electrónico",
      hoursTitle: "Horario de Atención",
      hoursDetails: "Lunes a Sábado: 7:00 AM - 6:00 PM\nDomingos: Cerrado (Opciones de emergencia previa cita)",
      areaTitle: "Área de Cobertura",
      areaDetails: "Atendemos proyectos residenciales y comerciales en todo el área metropolitana y comunidades aledañas.",
      formTitle: "Envíenos un Mensaje Directo",
      namePlaceholder: "Su Nombre",
      phonePlaceholder: "Su Teléfono",
      emailPlaceholder: "Su Correo",
      servicePlaceholder: "Servicio de Interés",
      messagePlaceholder: "¿En qué podemos ayudarle?",
      sendMessage: "Enviar Mensaje",
      sendingMessage: "Enviando...",
      messageSent: "Su mensaje ha sido enviado. Nos pondremos en contacto pronto."
    },

    // Footer
    footer: {
      aboutCompany: "Empresa comprometida con la excelencia estructural en trabajos de concreto y servicios complementarios de remodelación interior, carpintería y pintura profesional.",
      quickLinks: "Enlaces Rápidos",
      servicesList: "Especialidades",
      copyright: "Todos los derechos reservados.",
      languageSwitch: "Idioma / Language"
    }
  },

  en: {
    companyName: "E & N Solution LLC",
    tagline: "Concrete & Professional Remodeling Specialists",
    phone: "1 (667) 304-9332",
    email: "contact@ensolutionllc.com",
    address: "Metropolitan Area & Surrounding Cities",

    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      concrete: "Concrete Focus",
      gallery: "Project Gallery",
      estimator: "Interactive Estimator",
      about: "About Us",
      contact: "Contact",
      getQuote: "Request Quote",
      callNow: "Call Now",
    },

    // Hero Section
    hero: {
      badge: "Structural Work & Comprehensive Remodeling",
      title: "Specialists in Concrete Work and Remodeling",
      subtitle: "We deliver durable, high-precision concrete solutions for residential and commercial properties, alongside top-tier interior remodeling, fine carpentry, and professional painting.",
      primaryCTA: "Request Free Estimate",
      secondaryCTA: "Explore Project Gallery",
      stats: {
        experience: "Years of Experience",
        projects: "Projects Completed",
        satisfaction: "Satisfaction Guarantee"
      },
      badges: [
        "Free On-Site Estimates",
        "High-Durability Materials",
        "Written Warranty Included"
      ]
    },

    // Services Section
    servicesSection: {
      badge: "Comprehensive Services",
      title: "Professional Solutions for Your Property",
      subtitle: "From heavy foundations and decorative stamped concrete to complete interior overhauls, we deliver exceptional craftsmanship with meticulous attention to detail.",
      categories: {
        concrete: "Concrete Work",
        remodeling: "Interior Remodeling",
        carpentry: "Professional Carpentry",
        painting: "Residential & Commercial Painting"
      },
      viewDetails: "View Service Details",
      requestQuoteForService: "Quote This Service",
      popularTag: "Core Specialty"
    },

    // Project Gallery
    gallery: {
      badge: "Work Portfolio",
      title: "Recently Completed Projects",
      subtitle: "Explore our gallery of finished projects built to the highest standards of structural quality and aesthetic appeal.",
      allCategories: "All Projects",
      filterBy: "Filter by Category",
      viewProject: "View Project Details",
      closeModal: "Close",
      requestSimilar: "Request Similar Project",
      specs: {
        location: "Location",
        completion: "Completion Date",
        duration: "Project Timeline",
        materials: "Materials Used",
        highlights: "Key Highlights"
      }
    },

    // Dynamic Gallery (Supabase: concrete_comp_edgar)
    dynamicGallery: {
      badge: "Latest Uploads",
      title: "Latest Published Work",
      subtitle: "Jobsite photos and progress updates uploaded directly by our crew.",
      loading: "Loading published work...",
      empty: "No published work in this gallery yet.",
      emptyHint: "New entries will show up here automatically once published.",
      errorTitle: "The gallery could not be loaded",
      retry: "Try Again",
      publishedOn: "Published on",
      noImage: "No image",
      notConfigured: "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file and restart the dev server."
    },

    // Gallery Admin Panel (CRUD)
    admin: {
      title: "Gallery Administrator",
      subtitle: "Create, edit, and delete the work published in the gallery.",
      newRecord: "Publish New Work",
      editRecord: "Editing Work",
      fieldTitle: "Title",
      fieldTitlePlaceholder: "e.g. Stamped concrete driveway",
      fieldDescription: "Description",
      fieldDescriptionPlaceholder: "Details about the completed work (optional)",
      fieldImage: "Work Image",
      chooseImage: "Select Image",
      changeImage: "Change Image",
      clearSelection: "Clear selection",
      keepCurrentImage: "The current image is kept if you do not select a new one.",
      imageHint: "Image files up to 5 MB.",
      save: "Publish Work",
      update: "Save Changes",
      cancel: "Cancel Editing",
      close: "Close",
      uploading: "Uploading image...",
      saving: "Saving record...",
      updating: "Updating record...",
      deleting: "Deleting record...",
      edit: "Edit",
      delete: "Delete",
      confirmDeleteTitle: "Delete this work?",
      confirmDeleteBody: "The record and, when applicable, its stored image will be removed. This action cannot be undone.",
      confirmDelete: "Yes, delete",
      keepRecord: "Keep",
      titleRequired: "Title is required.",
      invalidImage: "The selected file must be an image.",
      imageTooLarge: "The image must not exceed 5 MB.",
      createdOk: "Work published successfully.",
      updatedOk: "Work updated successfully.",
      deletedOk: "Work deleted successfully.",
      errorPrefix: "Supabase error",
      recordsCount: "published works",
      listEmpty: "There are no records to manage yet."
    },

    // Admin Authentication (Supabase Auth)
    auth: {
      signInTitle: "Administrator Sign In",
      signInSubtitle: "Sign in with the administrator account to manage the gallery.",
      email: "Email",
      emailPlaceholder: "admin@ensolutionllc.com",
      password: "Password",
      passwordPlaceholder: "Your password",
      signIn: "Sign In",
      signingIn: "Checking credentials...",
      signOut: "Sign Out",
      signingOut: "Signing out...",
      checkingSession: "Checking session...",
      signedInAs: "Signed in as",
      credentialsRequired: "Enter your email and password.",
      signInError: "Could not sign in",
      restrictedNotice: "Restricted area. Credentials are managed from Supabase."
    },

    // Interactive Estimator
    estimator: {
      badge: "Interactive Tool",
      title: "Estimate Your Project Cost",
      subtitle: "Get a realistic estimated cost range for your project in just a few quick steps and request an official no-obligation on-site technical inspection.",
      step1Title: "1. Select Service Category",
      step2Title: "2. Project Specifications",
      step3Title: "3. Contact Details & Confirmation",
      serviceTypeLabel: "Required Service Category",
      subServiceLabel: "Specific Work Type",
      areaLabel: "Estimated Surface Area (Square Feet / sq ft)",
      propertyTypeLabel: "Property Type",
      residential: "Residential",
      commercial: "Commercial",
      timeframeLabel: "Desired Start Timeframe",
      timeframeOptions: {
        immediate: "As soon as possible (1 - 2 weeks)",
        soon: "Next month",
        flexible: "Flexible / Future planning"
      },
      contactLabels: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        zipCode: "Zip Code / City",
        details: "Additional Project Notes",
        detailsPlaceholder: "Briefly describe current site conditions, specific dimensions, or special requirements...",
        preferredContact: "Preferred Contact Method",
        phoneOption: "Phone Call",
        whatsappOption: "WhatsApp Message",
        emailOption: "Email Address"
      },
      estimatedRangeTitle: "Estimated Cost Range",
      estimateDisclaimer: "This calculation serves as a non-binding preliminary guidance. Official binding proposals are provided following a complimentary on-site inspection of your property.",
      submitButton: "Submit Official Quote Request",
      submitting: "Submitting Request...",
      successTitle: "Request Successfully Received!",
      successMessage: "Thank you for contacting E & N Solution LLC. A project specialist will review your details and contact you within 24 business hours.",
      referenceCode: "Reference Code",
      resetForm: "Calculate Another Project"
    },

    // Why Choose Us
    whyUs: {
      badge: "Quality Commitment",
      title: "Why Choose E & N Solution LLC?",
      subtitle: "We stand out for strict reliability, timely execution, and long-lasting structural craftsmanship.",
      features: [
        {
          title: "Technical Concrete Expertise",
          description: "Advanced mastery in site preparation, rebar reinforcement, concrete mix design, floating, and curing to withstand heavy loads and climate elements."
        },
        {
          title: "Turnkey Integral Solutions",
          description: "Save time and hassle by hiring one dependable general contractor for concrete, carpentry, painting, and interior remodeling."
        },
        {
          title: "Transparent & Detailed Pricing",
          description: "No hidden charges or unexpected surprises. We provide clear written itemized proposals prior to launching any work."
        },
        {
          title: "Clean & Safe Worksite Standards",
          description: "We treat your property with respect, maintaining clean work areas throughout construction and providing full debris cleanup."
        }
      ]
    },

    // Contact Section
    contact: {
      badge: "Direct Contact",
      title: "Get in Touch With Us Today",
      subtitle: "We are ready to assess your project and provide personal technical advice.",
      phoneTitle: "Direct Phone Call",
      whatsappTitle: "WhatsApp Inquiry",
      emailTitle: "Email Address",
      hoursTitle: "Business Hours",
      hoursDetails: "Monday to Saturday: 7:00 AM - 6:00 PM\nSundays: Closed (Emergency appointments upon request)",
      areaTitle: "Service Coverage Area",
      areaDetails: "Serving residential and commercial clients across the metropolitan region and surrounding communities.",
      formTitle: "Send Us a Direct Message",
      namePlaceholder: "Your Name",
      phonePlaceholder: "Your Phone Number",
      emailPlaceholder: "Your Email",
      servicePlaceholder: "Service of Interest",
      messagePlaceholder: "How can we assist you with your project?",
      sendMessage: "Send Message",
      sendingMessage: "Sending...",
      messageSent: "Your message has been sent. We will get back to you shortly."
    },

    // Footer
    footer: {
      aboutCompany: "A company dedicated to structural excellence in concrete construction alongside comprehensive interior remodeling, carpentry, and professional painting.",
      quickLinks: "Quick Links",
      servicesList: "Our Specialties",
      copyright: "All rights reserved.",
      languageSwitch: "Language / Idioma"
    }
  }
};
