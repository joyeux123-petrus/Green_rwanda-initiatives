import { ImpactStat, Program, NewsArticle, GalleryItem, Partner, ResourceDocument, TeamMember, SDGGoal } from '../types';

export const ORGANIZATION = {
  name: "Green Rwanda Initiatives",
  acronym: "GRI",
  founded: 2022,
  type: "Rwandan youth-led environmental and climate organization",
  location: "Rwanda",
  geographicFocus: "Muhanga District, Southern Province, Rwanda",
  primaryHeadline: "Restoring Nature. Empowering People. Building Climate-Resilient Communities.",
  primaryMessage: "Green Rwanda Initiatives is a youth-led environmental and climate organization working with communities to restore ecosystems, strengthen resilient livelihoods and empower people to lead practical climate action.",
  email: "greenrwandainitiative@gmail.com",
  phone: "+250 780 505 936",
  address: "Muhanga, Rwanda",
  registrationNote: "Registered youth-led non-profit organization in Rwanda",
  social: {
    twitter: "https://twitter.com/GreenRwandaOrg",
    linkedin: "https://linkedin.com/company/green-rwanda-initiative",
    instagram: "https://instagram.com/greenrwandainitiative",
    facebook: "https://facebook.com/GreenRwandaInitiative"
  }
};

export const SDG_GOALS: SDGGoal[] = [
  {
    number: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts through community reforestation, clean energy adoption, and regional youth climate advocacy.",
    icon: "cloud-sun",
    color: "bg-forest-dark text-white"
  },
  {
    number: 15,
    title: "Life on Land",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, manage forests sustainably, halt soil erosion, and reverse land degradation.",
    icon: "tree-pine",
    color: "bg-forest-dark text-white"
  },
  {
    number: 5,
    title: "Gender Equality",
    description: "Empower women as key decision-makers and climate leaders in agroforestry, household energy choices, and sustainable community livelihoods.",
    icon: "heart-handshake",
    color: "bg-forest-dark text-white"
  },
  {
    number: 7,
    title: "Affordable & Clean Energy",
    description: "Expand community access to clean cooking technologies (eco-stoves) to reduce fuelwood dependency and improve household respiratory health.",
    icon: "zap",
    color: "bg-forest-dark text-white"
  },
  {
    number: 1,
    title: "No Poverty",
    description: "Strengthen rural livelihoods through climate-smart farming, tree nurseries as green enterprises, and enhanced agricultural productivity.",
    icon: "sprout",
    color: "bg-forest-dark text-white"
  },
  {
    number: 6,
    title: "Clean Water & Sanitation",
    description: "Protect watershed catchments and hillside soil cover to preserve natural freshwater systems across Rwandan sectors.",
    icon: "droplet",
    color: "bg-forest-dark text-white"
  }
];

export const INITIAL_IMPACT_STATS: ImpactStat[] = [
  { value: 30641, display: "30,641+", label: "Trees Planted", icon: "tree", type: "achieved", note: "Cumulative achieved across completed & ongoing community restoration projects", order: 1, active: true },
  { value: 1000, display: "1,000+", label: "Households Reached", icon: "home", type: "achieved", note: "Direct household engagement in resilient livelihoods & clean energy", order: 2, active: true },
  { value: 3000, display: "3,000+", label: "People Reached", icon: "users", type: "achieved", note: "Community members participating in environmental & climate programs", order: 3, active: true },
  { value: 231, display: "231+", label: "People Trained", icon: "graduation-cap", type: "achieved", note: "Trained in agroforestry, nursery management & climate action", order: 4, active: true },
  { value: 42, display: "42", label: "Eco-Stoves Distributed", icon: "flame", type: "achieved", note: "Clean energy solutions distributed to reduce deforestation pressure", order: 5, active: true },
  { value: 15000, display: "15,000", label: "Seedlings in Current Pipeline", icon: "sprout", type: "ongoing", note: "Prepared for October 2026 planting in Muhanga District", order: 6, active: true },
  { value: 3000, display: "3,000", label: "Youth Target — EmpowerLink", icon: "target", type: "target", note: "2-year target for digital climate action, green skills & leadership", order: 7, active: true }
];

export const GRI_OPERATIONAL_LOCATIONS = [
  {
    name: "Muhanga District (Core Field Hub)",
    district: "Muhanga District",
    province: "Southern Province, Rwanda",
    type: "Primary Operational Hub",
    description: "Central operational site hosting community tree nurseries (15,000+ seedlings pipeline), hillside restoration, and sustainable agroforestry initiatives."
  },
  {
    name: "Gahogo Cell & Catchment Slopes",
    district: "Gahogo Cell, Muhanga District",
    province: "Southern Province, Rwanda",
    type: "Agroforestry & Soil Conservation",
    description: "Targeted hillside slope stabilization, soil erosion mitigation, and smallholder farmer engagement across Muhanga District."
  },
  {
    name: "Rugeramigozi Wetland Catchment",
    district: "Rugeramigozi, Muhanga District",
    province: "Southern Province, Rwanda",
    type: "Watershed & Seedling Nursery Station",
    description: "Dedicated tree seedling nursery preparation and watershed protection zone supporting community-led planting drives."
  }
];

export const CHALLENGES = [
  {
    title: "Environmental Degradation",
    description: "Soil erosion, deforestation, and loss of vegetative cover threaten rural watersheds and hillside farming.",
    icon: "mountain"
  },
  {
    title: "Biodiversity Loss",
    description: "Habitat fragmentation and climate pressures diminish local flora, fauna, and ecosystem health.",
    icon: "leaf"
  },
  {
    title: "Climate Vulnerability",
    description: "Unpredictable rainfall patterns and extreme weather events directly impact smallholder farming communities.",
    icon: "cloud-rain"
  },
  {
    title: "Unsustainable Agriculture",
    description: "Traditional farming methods without agroforestry lead to declining soil fertility and lower yields.",
    icon: "sprout"
  },
  {
    title: "Youth Unemployment",
    description: "Limited green job opportunities for talented youth eager to contribute to sustainable development.",
    icon: "users"
  },
  {
    title: "Gender Inequality",
    description: "Women face barriers in climate leadership and resource management despite being primary land stewards.",
    icon: "heart"
  },
  {
    title: "Limited Environmental Awareness",
    description: "Need for grassroots education and actionable climate literacy across rural and urban communities.",
    icon: "book-open"
  },
  {
    title: "Vulnerable Livelihoods",
    description: "Economic pressures driving over-reliance on natural resources without sustainable alternatives.",
    icon: "shield-alert"
  }
];

