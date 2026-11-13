// High-Definition Filtercon System and AquaPure Imagery
// Local AI Generated Studio Renders & Unsplash High-Res Fallbacks

export const CATEGORIES = [
  { id: 'all', name: 'All Systems', icon: 'Sparkles', count: 18 },
  { id: 'whole-house', name: 'Whole House Filters', icon: 'Home', count: 6 },
  { id: 'salt-free', name: 'Salt-Free Softeners', icon: 'ShieldCheck', count: 4 },
  { id: 'under-sink', name: 'Alkaline RO Drinking', icon: 'Droplets', count: 5 },
  { id: 'shower-filters', name: 'Luxury Shower Heads', icon: 'ShowerHead', count: 4 },
  { id: 'cartridges', name: 'Filter Cartridges', icon: 'Layers', count: 8 },
];

export const PRODUCTS = [
  {
    id: 'fc-wh-5stage',
    name: '5-Stage Whole House System',
    category: 'whole-house',
    tagline: 'Hydromagnetic Non-Chemical Filtration',
    price: 1899,
    originalPrice: 2199,
    rating: 4.95,
    reviewsCount: 312,
    badge: 'Flagship',
    isBestSeller: true,
    // AI Generated Studio Shot of Dual Stainless Steel Towers
    image: '/whole-house.jpg',
    gallery: [
      '/whole-house.jpg',
      'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=85',
      '/hero-water.jpg'
    ],
    features: [
      'Patented Hydromagnetic Module realigns mineral polarity',
      'High Purity KDF-55 media targets chlorine and heavy metals',
      'Computerized automated backrinse - Zero filter replacements needed for 5-7 years',
      'Medical-grade mirror polished stainless steel exterior tank',
      'Retains healthy calcium & magnesium without slippery salt feel'
    ],
    stages: [
      { num: 1, title: 'Quartz Filtration Bed', desc: 'Even water flow and sediment removal.' },
      { num: 2, title: 'K.D.F. 55 Media', desc: 'Bacteriostatic redox reaction targeting heavy metals and chlorine.' },
      { num: 3, title: 'High-Grade Activated Carbon', desc: 'Adsorbs VOCs, chloramines, pesticides, bad taste and odor.' },
      { num: 4, title: 'Hydromagnetic Module', desc: 'Patented magnetic flux breaks surface tension & suspends calcium ions.' },
      { num: 5, title: 'Computerized Backrinse Valve', desc: 'Automatic scheduled self-cleaning backflush.' },
    ],
    specs: {
      flowRate: '15 - 22 GPM',
      tankSize: '10" x 54" Stainless Steel',
      warranty: 'Lifetime Tank Warranty',
      maintenance: 'Zero routine filter cartridge changes',
      waterSource: 'City Water & Municipal'
    }
  },
  {
    id: 'fc-tac-saltfree',
    name: 'Salt-Free TAC Conditioner',
    category: 'salt-free',
    tagline: 'Template Assisted Crystallization',
    price: 1399,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 184,
    badge: 'Eco Smart',
    isBestSeller: true,
    // Modern water conditioning tank
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85',
      '/whole-house.jpg'
    ],
    features: [
      'Zero salt, zero sodium discharge, 100% eco-friendly',
      'Transforms dissolved hardness minerals into harmless microscopic crystals',
      'Protects tankless water heaters and pipes from lime scale',
      'Zero electricity and zero wastewater discharge required'
    ],
    stages: [
      { num: 1, title: 'Sediment Pre-shield', desc: 'Removes sand, silt, and rust particles.' },
      { num: 2, title: 'TAC Transformation Bed', desc: 'Converts hardness ions into microscopic inactive crystal seeds.' }
    ],
    specs: {
      flowRate: '12 - 16 GPM',
      tankSize: '9" x 48" Brushed Metal',
      warranty: '10 Year Limited Warranty',
      maintenance: 'Media replacement every 3-5 years',
      waterSource: 'City or Well Water'
    }
  },
  {
    id: 'fc-alkaline-ro',
    name: 'Alkaline RO Drinking Tap',
    category: 'under-sink',
    tagline: 'Under-Sink 8.5+ pH Crisp Pure Water',
    price: 499,
    originalPrice: 599,
    rating: 4.98,
    reviewsCount: 420,
    badge: 'Pure Tap',
    isBestSeller: true,
    // AI Generated Studio 4-Stage RO System
    image: '/ro-system.jpg',
    gallery: [
      '/ro-system.jpg',
      '/hero-water.jpg',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=85'
    ],
    features: [
      '0.0001 micron Reverse Osmosis membrane removes PFAS, fluoride, lead, arsenic',
      'Post-alkaline cartridge infuses natural Calcium, Magnesium and Potassium',
      'Produces silky, refreshing drinking water with antioxidant properties',
      'Brushed nickel designer lead-free dedicated faucet included'
    ],
    stages: [
      { num: 1, title: '5-Micron Sediment Filter', desc: 'Catches rust, sand and particulate matter.' },
      { num: 2, title: 'Coconut Shell Carbon Block', desc: 'Eliminates chlorine, herbicides and organic compounds.' },
      { num: 3, title: 'High-Rejection RO Membrane', desc: 'Stops microplastics, viruses, fluoride, and dissolved solids.' },
      { num: 4, title: 'Alkaline Remineralizer', desc: 'Restores essential minerals and elevates pH to 8.5 - 9.0.' }
    ],
    specs: {
      flowRate: '75 Gallons Per Day (GPD)',
      tankSize: '3.2 Gallon Pressure Tank',
      warranty: '5 Year Full Warranty',
      maintenance: 'Quick-twist cartridge swap yearly',
      waterSource: 'Under-Sink Point of Use'
    }
  },
  {
    id: 'fc-shower-luxe-gold',
    name: 'AquaPure Gold Shower Filter',
    category: 'shower-filters',
    tagline: 'De-Chlorinating KDF-55 + Vit-C',
    price: 149,
    originalPrice: 189,
    rating: 4.88,
    reviewsCount: 156,
    badge: 'Luxury Spa',
    isBestSeller: false,
    // AI Generated Studio Gold Showerhead with Water Stream
    image: '/shower-gold.jpg',
    gallery: [
      '/shower-gold.jpg',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85'
    ],
    features: [
      'Instantly removes 98% of harsh free chlorine that causes dry skin & brittle hair',
      'Infused with Vitamin C and negative ion tourmaline spheres for scalp health',
      'High-pressure micro-nozzle technology saves 25% water while boosting spray feel',
      'Brushed Gold PVD scratch-resistant finish'
    ],
    stages: [
      { num: 1, title: 'Micro-Mesh Stainless Screen', desc: 'Blocks pipe debris & rust flecks.' },
      { num: 2, title: 'KDF-55 Redox Alloy', desc: 'Neutralizes free chlorine at high water temperatures.' },
      { num: 3, title: 'Vitamin C Ascorbic Acid', desc: 'Enriches skin moisture and reduces irritation.' }
    ],
    specs: {
      flowRate: '2.0 GPM High Velocity',
      finish: 'Brushed Gold Brass',
      warranty: '2 Year Warranty',
      maintenance: 'Replace internal cartridge every 6 months',
      waterSource: 'Standard 1/2" Shower Arm'
    }
  },
  {
    id: 'fc-shower-inline-chrome',
    name: 'AquaPure Inline Shower Filter',
    category: 'shower-filters',
    tagline: 'Universal Inline 2-Min Install',
    price: 89,
    originalPrice: 110,
    rating: 4.82,
    reviewsCount: 98,
    badge: 'Easy Fit',
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=85'
    ],
    features: [
      'Compact inline cartridge installs between your shower arm and existing head',
      'Multi-stage filtration with Calcium Sulfite and activated carbon',
      'Zero loss in water pressure guaranteed'
    ],
    stages: [
      { num: 1, title: 'High Density Steel Mesh', desc: 'Sediment trap' },
      { num: 2, title: 'Calcium Sulfite Beads', desc: 'Rapid dechlorination' },
      { num: 3, title: 'Coconut Shell Carbon', desc: 'Odor elimination' }
    ],
    specs: {
      flowRate: '2.5 GPM Universal',
      finish: 'Polished Chrome',
      warranty: '1 Year Warranty',
      maintenance: 'Cartridge swap 6-8 months',
      waterSource: 'Universal Standard'
    }
  },
  {
    id: 'fc-hybrid-combo',
    name: 'Filtercon Hybrid Twin System',
    category: 'whole-house',
    tagline: '5-Stage Filter + Salt-Free TAC',
    price: 2999,
    originalPrice: 3499,
    rating: 4.99,
    reviewsCount: 512,
    badge: 'Complete Home',
    isBestSeller: true,
    image: '/whole-house.jpg',
    gallery: [
      '/whole-house.jpg',
      '/hero-water.jpg',
      'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=85'
    ],
    features: [
      'The comprehensive whole-home package trusted across Southern California',
      'Both twin stainless steel polished tanks operating in seamless tandem',
      'Complete toxin & chlorine elimination + 100% limescale pipe protection',
      'Includes free professional in-home water testing & factory installation kit'
    ],
    stages: [
      { num: 1, title: 'Primary 5-Stage Hydromagnetic Tank', desc: 'Full spectrum contaminant removal.' },
      { num: 2, title: 'Secondary TAC Softening Tank', desc: 'Scale-free crystallization.' }
    ],
    specs: {
      flowRate: '20+ GPM (Supports up to 6 bathrooms)',
      tankSize: 'Dual 10" x 54" Stainless Steel Towers',
      warranty: 'Lifetime Tank & 10-Yr Valve Warranty',
      maintenance: 'Zero salt bags to haul forever',
      waterSource: 'Municipal & Well Water Certified'
    }
  }
];

