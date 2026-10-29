// Texts for each language. Facts come from terravolcano.com (tour page, about page, reviews).
// Items marked DRAFT are not on the current site and must be confirmed by Terra Volcano.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

const es = {
  meta: {
    title: "Terra Volcano – Ascensos guiados a volcanes en Pucón, Chile",
    description:
      "Sube el volcán Villarrica y haz esquí de travesía en el Quetrupillán, el Lanín y el Llaima con guías locales de una empresa familiar de Pucón.",
  },
  nav: {
    tours: "Tours",
    about: "Nosotros",
    reviews: "Opiniones",
    faq: "Preguntas",
    book: "Reservar",
    switchLabel: "English version",
    backToTop: "Terra Volcano, volver al inicio",
  },
  hero: {
    eyebrow: "Pucón, Chile · Volcán Villarrica 2.847 m",
    title: ["Conquista", "el volcán"],
    lead: "Ascensos guiados y esquí de travesía con guías locales: desde la puerta de nuestra agencia hasta el cráter del volcán más activo de Chile.",
    cta: "Reservar ascenso",
    secondary: "Ver expediciones",
    hint: "Haz scroll para empezar a subir",
    altitude: "Altitud",
    illustration: "Ilustración del volcán Villarrica con el sendero de ascenso desde la base hasta el cráter humeante",
  },
  steps: [
    {
      place: "Pucón",
      title: "06:00 en la agencia",
      body: "Nos juntamos temprano en nuestra agencia. Revisamos tu equipo y te entregamos lo técnico: crampones, piolet, casco, mochila de 32 L y máscara de gas.",
    },
    {
      place: "Base",
      title: "Llegada al parque",
      body: "Te llevamos en nuestro transporte al Parque Nacional Villarrica, con la entrada de CONAF incluida, y empieza la subida junto a tu guía.",
    },
    {
      place: "Glaciar",
      title: "La subida",
      body: "Paso a paso sobre nieve y hielo. Dificultad media y sin experiencia previa: solo necesitas ser mayor de 18 años y tener ganas de superarte.",
    },
    {
      place: "Cráter",
      title: "La cumbre",
      body: "A 2.847 metros te asomas al volcán más activo de Chile. Después del descenso compartimos una colación con los guías y todo el grupo.",
    },
  ],
  tours: {
    eyebrow: "Elige tu volcán",
    title: "Expediciones",
    from: "Desde",
    perPerson: "p/p",
    book: "Reservar",
    hours: "h",
    days: "días",
    kinds: { ascent: "Ascenso", ski: "Esquí de travesía" },
    names: {
      1660: "Volcán Villarrica",
      1661: "Volcán Quetrupillán",
      1658: "Volcán Lanín",
      1659: "Volcán Llaima",
      1803: "Volcán Villarrica",
      1805: "Volcán Quetrupillán",
      1812: "Volcán Lonquimay",
    } as Record<number, string>,
    allTitle: "Todos los tours",
    allBody: "Mocho-Choshuenco, Sollipulli, trekking, rafting, canyoning y más →",
  },
  about: {
    eyebrow: "Empresa familiar · Desde 2015",
    title: "Nacimos a los pies del volcán",
    body: "Terra Volcano es una empresa local de montaña en Pucón, fundada por el andinista chileno Richard Diaz. Cuando reservas con nosotros, escalas con gente que creció mirando estas montañas y apoyas a familias locales y al crecimiento sostenible de nuestro pueblo.",
    photoAlt: "Escaladores con la bandera de Chile en una cumbre nevada",
    values: [
      { title: "Conocimiento local", body: "Guías mayoritariamente locales que comparten el conocimiento y la cultura de la zona." },
      { title: "Aventuras seguras", body: "Altos estándares de seguridad y apoyo experto en cada salida." },
      { title: "Turismo sostenible", body: "Prácticas responsables para proteger estos paisajes para las próximas generaciones." },
    ],
    // Counted from terravolcano.com: founding year, volcanoes in the tour list, Villarrica summit, Tripadvisor badge.
    stats: [
      { value: 2015, display: "2015", from: 1990, plain: true, prefix: "", suffix: "", label: "Fundados en Pucón" },
      { value: 7, display: "7", from: 0, plain: false, prefix: "", suffix: "", label: "Volcanes en nuestros tours" },
      { value: 2847, display: "2.847", from: 0, plain: false, prefix: "", suffix: " m", label: "Cumbre del Villarrica" },
      { value: 1, display: "1", from: 9, plain: false, prefix: "N.º ", suffix: "", label: "En Tripadvisor" },
    ],
  },
  reviews: {
    eyebrow: "Lo que dicen",
    title: "Desde la cumbre",
    all: "Todas las opiniones en Tripadvisor →",
    badgeAlt: "Número 1 en Tripadvisor",
    stars: "5 estrellas",
    note: "Opiniones de Tripadvisor traducidas al español.",
    items: [
      { quote: "La mejor experiencia que he tenido en Chile. Una agencia de gran calidad, con total dedicación a cada viajero.", author: "Carlos B" },
      { quote: "Excelente equipo de profesionales. Cuidaron muy bien a todo el grupo. El nivel técnico de todos fue 100/100.", author: "flyer13955555012" },
      { quote: "Muy buenos guías. Se adaptaron a quienes iban más lento y, cuando algunos se devolvieron, fueron a buscarlos.", author: "Elias Francisco V" },
    ],
  },
  faq: {
    eyebrow: "Antes de subir",
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Necesito experiencia previa?",
        a: "No. El ascenso al Villarrica es de dificultad media y no requiere experiencia: solo ser mayor de 18 años y estar en condiciones de caminar varias horas en subida.",
      },
      {
        q: "¿Qué incluye el tour?",
        a: "Entrada al parque nacional (CONAF), equipo básico (chaqueta cortaviento, cubrepantalón, bastones, guantes, polainas y zapatos de media montaña), equipo técnico (crampones, piolet, casco, mochila de 32 L y máscara de gas), guía especializado en español e inglés, seguro básico de accidentes y transporte desde la agencia.",
      },
      {
        q: "¿Qué tengo que llevar?",
        a: "Ropa cómoda por capas, protector solar, gorro y lentes de sol, cámara, colación (sándwiches, barras de cereal, frutos secos, chocolate) y al menos 2 litros de agua.",
      },
      {
        q: "¿A qué hora empieza y cuánto dura?",
        a: "Nos juntamos a las 6:00 en la agencia y la actividad dura unas 8 horas. Al final del día compartimos una colación con los guías.",
      },
      {
        // DRAFT
        q: "¿Qué pasa si hay mal tiempo?",
        a: "El Villarrica es un volcán activo y el clima cambia rápido. Nuestros guías deciden el mismo día, siempre priorizando tu seguridad, y te ayudamos a buscar otra fecha.",
      },
      {
        q: "¿Puedo reservar un tour privado?",
        a: "Sí. Muchos tours tienen salida grupal y privada; al reservar ves ambos precios.",
      },
    ],
  },
  contact: {
    title: ["Tu cumbre", "te espera"],
    book: "Reservar un tour",
    whatsapp: "Escríbenos por WhatsApp",
    whatsappMessage: "Hola Terra Volcano, quiero información sobre el ascenso al Villarrica.",
  },
  awards: {
    eyebrow: "Reconocimientos",
    title: "Avalados en Chile y el mundo",
    items: [
      { id: "lemu", name: "Cooperativa Lemu", body: "Apoyamos la restauración del bosque nativo a través de la conservación y de alianzas con la comunidad." },
      { id: "sustainable", name: "Distinción Turismo Sustentable", body: "Reconocidos oficialmente por nuestro compromiso con el turismo sustentable." },
      { id: "tripadvisor", name: "Tripadvisor Travelers’ Choice 2024", body: "Reconocidos por ofrecer, una y otra vez, experiencias excelentes a los viajeros." },
      { id: "chile", name: "Marca Chile", body: "Representamos con orgullo la calidad, la sustentabilidad y la identidad de Chile." },
    ],
  },
  bands: ["Volcán Villarrica · 2.847 m", "Ascensos guiados", "Esquí de travesía", "Quetrupillán", "Lanín", "Llaima", "Pucón, Chile"],
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Terra Volcano – Guided volcano ascents in Pucón, Chile",
    description:
      "Climb Villarrica volcano and ski tour Quetrupillán, Lanín and Llaima with local guides from a family-run company in Pucón.",
  },
  nav: {
    tours: "Tours",
    about: "About us",
    reviews: "Reviews",
    faq: "FAQ",
    book: "Book now",
    switchLabel: "Versión en español",
    backToTop: "Terra Volcano, back to top",
  },
  hero: {
    eyebrow: "Pucón, Chile · Villarrica volcano 2,847 m",
    title: ["Climb", "the volcano"],
    lead: "Guided ascents and ski touring with local guides: from the door of our agency to the crater of Chile’s most active volcano.",
    cta: "Book your ascent",
    secondary: "See expeditions",
    hint: "Scroll to start climbing",
    altitude: "Altitude",
    illustration: "Illustration of Villarrica volcano with the climbing trail from the base to the smoking crater",
  },
  steps: [
    {
      place: "Pucón",
      title: "06:00 at the agency",
      body: "We meet early at our agency. We check your gear and hand out the technical kit: crampons, ice axe, helmet, 32 L backpack and gas mask.",
    },
    {
      place: "Base",
      title: "Into the park",
      body: "Our transport takes you to Villarrica National Park, CONAF entry included, and the climb begins with your guide.",
    },
    {
      place: "Glacier",
      title: "The climb",
      body: "Step by step on snow and ice. Medium difficulty and no previous experience needed: you just need to be over 18 and ready to push yourself.",
    },
    {
      place: "Crater",
      title: "The summit",
      body: "At 2,847 metres you look into Chile’s most active volcano. After the descent we share a snack with the guides and the whole group.",
    },
  ],
  tours: {
    eyebrow: "Choose your volcano",
    title: "Expeditions",
    from: "From",
    perPerson: "p/p",
    book: "Book",
    hours: "h",
    days: "days",
    kinds: { ascent: "Ascent", ski: "Ski touring" },
    names: {
      1660: "Villarrica Volcano",
      1661: "Quetrupillán Volcano",
      1658: "Lanín Volcano",
      1659: "Llaima Volcano",
      1803: "Villarrica Volcano",
      1805: "Quetrupillán Volcano",
      1812: "Lonquimay Volcano",
    },
    allTitle: "All tours",
    allBody: "Mocho-Choshuenco, Sollipulli, trekking, rafting, canyoning and more →",
  },
  about: {
    eyebrow: "Family-owned · Since 2015",
    title: "Born at the foot of the volcano",
    body: "Terra Volcano is a local climbing company in Pucón, founded by Chilean climber Richard Diaz. When you book with us you climb with people who grew up looking at these mountains, and you support local families and the sustainable growth of our hometown.",
    photoAlt: "Climbers with the Chilean flag on a snowy summit",
    values: [
      { title: "Local expertise", body: "Predominantly local guides who share authentic regional knowledge and culture." },
      { title: "Safe adventures", body: "Top-notch safety standards and expert support on every trip." },
      { title: "Sustainable tourism", body: "Responsible practices that protect these landscapes for the next generations." },
    ],
    stats: [
      { value: 2015, display: "2015", from: 1990, plain: true, prefix: "", suffix: "", label: "Founded in Pucón" },
      { value: 7, display: "7", from: 0, plain: false, prefix: "", suffix: "", label: "Volcanoes in our tours" },
      { value: 2847, display: "2,847", from: 0, plain: false, prefix: "", suffix: " m", label: "Villarrica summit" },
      { value: 1, display: "1", from: 9, plain: false, prefix: "No. ", suffix: "", label: "On Tripadvisor" },
    ],
  },
  reviews: {
    eyebrow: "What climbers say",
    title: "From the summit",
    all: "All reviews on Tripadvisor →",
    badgeAlt: "Rated No. 1 on Tripadvisor",
    stars: "5 stars",
    note: "",
    items: [
      { quote: "The best experience I’ve had in Chile. A high-quality agency with complete dedication to every traveler.", author: "Carlos B" },
      { quote: "Excellent team of professionals. They took great care of the entire group. Everyone’s technical expertise was 100/100.", author: "flyer13955555012" },
      { quote: "Very good guides. They adapted to those who were moving more slowly, and when some people turned back, they went to look for them.", author: "Elias Francisco V" },
    ],
  },
  faq: {
    eyebrow: "Before you climb",
    title: "FAQ",
    items: [
      {
        q: "Do I need climbing experience?",
        a: "No. The Villarrica ascent is medium difficulty and needs no previous experience: you just need to be over 18 and able to walk uphill for several hours.",
      },
      {
        q: "What is included?",
        a: "National park entry (CONAF), basic gear (wind jacket, overpants, hiking poles, gloves, gaiters and mid-height mountain boots), technical equipment (crampons, ice axe, helmet, 32 L backpack and gas mask), a specialised guide speaking English and Spanish, basic accident insurance and transport from the agency.",
      },
      {
        q: "What should I bring?",
        a: "Comfortable clothes in layers, sunscreen, hat and sunglasses, a camera, snacks (sandwiches, cereal bars, nuts, chocolate) and at least 2 litres of water.",
      },
      {
        q: "When does it start and how long is it?",
        a: "We meet at 6:00 AM at the agency and the activity takes about 8 hours. At the end of the day we share a snack with the guides.",
      },
      {
        // DRAFT
        q: "What happens if the weather is bad?",
        a: "Villarrica is an active volcano and conditions change fast. Our guides decide on the day, always putting safety first, and we help you find another date.",
      },
      {
        q: "Can I book a private trip?",
        a: "Yes. Many tours run as group or private departures; you can see both prices when booking.",
      },
    ],
  },
  contact: {
    title: ["Your summit", "is waiting"],
    book: "Book a tour",
    whatsapp: "Ask us on WhatsApp",
    whatsappMessage: "Hi Terra Volcano, I'd like information about the Villarrica ascent.",
  },
  awards: {
    eyebrow: "Recognition",
    title: "Recognised at home and abroad",
    items: [
      { id: "lemu", name: "Cooperativa Lemu", body: "Supporting native forest restoration through conservation and community partnerships." },
      { id: "sustainable", name: "Sustainable Tourism Distinction", body: "Officially recognized for our commitment to sustainable tourism." },
      { id: "tripadvisor", name: "Tripadvisor Travelers’ Choice 2024", body: "Recognized for consistently excellent traveler experiences." },
      { id: "chile", name: "Marca Chile", body: "Proudly representing Chilean quality, sustainability and national identity." },
    ],
  },
  bands: ["Villarrica volcano · 2,847 m", "Guided ascents", "Ski touring", "Quetrupillán", "Lanín", "Llaima", "Pucón, Chile"],
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