export const APPROACH_STEPS = [
  {
    step: "01",
    title: "RESTORE",
    subtitle: "Ecosystem Restoration & Agroforestry",
    description: "Planting native and agroforestry trees, establishing community nurseries, and rehabilitating degraded watersheds to restore ecological balance."
  },
  {
    step: "02",
    title: "EDUCATE",
    subtitle: "Climate Literacy & Grassroots Awareness",
    description: "Conducting community workshops, school environmental clubs, and capacity-building sessions on sustainable practices."
  },
  {
    step: "03",
    title: "EMPOWER",
    subtitle: "Youth Leadership & Women's Inclusion",
    description: "Equipping youth with green skills, digital advocacy tools, and leadership roles to drive practical community action."
  },
  {
    step: "04",
    title: "CONNECT",
    subtitle: "Multi-Stakeholder Collaboration",
    description: "Partnering with local government, international NGOs, researchers, and development partners for amplified impact."
  },
  {
    step: "05",
    title: "SCALE",
    subtitle: "Sustainable Livelihoods & Expansion",
    description: "Scaling successful models like RISE TREE and FOBASI across new sectors and regions in Rwanda and East Africa."
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: "rise-tree",
    slug: "rise-tree",
    title: "RISE TREE Project",
    status: "Completed / Scaling",
    statusType: "completed",
    categories: ["Restoration", "Energy", "Agriculture"],
    focus: "Ecosystem restoration, tree planting, climate resilience and clean energy",
    description: "A foundational community-based restoration project achieving major milestones in tree planting, community training, and clean energy adoption across rural Rwanda.",
    image: "/images/_SMN1953.JPG",
    keyFigures: [
      "15,641 trees planted",
      "3,000+ people reached",
      "231 people trained",
      "42 eco-stoves distributed"
    ],
    results: [
      "Planted 15,641 indigenous and agroforestry trees",
      "Reached over 3,000 community members with climate education",
      "Trained 231 local farmers and youth in nursery maintenance",
      "Distributed 42 clean energy eco-stoves to reduce fuelwood pressure"
    ],
    location: "Southern & Western Provinces, Rwanda",
    startDate: "2022-01-01",
    endDate: "2024-12-31",
    sdgGoals: [13, 15, 7, 1],
    featured: true,
    published: true
  },
  {
    id: "rise-tree-expansion",
    slug: "rise-tree-expansion",
    title: "RISE TREE 2026 Expansion — Muhanga & Rugeramigozi",
    status: "Active Field Operations",
    statusType: "ongoing",
    categories: ["Restoration", "Agriculture"],
    focus: "Ecosystem restoration, Rugeramigozi tree nursery inspection, Rugeramigozi swamp sample planting, and community-led conservation.",
    description: "Expanding on the proven success of RISE TREE in Muhanga District (Gahogo Cell). Inspecting 15,000 seedlings at the Rugeramigozi tree nursery and planting sample trees along the Rugeramigozi swamp to restore degraded ecosystems and strengthen community climate resilience.",
    image: "/images/nyamabuye.jpg",
    keyFigures: [
      "15,000 seedlings in Rugeramigozi nursery pipeline",
      "Rugeramigozi swamp restoration site active",
      "Muhanga District (Gahogo Cell)",
      "Community-led ecosystem conservation"
    ],
    results: [
      "Conducted technical field inspection in Muhanga District (Gahogo Cell) to evaluate restoration progress.",
      "Inspected tree seedling cultivation at Rugeramigozi nursery preparing 15,000 native and agroforestry seedlings.",
      "Planted sample tree species along the Rugeramigozi swamp catchment to stabilize soil and protect aquatic ecosystem margins."
    ],
    targets: [
      "Prepare 15,000 robust seedlings in Rugeramigozi community nursery",
      "Restore degraded hillside catchments across Gahogo Cell in Muhanga District",
      "Maximize tree survival rates through post-planting farmer cooperative maintenance"
    ],
    location: "Gahogo Cell & Rugeramigozi Swamp, Muhanga District, Rwanda",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    sdgGoals: [13, 15, 6, 1],
    featured: true,
    published: true
  },
  {
    id: "fobasi",
    slug: "fobasi",
    title: "FOBASI — Food, Biodiversity & Climate Resilience",
    status: "Ongoing",
    statusType: "ongoing",
    categories: ["Agriculture", "Biodiversity", "Restoration"],
    focus: "Food security, biodiversity, agroforestry and climate resilience",
    description: "An integrated initiative addressing food security and biodiversity loss through agroforestry demonstration sites and community capacity building.",
    image: "/images/IMG-20251023-WA0126.jpg",
    keyFigures: [
      "Target: 18,000 trees",
      "Target: 10 demonstration sites",
      "Target: 100 households",
      "Target: 2,000+ people (≥50% women and youth)"
    ],
    targets: [
      "Establish 10 agroforestry demonstration sites",
      "Plant 18,000 multipurpose trees supporting soil fertility and food security",
      "Directly benefit 100 farming households",
      "Engage 2,000+ community members with ≥50% women and youth participation"
    ],
    location: "Rwanda",
    startDate: "2026-03-01",
    endDate: "2027-12-31",
    sdgGoals: [1, 5, 13, 15],
    featured: true,
    published: true
  },
  {
    id: "empowerlink",
    slug: "empowerlink",
    title: "EmpowerLink",
    status: "Ongoing / Scaling",
    statusType: "ongoing",
    categories: ["Youth", "Climate Advocacy"],
    focus: "Youth digital climate action, green skills and leadership",
    description: "Equipping the next generation of Rwandan youth with digital tools, environmental knowledge, and advocacy leadership to drive local climate action.",
    image: "/images/IMG-20251117-WA0048.jpg",
    keyFigures: [
      "Target: 3,000 youth over 2 years",
      "Digital green skills training",
      "Youth climate leadership circles"
    ],
    targets: [
      "Empower 3,000 youth across Rwanda over 2 years",
      "Provide green entrepreneurship and digital advocacy workshops",
      "Establish active youth climate leadership networks"
    ],
    location: "Kigali & Provincial Hubs, Rwanda",
    startDate: "2026-01-01",
    endDate: "2027-12-31",
    sdgGoals: [13, 5, 1],
    featured: true,
    published: true
  },
  {
    id: "africa-climate-caravan",
    slug: "africa-climate-caravan",
    title: "Africa Climate Caravan Campaign",
    status: "Climate Advocacy Campaign",
    statusType: "campaign",
    categories: ["Climate Advocacy", "Energy"],
    focus: "Climate justice, climate finance, African voices and energy transition",
    description: "Mobilizing youth and community voices across regions to advocate for equitable climate finance and sustainable energy transition in Africa.",
    image: "/images/IMG-20251024-WA0033.jpg",
    keyFigures: [
      "Continental climate justice dialogue",
      "African youth voice amplification",
      "Energy transition advocacy"
    ],
    results: [
      "Convened regional youth delegations for climate justice",
      "Amplify grassroots African perspectives on climate finance"
    ],
    location: "East Africa & Continental",
    startDate: "2026-04-01",
    endDate: "2026-11-30",
    sdgGoals: [13, 7],
    featured: false,
    published: true
  },
  {
    id: "afrika-vuka",
    slug: "afrika-vuka",
    title: "Afrika Vuka — Energy Affordability Campaign",
    status: "2026 Campaign Completed",
    statusType: "campaign",
    categories: ["Energy", "Climate Advocacy", "Youth"],
    focus: "Clean and affordable energy, energy justice and climate advocacy",
    description: "Engaging local leaders and youth advocates on clean energy access, affordability, and grassroots energy justice.",
    image: "/images/whatsapp-2026-09-21-55549.jpeg",
    keyFigures: [
      "42 youth leaders and local officials engaged",
      "Community energy dialogues",
      "Policy advocacy recommendations"
    ],
    results: [
      "Successfully engaged 42 youth leaders and local officials",
      "Hosted community dialogues on clean energy affordability"
    ],
    location: "Rwanda",
    startDate: "2026-02-01",
    endDate: "2026-06-30",
    sdgGoals: [7, 13],
    featured: false,
    published: true
  },
  {
    id: "east-africa-water",
    slug: "east-africa-water",
    title: "East Africa Youth Water & Climate Engagement",
    status: "Regional Advocacy",
    statusType: "campaign",
    categories: ["Climate Advocacy", "Youth", "Biodiversity"],
    focus: "Water security, climate resilience and youth advocacy",
    description: "Regional consultation and advocacy focusing on protecting watershed ecosystems, water security, and youth participation in climate policy.",
    image: "/images/whatsapp-2026-09-28-11738.jpeg",
    keyFigures: [
      "19 August 2026 regional consultation",
      "Cross-border youth water security dialogue",
      "Policy recommendations submitted"
    ],
    results: [
      "Held high-level youth water security consultations on August 19, 2026",
      "Formulated policy briefs on transboundary watershed protection"
    ],
    location: "East Africa",
    startDate: "2026-08-19",
    endDate: "2026-08-25",
    sdgGoals: [6, 13, 15],
    featured: false,
    published: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-ny-1",
    title: "Muhanga District Ecosystem Restoration Field Visit",
    description: "GRI team conducting field inspection in Muhanga District (Gahogo Cell) to evaluate restoration progress.",
    imageUrl: "/images/nyamabuye.jpg",
    category: "Restoration",
    altText: "Green Rwanda Initiative team during field visit in Muhanga District",
    date: "2026-09-30",
    programId: "rise-tree-expansion",
    featured: true
  },
  {
    id: "gal-ny-2",
    title: "Rugeramigozi Nursery Seedling Inspection",
    description: "Inspecting 15,000 native and agroforestry tree seedlings being prepared at Rugeramigozi nursery for the upcoming planting season.",
    imageUrl: "/images/nyamabuye-1.jpg",
    category: "Restoration",
    altText: "Rugeramigozi tree nursery inspection in Muhanga District",
    date: "2026-09-30",
    programId: "rise-tree-expansion",
    featured: true
  },
  {
    id: "gal-ny-3",
    title: "Sample Tree Planting in Rugeramigozi Swamp",
    description: "GRI field team planting sample tree species along the Rugeramigozi swamp to restore degraded wetland catchments.",
    imageUrl: "/images/nyamabuye-2.png",
    category: "Restoration",
    altText: "Sample tree planting in Rugeramigozi swamp catchment",
    date: "2026-09-30",
    programId: "rise-tree-expansion",
    featured: true
  },
  {
    id: "gal-ny-4",
    title: "Community-Led Conservation in Gahogo Cell",
    description: "Engaging local farmer cooperatives and youth nursery managers in Muhanga District.",
    imageUrl: "/images/nyamabuye-3.png",
    category: "Community",
    altText: "Community members participating in Muhanga restoration activities",
    date: "2026-09-30",
    programId: "rise-tree-expansion",
    featured: false
  },
  {
    id: "gal-ny-5",
    title: "Ecosystem Restoration Follow-Up in Muhanga",
    description: "Technical monitoring ensuring high seedling survival rates and watershed protection across Muhanga District.",
    imageUrl: "/images/nyamabuye-4.png",
    category: "Restoration",
    altText: "GRI team conducting restoration follow-up in Muhanga District",
    date: "2026-09-30",
    programId: "rise-tree-expansion",
    featured: false
  },
  {
    id: "gal-yp-1",
    title: "Hon. Rugango Keynote Address at EAC Youth Parliament",
    description: "Hon. Rugango, Executive Director of GRI, addressing East African youth parliamentary delegates on climate action and green skills.",
    imageUrl: "/images/youth-parliament-1.jpeg",
    category: "Youth",
    altText: "Hon. Rugango speaking at the EAC Youth Parliament rostrum",
    date: "2026-09-28",
    featured: true
  },
  {
    id: "gal-yp-2",
    title: "EAC Youth Parliament Plenary Session on Green Transition",
    description: "East African youth parliamentary delegates engaging in high-level deliberations on climate legislation and youth inclusion.",
    imageUrl: "/images/youth-parliament-2.jpeg",
    category: "Advocacy",
    altText: "Youth delegates seated during the EAC Youth Parliament plenary session",
    date: "2026-09-28",
    featured: true
  },
  {
    id: "gal-yp-3",
    title: "Green Skills & Climate Innovation High-Level Panel",
    description: "Hon. Rugango and regional youth leaders discussing green entrepreneurship, sustainable farming, and technical climate skills.",
    imageUrl: "/images/youth-parliament-3.jpeg",
    category: "Youth",
    altText: "Panel discussion at the East Africa Youth Parliament on climate skills",
    date: "2026-09-28",
    featured: true
  },
  {
    id: "gal-yp-4",
    title: "Cross-Border Youth Climate Exchange Assembly",
    description: "Regional youth delegates formulating joint strategies for watershed protection, clean energy access, and forest conservation.",
    imageUrl: "/images/youth-parliament-4.jpeg",
    category: "Advocacy",
    altText: "East African youth climate delegates collaborating during parliamentary workshop",
    date: "2026-09-28",
    featured: false
  },
  {
    id: "gal-yp-5",
    title: "EAC Youth Parliament Policy Recommendations Presentation",
    description: "Youth representatives presenting policy briefs on environmental sustainability and green jobs to parliamentary leadership.",
    imageUrl: "/images/youth-parliament-5.jpeg",
    category: "Youth",
    altText: "Youth parliamentary leaders presenting policy resolutions",
    date: "2026-09-28",
    featured: false
  },
  {
    id: "gal-yp-6",
    title: "GRI Executive Director with Regional Youth Delegates",
    description: "Hon. Rugango in consultation with young environmental advocates advocating for youth-led climate solutions in East Africa.",
    imageUrl: "/images/youth-parliament-6.jpeg",
    category: "Youth",
    altText: "Hon. Rugango engaging with regional youth delegates after the session",
    date: "2026-09-28",
    featured: false
  },
  {
    id: "gal-yp-7",
    title: "Official Delegation Assembly — EAC Youth Parliament",
    description: "Official group photo of East African Youth Parliament delegates united for regional climate action and green economic transition.",
    imageUrl: "/images/youth-parliament-7.jpeg",
    category: "Advocacy",
    altText: "EAC Youth Parliament official group assembly outside parliament chambers",
    date: "2026-09-28",
    featured: false
  },
  {
    id: "gal-1",
    title: "Community Tree Planting Day",
    description: "Local volunteers and youth participating in the RISE TREE expansion planting drive in Muhanga.",
    imageUrl: "/images/_SMN1953.JPG",
    category: "Restoration",
    altText: "Youth and community members planting trees in Rwanda",
    date: "2026-09-15",
    programId: "rise-tree-expansion",
    featured: true
  },
  {
    id: "gal-2",
    title: "Nursery Seedling Management",
    description: "Nurturing 15,000 indigenous and agroforestry seedlings ahead of the October planting season.",
    imageUrl: "/images/_SMN1979.JPG",
    category: "Programs",
    altText: "Greenhouse and nursery seedling preparation",
    date: "2026-09-10",
    programId: "rise-tree-expansion",
    featured: true
  },
  {
    id: "gal-3",
    title: "Youth Climate Leadership Workshop",
    description: "EmpowerLink training session equipping young leaders with digital advocacy and environmental skills.",
    imageUrl: "/images/IMG-20251117-WA0048.jpg",
    category: "Youth",
    altText: "Young Rwandan climate advocates in a workshop session",
    date: "2026-08-28",
    programId: "empowerlink",
    featured: true
  },
  {
    id: "gal-4",
    title: "Women Farmers in Agroforestry",
    description: "Women community leaders leading climate-smart agriculture and soil conservation training.",
    imageUrl: "/images/IMG-20251023-WA0126.jpg",
    category: "Women",
    altText: "Women farmers engaged in agroforestry training",
    date: "2026-08-14",
    programId: "fobasi",
    featured: true
  },
  {
    id: "gal-5",
    title: "Afrika Vuka Energy Dialogue",
    description: "Community members and local officials discussing clean cooking and energy affordability.",
    imageUrl: "/images/whatsapp-2026-09-21-55549.jpeg",
    category: "Campaigns",
    altText: "Community participants at the Afrika Vuka energy dialogue",
    date: "2026-06-20",
    programId: "afrika-vuka",
    featured: true
  },
  {
    id: "gal-6",
    title: "East Africa Youth Consultation",
    description: "Regional delegates collaborating on watershed protection and climate resilience strategies.",
    imageUrl: "/images/whatsapp-2026-09-28-11738.jpeg",
    category: "Community",
    altText: "Regional youth delegates at water and climate engagement",
    date: "2026-08-19",
    programId: "east-africa-water",
    featured: true
  },
  {
    id: "gal-7",
    title: "Ecosystem Restoration Site Visit",
    description: "Field monitoring of planted native trees ensuring high survival and growth rates.",
    imageUrl: "/images/IMG-20251024-WA0033.jpg",
    category: "Restoration",
    altText: "Field officers inspecting restored hillside ecosystem",
    date: "2026-07-05",
    programId: "rise-tree",
    featured: false
  },
  {
    id: "gal-8",
    title: "GRI Team and Community Partners",
    description: "Youth leaders, volunteers, and local partners united for sustainable impact.",
    imageUrl: "/images/logo.jpeg",
    category: "Community",
    altText: "Green Rwanda Initiative official logo and community identity",
    date: "2026-01-01",
    featured: false
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "news-muhanga-field-visit",
    slug: "gri-team-conducts-field-visit-muhanga-district-rugeramigozi-swamp",
    title: "Green Rwanda Initiative Team Conducts Field Visit to Muhanga District and Rugeramigozi Swamp",
    subtitle: "Inspecting 15,000 seedlings at the Rugeramigozi tree nursery and planting sample trees along the Rugeramigozi swamp to restore degraded ecosystems and strengthen community climate resilience in Muhanga District.",
    excerpt: "Yesterday, the Green Rwanda Initiative team conducted a field visit in Muhanga District (Gahogo Cell), to follow up on our restoration activities. We inspected the tree nursery at Rugeramigozi, where seedlings are being prepared for the upcoming planting season, and planted sample trees in the Rugeramigozi swamp to restore degraded ecosystems.",
    content: `## Field Monitoring in Muhanga District

The Green Rwanda Initiative (GRI) team conducted an on-site field monitoring visit in Muhanga District (Gahogo Cell), to follow up on ongoing ecosystem restoration activities and community tree nursery cultivation.

During the visit, the GRI technical team inspected the central tree nursery at Rugeramigozi, where 15,000 indigenous and agroforestry seedlings are currently being cultivated for upcoming seasonal planting drives. Nursery workers and local youth managers demonstrated high propagation survival rates and structured seedling care ahead of distribution to smallholder farming families.

## Sample Tree Planting in Rugeramigozi Swamp

In addition to nursery monitoring, the team executed sample tree planting along the degraded margins of the Rugeramigozi swamp. Planting wetland-compatible native tree species along swamp catchments protects fragile hillside hydrology, controls soil runoff, and prevents wetland degradation.

"This visit reinforces our commitment to ecosystem restoration, climate-smart agricultural practices, and community-led conservation in Muhanga District," stated the GRI field coordination team. "By combining nursery cultivation with active wetland margin planting, we are building a greener and more climate-resilient Rwanda."

GRI continues to work alongside local sector authorities, women farmers, and youth environmental clubs in Gahogo Cell to ensure long-term monitoring, post-planting survival, and sustainable community stewardship.`,
    coverImage: "/images/nyamabuye.jpg",
    coverImageCaption: "GRI field team inspecting Rugeramigozi tree nursery and restoration activities in Muhanga District (Gahogo Cell).",
    coverImageCredit: "Photo: Green Rwanda Initiative Field Operations",
    category: "Projects & Field Stories",
    author: "GRI Field Secretariat",
    authorRole: "Field Reforestation & Operations",
    authorAvatar: "/images/logo.jpeg",
    authorBio: "The GRI Field Secretariat manages community tree nurseries, smallholder farmer training, and ecological monitoring across operational sectors in Rwanda.",
    publishedAt: "2026-09-30",
    readingTime: "3 min read",
    status: "published",
    featured: true,
    published: true,
    tags: ["Muhanga", "Rugeramigozi Nursery", "Reforestation", "Ecosystem Restoration", "Gahogo Cell"],
    keyHighlights: [
      "Field inspection conducted in Muhanga District (Gahogo Cell).",
      "Inspected 15,000 seedlings in Rugeramigozi tree nursery prepared for October planting.",
      "Sample tree planting executed in Rugeramigozi swamp to stabilize wetland soil and catchment hydrology.",
      "Reinforces commitment to climate-smart agriculture and community-led conservation."
    ],
    articleGallery: [
      {
        url: "/images/nyamabuye.jpg",
        caption: "GRI team conducting restoration follow-up in Muhanga District (Gahogo Cell).",
        credit: "Green Rwanda Initiative Field Operations"
      },
      {
        url: "/images/nyamabuye-1.jpg",
        caption: "Inspecting 15,000 indigenous and agroforestry tree seedlings at the Rugeramigozi nursery.",
        credit: "Green Rwanda Initiative Field Operations"
      },
      {
        url: "/images/nyamabuye-2.png",
        caption: "Sample tree planting in the Rugeramigozi swamp to restore degraded wetland catchments.",
        credit: "Green Rwanda Initiative Field Operations"
      },
      {
        url: "/images/nyamabuye-3.png",
        caption: "Engaging local farmer cooperatives and youth nursery managers in Gahogo Cell.",
        credit: "Green Rwanda Initiative Field Operations"
      },
      {
        url: "/images/nyamabuye-4.png",
        caption: "Technical monitoring ensuring high seedling survival rates across Muhanga District.",
        credit: "Green Rwanda Initiative Field Operations"
      }
    ],
    sources: [
      {
        title: "District Environmental & Reforestation Framework",
        sourceName: "Muhanga District Administration",
        url: "https://www.muhanga.gov.rw"
      }
    ],
    seoTitle: "Muhanga District & Rugeramigozi Swamp Field Visit | Green Rwanda Initiative",
    seoDescription: "GRI team inspects 15,000 seedlings at Rugeramigozi nursery and plants sample trees in Rugeramigozi swamp, Muhanga District."
  },
  {
    id: "news-eac-youth-parliament",
    slug: "hon-rugango-addresses-eac-youth-parliament-climate-green-skills",
    title: "Hon. Rugango Addresses EAC Youth Parliament on Climate Change, Youth Leadership and Green Skills",
    subtitle: "In a landmark keynote to East African youth parliamentary delegates, GRI Executive Director Hon. Rugango urged regional leaders to integrate green technical skills, youth entrepreneurship, and climate literacy into national development policies.",
    excerpt: "Hon. Rugango, Executive Director of Green Rwanda Initiative (GRI), addressed the EAC Youth Parliament on climate change and green skills, highlighting the need to equip young people with knowledge and skills to drive climate action and build a sustainable green economy.",
    content: `## Keynote Address at the East African Community Youth Parliament

Addressing youth parliamentary delegates and regional representatives from across East Africa in Arusha, Hon. Rugango, Executive Director of Green Rwanda Initiative (GRI), delivered a high-level keynote speech on climate change adaptation, youth empowerment, and green economic transition.

In his opening remarks, Hon. Rugango emphasized that the climate crisis presents both an existential threat and an unprecedented opportunity for youth leadership. He urged regional decision-makers to move beyond symbolic representation and systematically integrate young people into climate finance, environmental governance, and green technology adoption.

"Equipping young people with green skills and environmental knowledge is not merely an educational goal—it is a vital economic imperative. As East Africa transitions toward climate-resilient agriculture, renewable energy access, and watershed restoration, youth must be placed at the very center of innovation and policy," stated Hon. Rugango.

## Bridging Green Skills with Rural Livelihoods

Drawing from Green Rwanda Initiative's proven field achievements in Rwanda—where over 30,641 trees have been planted and 15,000 seedlings are currently nurtured in Muhanga community nurseries—Hon. Rugango demonstrated how grassroots environmental action generates green jobs for youth and women.

He presented GRI's flagship EmpowerLink program, which provides practical training in nursery management, soil erosion control, clean cooking adoption, and digital climate advocacy. "When young people acquire practical ecological skills, they become stewards of their local land and champions of sustainable community enterprises," he added.

## Cross-Border Policy & Regional Youth Action

Delegates from Kenya, Uganda, Tanzania, South Sudan, and Rwanda engaged in intensive parliamentary discussions following the address, exploring transboundary watershed protection along shared river basins and joint advocacy for international climate finance.

The EAC Youth Parliament concluded with a unanimous resolution endorsing GRI's community-led restoration model and pledging cross-border youth solidarity to accelerate climate-resilient development across the East African Community.`,
    coverImage: "/images/youth-parliament-1.jpeg",
    coverImageCaption: "Hon. Rugango addressing East African youth delegates at the EAC Youth Parliament rostrum.",
    coverImageCredit: "Photo: EAC Youth Parliament Secretariat / GRI Communications",
    category: "Youth & Innovation",
    author: "Mugisha Rugango Jean Felix",
    authorRole: "Executive Director & Deputy Chairperson, GRI",
    authorAvatar: "/images/team/jean-felix-mugisha.jpeg",
    authorBio: "Mugisha Rugango Jean Felix is Executive Director at Green Rwanda Initiative, coordinating field reforestation, youth climate leadership networks, and regional environmental advocacy.",
    publishedAt: "2026-09-28",
    readingTime: "5 min read",
    status: "published",
    featured: true,
    published: true,
    tags: ["EAC Youth Parliament", "Hon. Rugango", "Green Skills", "Climate Action", "East Africa", "Youth Leadership"],
    keyHighlights: [
      "Keynote address at East African Community (EAC) Youth Parliament on climate resilience and green skills.",
      "Call for embedding green technical skills and environmental literacy into regional youth policies.",
      "Integration of GRI's community reforestation models (RISE TREE & EmpowerLink) into East Africa's green transition.",
      "Pledge for cross-border youth solidarity on climate finance and ecosystem protection."
    ],
    articleGallery: [
      {
        url: "/images/youth-parliament-1.jpeg",
        caption: "Hon. Rugango delivering his keynote address at the EAC Youth Parliament rostrum.",
        credit: "EAC Youth Parliament Secretariat"
      },
      {
        url: "/images/youth-parliament-2.jpeg",
        caption: "Youth parliamentary delegates from across East Africa participating in the plenary session on green transition.",
        credit: "EAC Youth Parliament Secretariat"
      },
      {
        url: "/images/youth-parliament-3.jpeg",
        caption: "High-level panel discussion on climate innovation, environmental governance, and green job creation.",
        credit: "EAC Youth Parliament Secretariat"
      },
      {
        url: "/images/youth-parliament-4.jpeg",
        caption: "Cross-border youth climate delegates collaborating during parliamentary policy draft workshops.",
        credit: "EAC Youth Parliament Secretariat"
      },
      {
        url: "/images/youth-parliament-5.jpeg",
        caption: "Youth representatives presenting climate adaptation policy resolutions to East African leaders.",
        credit: "EAC Youth Parliament Secretariat"
      },
      {
        url: "/images/youth-parliament-6.jpeg",
        caption: "Hon. Rugango in consultation with youth climate advocates following the parliamentary assembly.",
        credit: "GRI Communications"
      },
      {
        url: "/images/youth-parliament-7.jpeg",
        caption: "Official group assembly of East African Youth Parliament delegates in Arusha.",
        credit: "EAC Youth Parliament Secretariat"
      }
    ],
    sources: [
      {
        title: "East African Community Youth Policy & Climate Framework",
        sourceName: "East African Community (EAC) Secretariat",
        url: "https://www.eac.int"
      },
      {
        title: "UNEP Youth for Climate Action Report",
        sourceName: "United Nations Environment Programme (UNEP)",
        url: "https://www.unep.org"
      }
    ],
    seoTitle: "Hon. Rugango Keynote at EAC Youth Parliament | Green Rwanda Initiative",
    seoDescription: "Read Hon. Rugango's full address to the EAC Youth Parliament on climate change, green skills, and youth-led environmental leadership across East Africa."
  },
  {
    id: "news-eac-youth-parliament-resolution",
    slug: "eac-youth-parliament-adopts-resolution-on-green-jobs-and-climate-resilience",
    title: "EAC Youth Parliament Adopts Regional Resolution on Green Jobs, Climate Action and Watershed Security",
    subtitle: "Following Hon. Rugango's keynote address, youth parliamentary delegates from across six partner states passed a landmark resolution urging EAC member states to invest in youth climate literacy and green enterprise acceleration.",
    excerpt: "East African youth delegates passed a landmark resolution at the EAC Youth Parliament calling for accelerated climate finance, green technical skills training, and transboundary watershed conservation across East Africa.",
    content: `## Landmark Resolution Passed at Arusha Youth Assembly

Following inspiring deliberations led by Green Rwanda Initiative (GRI) Executive Director Hon. Rugango, delegates at the East African Community (EAC) Youth Parliament unanimously adopted a landmark resolution advocating for enhanced climate resilience, green job creation, and youth inclusion in regional environmental governance.

The resolution highlights three critical pillars for East Africa's sustainable development:

1. **Systemic Green Technical Education:** Integrating climate literacy, agroforestry, and clean energy technology into national vocational and university curricula.
2. **Community Reforestation & Watershed Defense:** Scaling proven community nursery models, such as GRI's RISE TREE initiative, to restore degraded hillside catchments and combat soil erosion across shared river basins.
3. **Youth Climate Finance & Enterprise Acceleration:** Establishing dedicated regional green enterprise funds to support young environmental entrepreneurs driving clean cooking transition and sustainable agriculture.

## Amplifying African Youth Leadership

Delegates commended Rwanda's leadership in youth mobilization and ecosystem restoration. "The work of Green Rwanda Initiative demonstrates that when young people are entrusted with technical tools and community trust, tangible environmental recovery follows," noted a youth parliamentary committee representative.

The resolution will be formally submitted to the EAC Council of Ministers and partner state environmental ministries ahead of upcoming regional climate negotiations.`,
    coverImage: "/images/youth-parliament-2.jpeg",
    coverImageCaption: "Youth parliamentary delegates gathered in Arusha for the formal adoption of the regional climate resolution.",
    coverImageCredit: "Photo: EAC Youth Parliament Secretariat",
    category: "Advocacy",
    author: "GRI Advocacy Secretariat",
    authorRole: "Policy & Regional Advocacy",
    authorAvatar: "/images/logo.jpeg",
    publishedAt: "2026-09-29",
    readingTime: "3 min read",
    status: "published",
    featured: false,
    published: true,
    tags: ["EAC Youth Parliament", "Policy Resolution", "Green Jobs", "Watershed Security", "East Africa"],
    keyHighlights: [
      "Unanimous adoption of regional youth climate resolution by EAC Youth Parliament delegates.",
      "Recommendation to integrate green technical skills and agroforestry into national education frameworks.",
      "Pledge to scale GRI community reforestation models across shared transboundary river basins."
    ],
    sources: [
      {
        title: "EAC Youth Parliament Declarations on Climate & Regional Trade",
        sourceName: "East African Community (EAC)",
        url: "https://www.eac.int"
      }
    ]
  },
  {
    id: "news-1",
    slug: "rise-tree-2026-expansion-launch",
    title: "Green Rwanda Initiative Launches RISE TREE 2026 Expansion with 15,000 Seedlings in Pipeline",
    subtitle: "Scaling community-based reforestation across Muhanga District with indigenous and agroforestry tree nurseries ahead of the October planting season.",
    excerpt: "GRI announces the scaling of its flagship reforestation project in Muhanga District, preparing 15,000 robust seedlings for the October planting season.",
    content: `Green Rwanda Initiative (GRI) is proud to announce the official launch of the RISE TREE 2026 Expansion. Building upon our verified achievement of planting over 30,641 trees and reaching 1,000+ households, this new phase focuses intensely on high-survival rate indigenous species and agroforestry trees in Muhanga District.

With 15,000 seedlings currently thriving in community nurseries, local youth and women farmers are at the forefront of this mobilization. The planting season commencing in October 2026 will further strengthen rural watershed protection, enhance soil fertility, and combat climate vulnerability.

"Restoring our ecosystems is not just about planting trees; it is about nurturing community resilience and empowering the next generation to lead climate action," said the GRI leadership team.`,
    coverImage: "/images/_SMN1979.JPG",
    coverImageCaption: "Community nursery managers preparing indigenous tree seedlings in Muhanga District.",
    coverImageCredit: "Photo: GRI Field Operations Team",
    category: "Projects & Field Stories",
    author: "GRI Field Secretariat",
    authorRole: "Field Reforestation Operations",
    authorAvatar: "/images/logo.jpeg",
    authorBio: "The GRI Field Secretariat manages community tree nurseries, smallholder farmer training, and ecological monitoring across operational sectors in Rwanda.",
    publishedAt: "2026-09-25",
    readingTime: "3 min read",
    status: "published",
    featured: true,
    published: true,
    tags: ["Reforestation", "RISE TREE", "Climate Resilience", "Muhanga"],
    keyHighlights: [
      "15,000 native and agroforestry seedlings prepared in community nurseries.",
      "Deployment focused on Muhanga District.",
      "High-survival post-planting maintenance led by trained youth and farmer cooperatives.",
      "Expansion of cumulative restoration footprint beyond 30,641 planted trees."
    ],
    sources: [
      {
        title: "National Forestry Reforestation Metrics & Agroforestry Guidelines",
        sourceName: "Rwanda Forestry Authority (RFA)",
        url: "https://www.rfa.gov.rw"
      }
    ],
    seoTitle: "RISE TREE 2026 Expansion Launch | Green Rwanda Initiative",
    seoDescription: "Green Rwanda Initiative scales its RISE TREE reforestation project, preparing 15,000 indigenous seedlings in Muhanga District."
  },
  {
    id: "news-2",
    slug: "empowerlink-equipping-3000-youth",
    title: "EmpowerLink Initiative Aims to Train 3,000 Rwandan Youth in Green Skills and Digital Advocacy",
    subtitle: "Bridging ecological protection and economic opportunity through green entrepreneurship, nursery management, and digital climate leadership.",
    excerpt: "GRI's flagship youth program scales up across Rwanda, providing green entrepreneurship training, environmental literacy, and leadership development.",
    content: `Youth leadership is the heartbeat of Green Rwanda Initiative. Through our EmpowerLink program, GRI has set a bold target to empower 3,000 Rwandan youth over the next two years.

The program combines practical environmental education, digital climate advocacy, and green enterprise training. By bridging the gap between ecological preservation and economic opportunity, EmpowerLink ensures that young people are not only witnesses to climate change but active architects of sustainable solutions.`,
    coverImage: "/images/IMG-20251117-WA0048.jpg",
    coverImageCaption: "Young climate advocates during an EmpowerLink digital leadership workshop.",
    coverImageCredit: "Photo: EmpowerLink Youth Program",
    category: "Youth & Innovation",
    author: "Habumuremyi Faustin",
    authorRole: "Chairperson, GRI",
    authorAvatar: "/images/team/foustin-habumuremyi.jpeg",
    authorBio: "Habumuremyi Faustin serves as Chairperson of Green Rwanda Initiative, driving strategic growth, environmental governance, and youth empowerment.",
    publishedAt: "2026-08-30",
    readingTime: "3 min read",
    status: "published",
    featured: true,
    published: true,
    tags: ["EmpowerLink", "Youth Leadership", "Green Skills", "Rwanda"],
    keyHighlights: [
      "Target: 3,000 Rwandan youth equipped with green skills over 2 years.",
      "Curriculum covers nursery management, climate advocacy, and digital leadership.",
      "Formation of active youth climate circles in Kigali and provincial hubs."
    ],
    seoTitle: "EmpowerLink Youth Green Skills Initiative | Green Rwanda Initiative",
    seoDescription: "EmpowerLink initiative aims to equip 3,000 young Rwandans with green entrepreneurship, digital climate advocacy, and environmental leadership skills."
  },
  {
    id: "news-3",
    slug: "afrika-vuka-energy-dialogue-success",
    title: "Afrika Vuka Campaign Engages 42 Youth Leaders on Clean Energy and Climate Justice",
    subtitle: "Grassroots energy dialogues in Rwanda uniting municipal officials and youth environmental advocates around clean cooking and energy justice.",
    excerpt: "GRI successfully concludes grassroots dialogues uniting youth leaders and local officials around clean energy access and affordability.",
    content: `As part of the continental Afrika Vuka campaign, Green Rwanda Initiative hosted dynamic community energy dialogues engaging 42 youth leaders and local government officials.

Discussions centered on accelerating clean cooking solutions, expanding renewable energy access in rural households, and empowering grassroots communities to champion energy justice. The insights gathered are shaping local policy recommendations across Rwanda.`,
    coverImage: "/images/whatsapp-2026-09-21-55549.jpeg",
    coverImageCaption: "Participants gathered at the Afrika Vuka clean energy and climate justice dialogue.",
    coverImageCredit: "Photo: Afrika Vuka / GRI",
    category: "Climate Action",
    author: "Advocacy & Campaigns Secretariat",
    publishedAt: "2026-06-25",
    readingTime: "3 min read",
    status: "published",
    featured: false,
    published: true,
    tags: ["Afrika Vuka", "Clean Energy", "Climate Justice", "Advocacy"],
    keyHighlights: [
      "Engagement with 42 youth leaders and municipal officials in Rwanda.",
      "Focus on clean cooking technologies, household energy affordability, and health.",
      "Policy recommendations submitted to local sector authorities."
    ]
  }
];

