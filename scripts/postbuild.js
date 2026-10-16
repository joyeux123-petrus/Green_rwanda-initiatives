import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const indexHtmlPath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("dist/index.html not found. Please run vite build first.");
  process.exit(1);
}

const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const DOMAIN = 'https://greenrwandainitiatives.org';

// Define metadata and prerendered semantic HTML content for all public routes
const routes = [
  {
    path: '/',
    title: 'Green Rwanda Initiatives | Restoring Nature. Empowering People.',
    description: 'Green Rwanda Initiatives is a youth-led environmental and climate organization in Rwanda working on ecosystem restoration, climate resilience, sustainable agriculture, biodiversity, youth leadership and community empowerment.',
    canonical: `${DOMAIN}/`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Green Rwanda Initiatives | Restoring Nature. Empowering People.',
    content: `
      <header>
        <nav aria-label="Main Navigation">
          <a href="/">Green Rwanda Initiatives</a>
          <a href="/about">About Us</a>
          <a href="/programs">Programs</a>
          <a href="/impact">Impact</a>
          <a href="/news">News</a>
          <a href="/gallery">Gallery</a>
          <a href="/campaigns">Campaigns</a>
          <a href="/resources">Resources</a>
          <a href="/get-involved">Get Involved</a>
          <a href="/partners">Partners</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>
        <section class="hero-section">
          <h1>Green Rwanda Initiatives — Restoring Nature. Empowering People.</h1>
          <p>Green Rwanda Initiatives (GRI) is a Rwandan youth-led environmental and climate organization working with rural and urban communities to restore degraded ecosystems, strengthen climate-resilient livelihoods, promote sustainable agroforestry, and empower the next generation of environmental leaders.</p>
          <div class="hero-actions">
            <a href="/programs">Explore Our Programs</a>
            <a href="/get-involved">Get Involved</a>
            <a href="/contact">Contact Us</a>
          </div>
        </section>
        <section class="impact-summary">
          <h2>Our Verified Environmental Impact</h2>
          <ul>
            <li><strong>30,641+</strong> Trees Planted across Muhanga District & Rwandan catchments</li>
            <li><strong>1,000+</strong> Households Reached with clean energy and resilient livelihoods</li>
            <li><strong>3,000+</strong> People Engaged in community environmental programs</li>
            <li><strong>231+</strong> People Trained in agroforestry and nursery management</li>
            <li><strong>42</strong> Clean Energy Eco-Stoves Distributed to reduce deforestation</li>
            <li><strong>15,000</strong> Seedlings in Current Nursery Pipeline for 2026 planting</li>
          </ul>
        </section>
        <section class="programs-overview">
          <h2>Our Core Environmental Programs</h2>
          <div class="program-card">
            <h3><a href="/programs/rise-tree">RISE TREE Project</a></h3>
            <p>Community-based reforestation, native tree seedling nurseries, and hillside restoration in Muhanga District.</p>
          </div>
          <div class="program-card">
            <h3><a href="/programs/fobasi">FOBASI — Food, Biodiversity & Climate Resilience</a></h3>
            <p>Integrated agroforestry demonstration sites addressing food security and biodiversity loss.</p>
          </div>
          <div class="program-card">
            <h3><a href="/programs/empowerlink">EmpowerLink Youth Green Skills Initiative</a></h3>
            <p>Equipping 3,000 young Rwandans with green entrepreneurship and digital climate advocacy skills.</p>
          </div>
          <div class="program-card">
            <h3><a href="/programs/rise-tree-expansion">RISE TREE 2026 Expansion</a></h3>
            <p>Scaling restoration in Muhanga District (Gahogo Cell and Rugeramigozi swamp catchments).</p>
          </div>
          <div class="program-card">
            <h3><a href="/programs/africa-climate-caravan">Africa Climate Caravan Campaign</a></h3>
            <p>Mobilizing East African youth delegates for equitable climate finance and sustainable energy.</p>
          </div>
          <div class="program-card">
            <h3><a href="/programs/afrika-vuka">Afrika Vuka Clean Energy Campaign</a></h3>
            <p>Engaging local government and youth on clean cooking access and energy justice.</p>
          </div>
          <div class="program-card">
            <h3><a href="/programs/east-africa-water">East Africa Water & Climate Engagement</a></h3>
            <p>Protecting watershed ecosystems and transboundary water security across East Africa.</p>
          </div>
        </section>
        <section class="latest-news-section">
          <h2>Latest News & Field Reports</h2>
          <article>
            <h3><a href="/news/gri-team-conducts-field-visit-muhanga-district-rugeramigozi-swamp">Muhanga District & Rugeramigozi Swamp Field Visit</a></h3>
            <p>GRI team inspects 15,000 seedlings at Rugeramigozi nursery and plants sample trees in Muhanga District.</p>
          </article>
          <article>
            <h3><a href="/news/hon-rugango-addresses-eac-youth-parliament-climate-green-skills">Hon. Rugango Keynote at EAC Youth Parliament</a></h3>
            <p>Executive Director Hon. Rugango addresses EAC Youth Parliament on climate resilience and green jobs.</p>
          </article>
          <article>
            <h3><a href="/news/eac-youth-parliament-adopts-resolution-on-green-jobs-and-climate-resilience">EAC Youth Parliament Resolution on Green Jobs</a></h3>
            <p>Delegates pass landmark resolution calling for green technical skills and watershed defense.</p>
          </article>
        </section>
        <section class="quick-links">
          <h2>Explore More</h2>
          <ul>
            <li><a href="/about">About GRI Secretariat</a></li>
            <li><a href="/impact">View Verified Impact Metrics</a></li>
            <li><a href="/gallery">Photo Gallery Archive</a></li>
            <li><a href="/campaigns">Climate Campaigns</a></li>
            <li><a href="/resources">Publications & Resources</a></li>
            <li><a href="/partners">Our Verified Partners</a></li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 Green Rwanda Initiatives (GRI). Registered NGO in Rwanda.</p>
        <p>Secretariat Office: Muhanga, Rwanda | Phone: +250 780 505 936 | Email: greenrwandainitiative@gmail.com</p>
        <div>
          <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
        </div>
      </footer>
    `
  },
  {
    path: '/about',
    title: 'About Us & Secretariat | Green Rwanda Initiatives',
    description: 'Learn about Green Rwanda Initiatives (GRI), our governance leadership, management team, and dedicated field staff driving ecosystem restoration and youth empowerment in Rwanda.',
    canonical: `${DOMAIN}/about`,
    image: `${DOMAIN}/images/_SMN1953.JPG`,
    type: 'website',
    h1: 'About Green Rwanda Initiatives (GRI)',
    content: `
      <header><nav><a href="/">Home</a> <a href="/about">About</a> <a href="/programs">Programs</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>About Green Rwanda Initiatives (GRI)</h1>
        <p>Green Rwanda Initiatives is a registered youth-led non-profit environmental and climate organization based in Muhanga District, Southern Province, Rwanda. Founded in 2022, GRI works to restore degraded ecosystems, combat climate change, promote sustainable agroforestry, and empower communities and youth.</p>
        <h2>Our Vision & Mission</h2>
        <p><strong>Vision:</strong> A thriving, climate-resilient Rwanda where restored natural ecosystems support sustainable livelihoods for all communities.</p>
        <p><strong>Mission:</strong> To mobilize youth and rural communities for practical ecosystem restoration, sustainable agriculture, clean energy adoption, and climate action advocacy.</p>
        <h2>Leadership & Secretariat</h2>
        <p>GRI is led by Executive Director Hon. Mugisha Rugango Jean Felix alongside a dedicated team of environmental scientists, community mobilizers, and field coordinators operating in Muhanga District, Gahogo Cell, and Rugeramigozi wetland catchments.</p>
        <p><a href="/programs">Explore our Programs</a> | <a href="/impact">View Impact Metrics</a> | <a href="/contact">Contact Secretariat</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives. Muhanga, Rwanda.</p></footer>
    `
  },
  {
    path: '/programs',
    title: 'Our Work & Reforestation Programs | Green Rwanda Initiatives',
    description: 'Explore Green Rwanda Initiatives community-driven environmental programs including RISE TREE, FOBASI, EmpowerLink, and climate advocacy campaigns across Rwanda.',
    canonical: `${DOMAIN}/programs`,
    image: `${DOMAIN}/images/nyamabuye.jpg`,
    type: 'website',
    h1: 'Our Environmental Programs & Initiatives',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Our Environmental Programs & Initiatives</h1>
        <p>Green Rwanda Initiatives implements practical, community-centered programs addressing deforestation, land degradation, food security, clean energy access, and youth green skills.</p>
        <ul>
          <li><a href="/programs/rise-tree">RISE TREE Project</a> — Community-based reforestation and native tree nurseries.</li>
          <li><a href="/programs/fobasi">FOBASI — Food, Biodiversity & Climate Resilience</a> — Agroforestry and smallholder farming support.</li>
          <li><a href="/programs/empowerlink">EmpowerLink Youth Green Skills</a> — Equipping 3,000 young Rwandans with green entrepreneurship skills.</li>
          <li><a href="/programs/rise-tree-expansion">RISE TREE 2026 Expansion</a> — Scaling restoration in Muhanga District (Gahogo & Rugeramigozi).</li>
          <li><a href="/programs/africa-climate-caravan">Africa Climate Caravan Campaign</a> — Regional youth climate finance advocacy.</li>
          <li><a href="/programs/afrika-vuka">Afrika Vuka Clean Energy Campaign</a> — Promoting clean cooking and household energy justice.</li>
          <li><a href="/programs/east-africa-water">East Africa Water & Climate Engagement</a> — Watershed protection and water security.</li>
        </ul>
        <p><a href="/get-involved">Get Involved</a> | <a href="/contact">Contact Us</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/rise-tree-expansion',
    title: 'RISE TREE 2026 Expansion — Muhanga & Rugeramigozi | Green Rwanda Initiatives',
    description: 'Expanding RISE TREE in Muhanga District (Gahogo Cell). Inspecting 15,000 seedlings at Rugeramigozi tree nursery and sample planting along Rugeramigozi swamp catchments.',
    canonical: `${DOMAIN}/programs/rise-tree-expansion`,
    image: `${DOMAIN}/images/nyamabuye.jpg`,
    type: 'website',
    h1: 'RISE TREE 2026 Expansion — Muhanga & Rugeramigozi',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>RISE TREE 2026 Expansion — Muhanga District & Rugeramigozi</h1>
        <p>The RISE TREE 2026 Expansion scales Green Rwanda Initiatives' flagship reforestation work across Muhanga District, specifically targeting Gahogo Cell and the Rugeramigozi wetland catchment.</p>
        <p>Key highlights include preparing a robust pipeline of 15,000 indigenous and agroforestry tree seedlings at the Rugeramigozi tree nursery and conducting sample planting alongside critical watershed zones.</p>
        <p><a href="/programs">Back to Programs</a> | <a href="/contact">Get in Touch</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/rise-tree',
    title: 'RISE TREE Project | Green Rwanda Initiatives',
    description: 'A foundational community-based restoration project achieving 15,641+ trees planted, 3,000+ people reached, 231 trained, and 42 clean energy eco-stoves distributed.',
    canonical: `${DOMAIN}/programs/rise-tree`,
    image: `${DOMAIN}/images/_SMN1953.JPG`,
    type: 'website',
    h1: 'RISE TREE Project',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a></nav></header>
      <main>
        <h1>RISE TREE Project — Community Reforestation</h1>
        <p>RISE TREE is Green Rwanda Initiatives' core community-based restoration initiative, dedicated to hillside reforestation, combating soil erosion, and planting native trees across Muhanga District.</p>
        <p>Achievements to date include 15,641+ trees planted, community seedling nurseries established, and extensive farmer training in sustainable land management.</p>
        <p><a href="/programs">View All Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/fobasi',
    title: 'FOBASI — Food, Biodiversity & Climate Resilience | Green Rwanda Initiatives',
    description: 'Integrated agroforestry initiative addressing food security and biodiversity loss through agroforestry demonstration sites and smallholder farmer capacity building in Rwanda.',
    canonical: `${DOMAIN}/programs/fobasi`,
    image: `${DOMAIN}/images/IMG-20251023-WA0126.jpg`,
    type: 'website',
    h1: 'FOBASI — Food, Biodiversity & Climate Resilience',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a></nav></header>
      <main>
        <h1>FOBASI Initiative</h1>
        <p>FOBASI integrates food security with biodiversity conservation through agroforestry demonstration plots, soil fertility restoration, and training smallholder farmers in Rwanda.</p>
        <p><a href="/programs">Back to Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/empowerlink',
    title: 'EmpowerLink Youth Green Skills Initiative | Green Rwanda Initiatives',
    description: 'Equipping 3,000 young Rwandans with green entrepreneurship, digital climate advocacy, and environmental leadership skills over two years.',
    canonical: `${DOMAIN}/programs/empowerlink`,
    image: `${DOMAIN}/images/IMG-20251117-WA0048.jpg`,
    type: 'website',
    h1: 'EmpowerLink Youth Green Skills Initiative',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a></nav></header>
      <main>
        <h1>EmpowerLink Youth Green Skills Initiative</h1>
        <p>EmpowerLink equips 3,000 young Rwandans with practical green entrepreneurship, digital climate action advocacy, and community leadership training.</p>
        <p><a href="/programs">Back to Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/africa-climate-caravan',
    title: 'Africa Climate Caravan Campaign | Green Rwanda Initiatives',
    description: 'Mobilizing youth delegates and community voices across East Africa to advocate for equitable climate finance and sustainable energy transition.',
    canonical: `${DOMAIN}/programs/africa-climate-caravan`,
    image: `${DOMAIN}/images/IMG-20251024-WA0033.jpg`,
    type: 'website',
    h1: 'Africa Climate Caravan Campaign',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a></nav></header>
      <main>
        <h1>Africa Climate Caravan Campaign</h1>
        <p>Mobilizing East African youth delegates and rural communities to advocate for climate justice, adaptation financing, and sustainable energy transitions.</p>
        <p><a href="/programs">Back to Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/afrika-vuka',
    title: 'Afrika Vuka — Clean Energy Affordability Campaign | Green Rwanda Initiatives',
    description: 'Engaging local government leaders and youth advocates on clean cooking access, household energy affordability, and climate justice.',
    canonical: `${DOMAIN}/programs/afrika-vuka`,
    image: `${DOMAIN}/images/whatsapp-2026-09-21-55549.jpeg`,
    type: 'website',
    h1: 'Afrika Vuka Clean Energy Campaign',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a></nav></header>
      <main>
        <h1>Afrika Vuka Clean Energy Campaign</h1>
        <p>Advocating for affordable clean cooking solutions and household energy access to alleviate pressure on natural forests in Rwanda.</p>
        <p><a href="/programs">Back to Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/programs/east-africa-water',
    title: 'East Africa Youth Water & Climate Engagement | Green Rwanda Initiatives',
    description: 'Regional consultation and policy advocacy focusing on protecting watershed ecosystems, transboundary water security, and youth participation.',
    canonical: `${DOMAIN}/programs/east-africa-water`,
    image: `${DOMAIN}/images/whatsapp-2026-09-28-11738.jpeg`,
    type: 'website',
    h1: 'East Africa Youth Water & Climate Engagement',
    content: `
      <header><nav><a href="/">Home</a> <a href="/programs">Programs</a></nav></header>
      <main>
        <h1>East Africa Youth Water & Climate Engagement</h1>
        <p>Protecting critical freshwater catchments, wetlands, and transboundary water resources through regional youth policy dialogues.</p>
        <p><a href="/programs">Back to Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/impact',
    title: 'Our Verified Impact & Metrics | Green Rwanda Initiatives',
    description: 'Discover Green Rwanda Initiatives verified environmental achievements: 30,641+ trees planted, 1,000+ households reached, 15,000 seedling pipeline, and strategic targets.',
    canonical: `${DOMAIN}/impact`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Our Verified Environmental Impact & Metrics',
    content: `
      <header><nav><a href="/">Home</a> <a href="/impact">Impact</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Our Verified Impact & Metrics</h1>
        <p>Green Rwanda Initiatives measures its progress through rigorous field verification, community feedback, and transparent metrics across ecosystem restoration and youth empowerment.</p>
        <ul>
          <li><strong>30,641+</strong> Trees Planted</li>
          <li><strong>1,000+</strong> Households Reached</li>
          <li><strong>3,000+</strong> People Engaged</li>
          <li><strong>231+</strong> People Trained</li>
          <li><strong>42</strong> Eco-Stoves Distributed</li>
          <li><strong>15,000</strong> Seedlings in Pipeline</li>
        </ul>
        <p><a href="/programs">Explore Programs</a> | <a href="/get-involved">Get Involved</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/gallery',
    title: 'Photo Gallery & Visual Archive | Green Rwanda Initiatives',
    description: 'Authentic visual documentation of community tree planting, youth climate leadership workshops, agroforestry training, and advocacy campaigns in Rwanda.',
    canonical: `${DOMAIN}/gallery`,
    image: `${DOMAIN}/images/nyamabuye.jpg`,
    type: 'website',
    h1: 'Photo Gallery & Visual Archive',
    content: `
      <header><nav><a href="/">Home</a> <a href="/gallery">Gallery</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Photo Gallery & Visual Archive</h1>
        <p>Browse authentic photos and documentation of Green Rwanda Initiatives community tree planting drives, nursery operations in Muhanga District, and youth climate workshops.</p>
        <p><a href="/">Back to Home</a> | <a href="/programs">Our Programs</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news',
    title: 'News & Field Stories | Green Rwanda Initiatives',
    description: 'Official publication archive of Green Rwanda Initiatives featuring field updates, research insights, youth leadership stories, and climate advocacy reports.',
    canonical: `${DOMAIN}/news`,
    image: `${DOMAIN}/images/nyamabuye.jpg`,
    type: 'website',
    h1: 'News & Field Stories',
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>News & Field Stories</h1>
        <p>Read the latest field reports, press releases, and leadership insights from Green Rwanda Initiatives.</p>
        <ul>
          <li><a href="/news/gri-team-conducts-field-visit-muhanga-district-rugeramigozi-swamp">Muhanga District & Rugeramigozi Swamp Field Visit</a></li>
          <li><a href="/news/hon-rugango-addresses-eac-youth-parliament-climate-green-skills">Hon. Rugango Keynote at EAC Youth Parliament</a></li>
          <li><a href="/news/eac-youth-parliament-adopts-resolution-on-green-jobs-and-climate-resilience">EAC Youth Parliament Resolution on Green Jobs</a></li>
          <li><a href="/news/rise-tree-2026-expansion-launch">RISE TREE 2026 Expansion Launch</a></li>
          <li><a href="/news/empowerlink-equipping-3000-youth">EmpowerLink Youth Green Skills Initiative</a></li>
          <li><a href="/news/afrika-vuka-energy-dialogue-success">Afrika Vuka Clean Energy Dialogues</a></li>
        </ul>
        <p><a href="/">Back to Home</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news/gri-team-conducts-field-visit-muhanga-district-rugeramigozi-swamp',
    title: 'Muhanga District & Rugeramigozi Swamp Field Visit | Green Rwanda Initiatives',
    description: 'GRI team inspects 15,000 seedlings at Rugeramigozi nursery and plants sample trees in Rugeramigozi swamp, Muhanga District (Gahogo Cell).',
    canonical: `${DOMAIN}/news/gri-team-conducts-field-visit-muhanga-district-rugeramigozi-swamp`,
    image: `${DOMAIN}/images/nyamabuye.jpg`,
    type: 'article',
    h1: 'Green Rwanda Initiative Team Conducts Field Visit to Muhanga District and Rugeramigozi Swamp',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Green Rwanda Initiative Team Conducts Field Visit to Muhanga District and Rugeramigozi Swamp",
      "description": "GRI team inspects 15,000 seedlings at Rugeramigozi nursery and plants sample trees in Rugeramigozi swamp, Muhanga District (Gahogo Cell).",
      "image": [`${DOMAIN}/images/nyamabuye.jpg`],
      "datePublished": "2026-09-30",
      "mainEntityOfPage": `${DOMAIN}/news/gri-team-conducts-field-visit-muhanga-district-rugeramigozi-swamp`,
      "author": { "@type": "Organization", "name": "Green Rwanda Initiatives" },
      "publisher": { "@type": "NGO", "name": "Green Rwanda Initiatives", "url": `${DOMAIN}/` }
    },
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a></nav></header>
      <main>
        <h1>Green Rwanda Initiative Team Conducts Field Visit to Muhanga District and Rugeramigozi Swamp</h1>
        <p>Published: September 30, 2026 by Green Rwanda Initiatives</p>
        <p>The Green Rwanda Initiatives (GRI) field team conducted a comprehensive inspection of the 15,000 native and agroforestry tree seedlings currently being nurtured at the Rugeramigozi tree nursery in Muhanga District (Gahogo Cell).</p>
        <p>Following the nursery inspection, the team participated in sample tree planting along the Rugeramigozi swamp catchments to reinforce hillside stabilization and protect vital water resources.</p>
        <p><a href="/news">Back to News Archive</a> | <a href="/contact">Contact GRI</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news/hon-rugango-addresses-eac-youth-parliament-climate-green-skills',
    title: 'Hon. Rugango Keynote at EAC Youth Parliament | Green Rwanda Initiatives',
    description: 'Hon. Rugango, Executive Director of GRI, addresses EAC Youth Parliament on climate change, green skills, and youth-led environmental leadership across East Africa.',
    canonical: `${DOMAIN}/news/hon-rugango-addresses-eac-youth-parliament-climate-green-skills`,
    image: `${DOMAIN}/images/youth-parliament-1.jpeg`,
    type: 'article',
    h1: 'Hon. Rugango Addresses EAC Youth Parliament on Climate Change, Youth Leadership and Green Skills',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Hon. Rugango Addresses EAC Youth Parliament on Climate Change, Youth Leadership and Green Skills",
      "description": "Hon. Rugango, Executive Director of GRI, addresses EAC Youth Parliament on climate change, green skills, and youth-led environmental leadership across East Africa.",
      "image": [`${DOMAIN}/images/youth-parliament-1.jpeg`],
      "datePublished": "2026-09-28",
      "mainEntityOfPage": `${DOMAIN}/news/hon-rugango-addresses-eac-youth-parliament-climate-green-skills`,
      "author": { "@type": "Person", "name": "Mugisha Rugango Jean Felix", "jobTitle": "Executive Director, GRI" },
      "publisher": { "@type": "NGO", "name": "Green Rwanda Initiatives", "url": `${DOMAIN}/` }
    },
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a></nav></header>
      <main>
        <h1>Hon. Rugango Addresses EAC Youth Parliament on Climate Change, Youth Leadership and Green Skills</h1>
        <p>Published: September 28, 2026 by Mugisha Rugango Jean Felix, Executive Director</p>
        <p>Hon. Mugisha Rugango Jean Felix delivered a keynote address at the East African Community (EAC) Youth Parliament, emphasizing the pivotal role of youth-led green technical skills, climate resilience, and ecosystem restoration across East Africa.</p>
        <p><a href="/news">Back to News Archive</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news/eac-youth-parliament-adopts-resolution-on-green-jobs-and-climate-resilience',
    title: 'EAC Youth Parliament Resolution on Green Jobs & Climate | Green Rwanda Initiatives',
    description: 'East African youth delegates pass a landmark climate resolution calling for accelerated green technical skills, youth enterprise funding, and watershed defense.',
    canonical: `${DOMAIN}/news/eac-youth-parliament-adopts-resolution-on-green-jobs-and-climate-resilience`,
    image: `${DOMAIN}/images/youth-parliament-2.jpeg`,
    type: 'article',
    h1: 'EAC Youth Parliament Adopts Landmark Resolution on Green Jobs and Climate Resilience',
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a></nav></header>
      <main>
        <h1>EAC Youth Parliament Adopts Landmark Resolution on Green Jobs and Climate Resilience</h1>
        <p>Published: September 28, 2026</p>
        <p>East African youth delegates officially adopted a comprehensive resolution calling for accelerated green job creation, climate financing accessibility, and transboundary watershed defense.</p>
        <p><a href="/news">Back to News</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news/rise-tree-2026-expansion-launch',
    title: 'RISE TREE 2026 Expansion Launch | Green Rwanda Initiatives',
    description: 'Green Rwanda Initiatives scales its RISE TREE reforestation project, preparing 15,000 indigenous seedlings in Muhanga District.',
    canonical: `${DOMAIN}/news/rise-tree-2026-expansion-launch`,
    image: `${DOMAIN}/images/_SMN1979.JPG`,
    type: 'article',
    h1: 'RISE TREE 2026 Expansion Launch in Muhanga District',
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a></nav></header>
      <main>
        <h1>RISE TREE 2026 Expansion Launch in Muhanga District</h1>
        <p>Green Rwanda Initiatives proudly announces the official launch of the RISE TREE 2026 expansion, aiming to plant and nurture thousands of native trees across Muhanga District.</p>
        <p><a href="/news">Back to News</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news/empowerlink-equipping-3000-youth',
    title: 'EmpowerLink Youth Green Skills Initiative | Green Rwanda Initiatives',
    description: 'EmpowerLink initiative aims to equip 3,000 young Rwandans with green entrepreneurship, digital climate advocacy, and environmental leadership skills.',
    canonical: `${DOMAIN}/news/empowerlink-equipping-3000-youth`,
    image: `${DOMAIN}/images/IMG-20251117-WA0048.jpg`,
    type: 'article',
    h1: 'EmpowerLink: Equipping 3,000 Young Rwandans with Green Skills',
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a></nav></header>
      <main>
        <h1>EmpowerLink: Equipping 3,000 Young Rwandans with Green Skills</h1>
        <p>The EmpowerLink initiative is actively training young environmental leaders across Rwanda in sustainable enterprise, climate advocacy, and community leadership.</p>
        <p><a href="/news">Back to News</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/news/afrika-vuka-energy-dialogue-success',
    title: 'Afrika Vuka Clean Energy Dialogues | Green Rwanda Initiatives',
    description: 'GRI concludes grassroots dialogues in Rwanda uniting 42 youth leaders and municipal officials around clean cooking access and energy justice.',
    canonical: `${DOMAIN}/news/afrika-vuka-energy-dialogue-success`,
    image: `${DOMAIN}/images/whatsapp-2026-09-21-55549.jpeg`,
    type: 'article',
    h1: 'Afrika Vuka Grassroots Clean Energy Dialogues Conclude in Success',
    content: `
      <header><nav><a href="/">Home</a> <a href="/news">News</a></nav></header>
      <main>
        <h1>Afrika Vuka Grassroots Clean Energy Dialogues Conclude in Success</h1>
        <p>GRI successfully convened local leaders and youth advocates to advance clean cooking affordability and household energy transitions in Rwanda.</p>
        <p><a href="/news">Back to News</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/campaigns',
    title: 'Climate Campaigns & Advocacy | Green Rwanda Initiatives',
    description: 'Mobilizing youth delegates and rural communities to advocate for clean energy affordability, climate justice, and watershed protection across East Africa.',
    canonical: `${DOMAIN}/campaigns`,
    image: `${DOMAIN}/images/whatsapp-2026-09-21-55549.jpeg`,
    type: 'website',
    h1: 'Climate Campaigns & Grassroots Advocacy',
    content: `
      <header><nav><a href="/">Home</a> <a href="/campaigns">Campaigns</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Climate Campaigns & Grassroots Advocacy</h1>
        <p>Green Rwanda Initiatives spearheads high-impact regional campaigns including Afrika Vuka, Africa Climate Caravan, and East Africa Youth Water & Climate dialogues.</p>
        <p><a href="/contact">Get Involved</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/resources',
    title: 'Publications & Resources | Green Rwanda Initiatives',
    description: 'Access official annual impact reports, policy briefs, agroforestry field manuals, and climate action factsheets published by Green Rwanda Initiatives.',
    canonical: `${DOMAIN}/resources`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Publications & Resources',
    content: `
      <header><nav><a href="/">Home</a> <a href="/resources">Resources</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Publications & Resources</h1>
        <p>Access official research publications, annual impact reports, policy briefs, and agroforestry field guides published by Green Rwanda Initiatives.</p>
        <p><a href="/contact">Contact Secretariat</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/get-involved',
    title: 'Get Involved & Volunteer | Green Rwanda Initiatives',
    description: 'Support grassroots ecosystem restoration, community tree planting, and youth environmental leadership across Rwanda and East Africa.',
    canonical: `${DOMAIN}/get-involved`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Get Involved & Volunteer',
    content: `
      <header><nav><a href="/">Home</a> <a href="/get-involved">Get Involved</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Get Involved & Volunteer with GRI</h1>
        <p>Join Green Rwanda Initiatives as a volunteer, donor, or institutional partner. Support community tree planting drives in Muhanga District and youth green skills training.</p>
        <p><a href="/contact">Contact Us Today</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/partners',
    title: 'Our Verified Partners & Networks | Green Rwanda Initiatives',
    description: 'Explore Green Rwanda Initiatives verified partnerships with 350.org, UN Migration (IOM), Oxfam, Afrika Vuka, Stay Grounded, and local government leadership.',
    canonical: `${DOMAIN}/partners`,
    image: `${DOMAIN}/images/partners/350.png`,
    type: 'website',
    h1: 'Our Verified Partners & Networks',
    content: `
      <header><nav><a href="/">Home</a> <a href="/partners">Partners</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Our Verified Partners & Networks</h1>
        <p>Green Rwanda Initiatives collaborates with prestigious global and regional networks including 350.org, UN Migration (IOM), Oxfam, Afrika Vuka, Stay Grounded, and local Rwandan government authorities.</p>
        <p><a href="/contact">Partner with Us</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/contact',
    title: 'Contact Us | Green Rwanda Initiatives',
    description: 'Get in touch with Green Rwanda Initiatives Secretariat in Muhanga, Rwanda for institutional partnerships, research collaboration, volunteering, or general inquiries.',
    canonical: `${DOMAIN}/contact`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Contact Green Rwanda Initiatives Secretariat',
    content: `
      <header><nav><a href="/">Home</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Contact Green Rwanda Initiatives Secretariat</h1>
        <p><strong>Secretariat Office:</strong> Muhanga, Rwanda</p>
        <p><strong>Phone:</strong> +250 780 505 936</p>
        <p><strong>Email:</strong> greenrwandainitiative@gmail.com</p>
        <p>Reach out to our team for partnerships, volunteering, media inquiries, or program information.</p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Green Rwanda Initiatives',
    description: 'Privacy policy and data protection commitments of Green Rwanda Initiatives, complying with Rwandan law and international data protection principles.',
    canonical: `${DOMAIN}/privacy`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Privacy Policy',
    content: `
      <header><nav><a href="/">Home</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Privacy Policy</h1>
        <p>Green Rwanda Initiatives is committed to protecting your personal data and privacy in accordance with Rwandan data protection laws.</p>
        <p><a href="/">Back to Home</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/terms',
    title: 'Terms of Service | Green Rwanda Initiatives',
    description: 'Terms of service and intellectual property guidelines for using the digital platforms of Green Rwanda Initiatives.',
    canonical: `${DOMAIN}/terms`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    h1: 'Terms of Service',
    content: `
      <header><nav><a href="/">Home</a> <a href="/contact">Contact</a></nav></header>
      <main>
        <h1>Terms of Service</h1>
        <p>By accessing and using the digital platforms of Green Rwanda Initiatives, you agree to comply with our terms and conditions.</p>
        <p><a href="/">Back to Home</a></p>
      </main>
      <footer><p>&copy; 2026 Green Rwanda Initiatives</p></footer>
    `
  },
  {
    path: '/admin',
    title: 'Admin Portal | Green Rwanda Initiatives',
    description: 'Authorized Secretariat admin portal.',
    canonical: `${DOMAIN}/admin`,
    image: `${DOMAIN}/images/logo.jpeg`,
    type: 'website',
    noindex: true,
    h1: 'Admin Portal (Restricted)',
    content: `
      <main>
        <h1>Admin Portal</h1>
        <p>Authorized personnel only. Please log in.</p>
      </main>
    `
  }
];