export const ONBOARDING_SLIDES = [
  {
    id: 1,
    badge: '01 Pure Purity',
    title: 'Clean Water. Better You.',
    subtitle: 'Filtercon Patented Hydromagnetic & 5-Stage whole house filtration without toxic chemicals or salt.',
    image: '/whole-house.jpg',
    pill: 'Chemical-Free Living'
  },
  {
    id: 2,
    badge: '02 Scale Protection',
    title: 'Salt-Free TAC Technology',
    subtitle: 'Never haul heavy 50 lb salt bags again. Keep natural healthy minerals while safeguarding your pipes and appliances.',
    image: '/shower-gold.jpg',
    pill: '100% Eco-Friendly'
  },
  {
    id: 3,
    badge: '03 Alkaline Crisp',
    title: 'Drinking Water Perfected',
    subtitle: 'Reverse Osmosis with natural re-mineralization delivers silky, balanced 8.5+ pH hydration at your tap.',
    image: '/ro-system.jpg',
    pill: '99.9% Purity Guaranteed'
  }
];

export const WATER_TEST_QUESTIONS = [
  {
    id: 'source',
    question: 'Where does your home water come from?',
    options: [
      { id: 'city', label: 'City / Municipal Water', desc: 'Chlorinated, hard water, chemical taste' },
      { id: 'well', label: 'Private Well Water', desc: 'Iron, sulfur, sediment, variable hardness' },
      { id: 'unsure', label: 'Not Sure', desc: 'We will inspect your meter & test for you' }
    ]
  },
  {
    id: 'problems',
    question: 'What water issues do you notice most?',
    options: [
      { id: 'scale', label: 'White lime scale & spots on glasses / faucets' },
      { id: 'chlorine', label: 'Chemical / bleach odor and bad tap taste' },
      { id: 'skin', label: 'Dry itchy skin & brittle hair after shower' },
      { id: 'all', label: 'All of the above (Need complete home protection)' }
    ]
  },
  {
    id: 'home_size',
    question: 'What is the size of your residence?',
    options: [
      { id: 'small', label: '1 - 2 Bathrooms (1-3 People)' },
      { id: 'medium', label: '3 - 4 Bathrooms (4-6 People)' },
      { id: 'large', label: '5+ Bathrooms or Estate' }
    ]
  }
];