export const INITIAL_RESOURCES: ResourceDocument[] = [
  {
    id: "res-1",
    title: "Green Rwanda Initiative Annual Impact & Transparency Report 2024–2025",
    category: "Annual Report",
    year: "2025",
    fileSize: "2.4 MB (PDF)",
    description: "Comprehensive verification of ecosystem restoration outcomes, RISE TREE metrics (30,641+ trees), financial governance, and community benefit distribution.",
    downloadUrl: "#",
    publishedAt: "2025-03-15"
  },
  {
    id: "res-2",
    title: "East Africa Youth Policy Brief: Watershed Protection & Transboundary Water Security",
    category: "Policy Brief",
    year: "2026",
    fileSize: "1.1 MB (PDF)",
    description: "Key findings and recommendations formulated during the August 19, 2026 East Africa Regional Youth Consultation on climate adaptation and water security.",
    downloadUrl: "#",
    publishedAt: "2026-08-25"
  },
  {
    id: "res-3",
    title: "Community Agroforestry & Nursery Management Field Manual",
    category: "Field Manual",
    year: "2026",
    fileSize: "3.8 MB (PDF)",
    description: "Practical guide developed for smallholder farmer cooperatives on high-survival nursery cultivation, indigenous tree species selection, and soil erosion control.",
    downloadUrl: "#",
    publishedAt: "2026-02-10"
  },
  {
    id: "res-4",
    title: "Clean Cooking & Energy Affordability in Rural Rwanda Factsheet",
    category: "Factsheet",
    year: "2026",
    fileSize: "850 KB (PDF)",
    description: "Factsheet examining household energy burdens, health impacts of fuelwood smoke, and community eco-stove distribution outcomes under the Afrika Vuka campaign.",
    downloadUrl: "#",
    publishedAt: "2026-07-01"
  }
];

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: "team-1",
    name: "HABUMUREMYI Faustin",
    role: "Chairperson & Co-Founder",
    bio: "Co-founder and Chairperson of Green Rwanda Initiative leading institutional governance, strategic partnerships, policy engagement, and grassroots community climate action across Rwanda.",
    image: "/images/team/foustin-habumuremyi.jpeg",
    category: "leadership",
    department: "Executive Leadership",
    imagePosition: "center 15%"
  },
  {
    id: "team-2",
    name: "MUGISHA Rugango Jean Felix",
    role: "Executive Director & Deputy Chairperson",
    bio: "Co-founder and Executive Director overseeing technical field operations, community tree nursery development in Muhanga District, youth leadership networks, and EAC regional climate advocacy.",
    image: "/images/team/jean-felix-mugisha.jpeg",
    category: "leadership",
    department: "Executive Management",
    imagePosition: "center 20%"
  }
];