function generatePageHtml(template, config) {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${config.title}</title>`);

  // Replace Description
  html = html.replace(
    /<meta name="description" content=".*?">/gi,
    `<meta name="description" content="${config.description}">`
  );

  // Replace Robots tag if noindex
  if (config.noindex) {
    html = html.replace(
      /<meta name="robots" content=".*?">/gi,
      `<meta name="robots" content="noindex, nofollow">`
    );
  } else {
    html = html.replace(
      /<meta name="robots" content=".*?">/gi,
      `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
    );
  }

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?">/gi,
    `<link rel="canonical" href="${config.canonical}">`
  );

  // Replace OG Tags
  html = html.replace(/<meta property="og:title" content=".*?">/gi, `<meta property="og:title" content="${config.title}">`);
  html = html.replace(/<meta property="og:description" content=".*?">/gi, `<meta property="og:description" content="${config.description}">`);
  html = html.replace(/<meta property="og:url" content=".*?">/gi, `<meta property="og:url" content="${config.canonical}">`);
  html = html.replace(/<meta property="og:image" content=".*?">/gi, `<meta property="og:image" content="${config.image}">`);
  html = html.replace(/<meta property="og:type" content=".*?">/gi, `<meta property="og:type" content="${config.type || 'website'}">`);

  // Replace Twitter Tags
  html = html.replace(/<meta name="twitter:title" content=".*?">/gi, `<meta name="twitter:title" content="${config.title}">`);
  html = html.replace(/<meta name="twitter:description" content=".*?">/gi, `<meta name="twitter:description" content="${config.description}">`);
  html = html.replace(/<meta name="twitter:image" content=".*?">/gi, `<meta name="twitter:image" content="${config.image}">`);

  // Inject Page JSON-LD if present
  if (config.jsonLd) {
    const jsonLdString = `<script type="application/ld+json" id="prerender-jsonld">${JSON.stringify(config.jsonLd)}</script>`;
    html = html.replace('</head>', `${jsonLdString}\n</head>`);
  }

  // Inject prerendered semantic content into #root so crawlers see full semantic HTML
  const rootReplacement = `<div id="root">\n  ${config.content || ''}\n</div>`;
  html = html.replace(/<div id="root"><\/div>/gi, rootReplacement);

  return html;
}

let prerenderedCount = 0;

for (const r of routes) {
  const pageHtml = generatePageHtml(templateHtml, r);

  if (r.path === '/') {
    fs.writeFileSync(indexHtmlPath, pageHtml, 'utf8');
    prerenderedCount++;
  } else {
    const routeRelative = r.path.startsWith('/') ? r.path.slice(1) : r.path;
    const targetDir = path.resolve(distDir, routeRelative);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.resolve(targetDir, 'index.html'), pageHtml, 'utf8');
    prerenderedCount++;
  }
}

console.log(`✅ Successfully prerendered static semantic HTML for ${prerenderedCount} routes into dist/`);