export const STAFF_TEAM: TeamMember[] = [
  {
    id: "staff-1",
    name: "Marie Claire NYIRARUKUNDO",
    role: "Director of Administration & Finance (DAF)",
    bio: "Oversees administrative management, financial operations, grant accounting, human resources, and compliance frameworks to ensure transparent execution of GRI programs.",
    image: "/images/staff/marie-claire-nyirarukundo.jpeg",
    category: "management",
    department: "Finance & Administration",
    imagePosition: "center 20%"
  },
  {
    id: "staff-2",
    name: "Didier BYAMUKAMA",
    role: "Monitoring, Evaluation & Learning (MEL) Manager",
    bio: "Leads project monitoring, data verification systems, impact metrics tracking, and technical learning frameworks for GRI's ecosystem restoration projects.",
    image: "/images/staff/didier-byamukama.jpeg",
    category: "management",
    department: "Monitoring & Evaluation",
    imagePosition: "center 20%"
  },
  {
    id: "staff-3",
    name: "Pascal NTEZIYAREMYE",
    role: "Field Operations & Community Liaison Officer",
    bio: "Coordinates community nursery development, field team logistics, seedling distribution, and local stakeholder engagement in Muhanga Sector and Muhanga District.",
    image: "/images/staff/pascal-nteziyaremye.jpeg",
    category: "field",
    department: "Field Operations",
    imagePosition: "center 20%"
  },
  {
    id: "staff-4",
    name: "Field Officer (Agronomist)",
    role: "Agronomy & Agroforestry Specialist",
    bio: "Manages nursery seedling cultivation, soil conservation technical protocols, agroforestry species selection, and smallholder farmer agronomic training.",
    image: "/images/staff/field-officer-agronomist.jpeg",
    category: "field",
    department: "Agroforestry & Agronomy",
    imagePosition: "center 20%"
  },
  {
    id: "staff-5",
    name: "Field Officer (Environmental Educator)",
    role: "Community Outreach & Climate Educator",
    bio: "Facilitates youth climate workshops, school environmental clubs, clean energy eco-stove training, and community environmental awareness campaigns.",
    image: "/images/staff/field-officer-educator.jpeg",
    category: "field",
    department: "Education & Outreach",
    imagePosition: "center 20%"
  }
];

export const ALL_TEAM_MEMBERS: TeamMember[] = [...LEADERSHIP_TEAM, ...STAFF_TEAM];

export const PARTNERS: Partner[] = [
  {
    name: "350.org",
    category: "Climate Advocacy",
    description: "Global grassroots climate movement collaborating on climate justice, youth advocacy, and renewable energy campaigns.",
    logoUrl: "/images/partners/350.png",
    verified: true
  },
  {
    name: "IOM — UN Migration",
    category: "International Organization",
    description: "United Nations migration agency supporting environmental resilience, climate adaptation, and community mobility solutions.",
    logoUrl: "/images/partners/IOM.png",
    verified: true
  },
  {
    name: "Oxfam",
    category: "International NGO",
    description: "Global confederation partnering on community resilience, gender inclusion in climate action, and sustainable livelihoods.",
    logoUrl: "/images/partners/ox-fam.png",
    verified: true
  },
  {
    name: "Afrika Vuka / Africa Rising",
    category: "Pan-African Network",
    description: "Pan-African movement advancing renewable energy transition, climate action, and community environmental stewardship.",
    logoUrl: "/images/partners/africa-rising.png",
    verified: true
  },
  {
    name: "Stay Grounded",
    category: "Climate Justice Network",
    description: "International network campaigning for just climate solutions, sustainable transportation, and reduced aviation emissions.",
    logoUrl: "/images/partners/stay-grounded.png",
    verified: true
  },
  {
    name: "Local Government & District Authorities",
    category: "Public Institution",
    description: "Collaborating closely with sector and district leaders in Muhanga and across operational regions in Rwanda.",
    verified: true
  },
  {
    name: "Community & Farmer Cooperatives",
    category: "Grassroots",
    description: "Local farmer groups, women's cooperatives, and youth environmental clubs driving on-the-ground implementation.",
    verified: true
  }
];

export const TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      programs: "Programs",
      impact: "Impact",
      gallery: "Gallery",
      news: "News & Stories",
      campaigns: "Campaigns",
      resources: "Publications & Resources",
      getInvolved: "Get Involved",
      partners: "Partners",
      contact: "Contact",
      admin: "Admin",
      supportWork: "Support Our Work",
      exploreImpact: "Explore Our Impact"
    },
    hero: {
      badge: "Youth-led • Community-driven • Rwanda",
      headline: "Restoring Nature. Empowering People. Building Climate Resilience.",
      subheadline: "Empowering communities and restoring ecosystems across Rwanda through youth-led environmental action.",
      ctaExplore: "Explore Our Impact",
      ctaSupport: "Support Our Work"
    },
    impact: {
      title: "Measurable Impact Across Rwanda",
      subtitle: "Verified Results & Strategic Targets",
      achieved: "Achieved",
      ongoing: "Ongoing Activity",
      target: "Strategic Target"
    },
    about: {
      title: "Who We Are",
      text: "Green Rwanda Initiative (GRI) is a Rwandan youth-led environmental and climate organization founded in 2022, working to restore ecosystems, strengthen climate-resilient livelihoods and empower communities to lead practical climate action.",
      communityLed: "Community-led",
      inclusive: "Inclusive",
      actionOriented: "Action-oriented",
      cta: "Learn More About GRI"
    },
    footer: {
      mission: "Building climate-resilient communities through ecosystem restoration, sustainable agriculture, youth leadership and women's empowerment.",
      explore: "Explore",
      getInvolved: "Get Involved",
      connect: "Connect",
      legal: "Legal & Transparency",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2026 Green Rwanda Initiative. All rights reserved."
    }
  },
  rw: {
    nav: {
      home: "Ahabanza",
      about: "Abo Turi Bo",
      programs: "Porogaramu",
      impact: "Ibyagezweho",
      gallery: "Amafoto",
      news: "Amakuru",
      campaigns: "Ubukangurambaga",
      resources: "Ibitabo n'Inyandiko",
      getInvolved: "Fatanya Natwe",
      partners: "Abafatanyabikorwa",
      contact: "Twandikire",
      admin: "Ubuyobozi",
      supportWork: "Tera Inkunga",
      exploreImpact: "Reba Ibyagezweho"
    },
    hero: {
      badge: "Urubyiruko • Abaturage • U Rwanda",
      headline: "Gusubiza Ubuzima. Guha Imbaraga Abaturage. Kubaka Ejo Hazaza.",
      subheadline: "Guteza imbere abaturage no gusubiza ubuzima ku bidukikije mu Rwanda binyuze mu bikorwa by'urubyiruko.",
      ctaExplore: "Reba Ibyagezweho",
      ctaSupport: "Tera Inkunga"
    },
    impact: {
      title: "Ibyagezweho mu Rwanda",
      subtitle: "Imibare Ndamuka n'Intego zacu",
      achieved: "Byagezweho",
      ongoing: "Birakorwa Ubu",
      target: "Intego y'Ejo Hazaza"
    },
    about: {
      title: "Abo Turi Bo",
      text: "Green Rwanda Initiative (GRI) ni umuryango w'urubyiruko w'u Rwanda wita ku bidukikije n'ikirere washinzwe mu 2022, ukora ku gusubiza ubuzima bwa ecosystem, gutsura imibereho yihanganira ihindagurika ry'ikirere no guha abaturage ubushobozi.",
      communityLed: "Ushinzwe n'Abaturage",
      inclusive: "Ugomba Bose",
      actionOriented: "Uharanira Ibikorwa",
      cta: "Menya Byinshi kuri GRI"
    },
    footer: {
      mission: "Kubaka imiryango yihanganira ihindagurika ry'ikirere binyuze mu gusubiza ubuzima ku bidukikije, ubuhinzi burambye, ubuyobozi bw'urubyiruko n'ijambo ry'abagore.",
      explore: "Shakisha",
      getInvolved: "Fatanya Natwe",
      connect: "Huza",
      legal: "Amategeko n'Ibisobanutse",
      privacy: "Politiki y'Ubuzima bwite",
      terms: "Amabwiriza y'Imikoreshereze",
      copyright: "© 2026 Green Rwanda Initiative. Uburenganzira bwose burasanzwe."
    }
  }
};
