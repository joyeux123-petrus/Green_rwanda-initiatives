import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Check, Globe, Send,
  Home as HomeIcon, GraduationCap, Flame, Target,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';
import { useLanguage } from '../context/LanguageContext';
import {
  INITIAL_IMPACT_STATS, CHALLENGES, APPROACH_STEPS, INITIAL_PROGRAMS,
  INITIAL_GALLERY, INITIAL_NEWS, PARTNERS, SDG_GOALS,
  GRI_OPERATIONAL_LOCATIONS, ORGANIZATION
} from '../data/griData';
import { getImpactStats, getPrograms, getGalleryItems, getNewsArticles } from '../services/firebaseService';
import { sendNewsletterNotification } from '../services/emailService';
import { ImpactStat, Program, GalleryItem, NewsArticle } from '../types';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

const HERO_SLIDES = [
  {
    url: "/images/hero/hero1.jpeg",
    alt: "Community reforestation and tree planting operations in Muhanga District, Rwanda",
    caption: "Community Reforestation • Muhanga District",
    badge: "Youth-Led Action • Rwanda"
  },
  {
    url: "/images/hero/hero2.jpeg",
    alt: "Youth climate advocates leading agroforestry and community environmental restoration",
    caption: "Youth-Led Agroforestry Action",
    badge: "Climate Resilience • Local Impact"
  },
  {
    url: "/images/hero/hero3.jpeg",
    alt: "Community seedling nursery producing native and fruit trees in Muhanga District",
    caption: "Community Seedling Nursery • Muhanga",
    badge: "Ecosystem Restoration • Sustainable Agriculture"
  },
  {
    url: "/images/hero/hero4.jpeg",
    alt: "Landscape restoration and environmental protection activities in Rwanda",
    caption: "Ecosystem Restoration Operations",
    badge: "Environmental Stewardship • Community Ownership"
  }
];

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  const [homeNewsletterEmail, setHomeNewsletterEmail] = useState('');
  const [homeNewsletterDone, setHomeNewsletterDone] = useState(false);

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (isHeroPaused) return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHeroPaused]);

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    async function loadData() {
      const [s, p, g, n] = await Promise.all([
        getImpactStats(),
        getPrograms(),
        getGalleryItems(),
        getNewsArticles()
      ]);
      setStats(s);
      setPrograms(p);
      setGallery(g);
      setNews(n);
    }
    loadData();
  }, []);

  const handleHomeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeNewsletterEmail || !homeNewsletterEmail.includes('@')) return;
    const emailToSend = homeNewsletterEmail;
    const existing = JSON.parse(localStorage.getItem('gri_subscribers') || '[]');
    existing.push({ email: emailToSend, date: new Date().toISOString() });
    localStorage.setItem('gri_subscribers', JSON.stringify(existing));

    sendNewsletterNotification(emailToSend);

    setHomeNewsletterDone(true);
    setHomeNewsletterEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Green Rwanda Initiatives | Restoring Nature. Empowering People."
        description="Green Rwanda Initiatives is a Rwandan youth-led environmental and climate organization working on ecosystem restoration, climate resilience, agroforestry, and community leadership."
        canonicalUrl="https://greenrwandainitiatives.org/"
      />

      {/* 1. HERO SECTION */}
      <section
        className="relative bg-forest-darker text-white py-12 sm:py-20 lg:py-28 overflow-hidden border-b border-emerald-900/40 group"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {/* HD Background Image Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                idx === currentHeroSlide
                  ? 'opacity-100 scale-105 transition-transform duration-[8000ms] ease-out'
                  : 'opacity-0 scale-100 pointer-events-none'
              }`}
            >
              <img
                src={normalizeImageUrl(slide.url)}
                alt={slide.alt}
                onError={handleImageError}
                className="w-full h-full object-cover object-center transform transition-transform duration-[8000ms] ease-out"
              />
            </div>
          ))}
          {/* Professional High-Definition Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60" />
        </div>

        {/* Manual Slideshow Controls (Navigation Arrows) */}
        <button
          onClick={prevHeroSlide}
          aria-label="Previous slide"
          className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-forest-darker/60 text-white/90 hover:text-white hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-300 transition-all backdrop-blur-md shadow-2xl opacity-80 group-hover:opacity-100 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextHeroSlide}
          aria-label="Next slide"
          className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-forest-darker/60 text-white/90 hover:text-white hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-300 transition-all backdrop-blur-md shadow-2xl opacity-80 group-hover:opacity-100 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Dynamic Active Slide Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-darker/80 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-4 sm:mb-5 backdrop-blur-md shadow-lg transition-all duration-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{HERO_SLIDES[currentHeroSlide].caption}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.18] sm:leading-[1.12] mb-4 sm:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Restoring Nature. Empowering People.<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-300">
              Building Climate-Resilient Communities.
            </span>
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-emerald-50/95 max-w-3xl mx-auto font-normal leading-relaxed mb-6 sm:mb-9 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {t('hero.subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              to="/impact"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-forest-emerald to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold px-7 py-3.5 rounded-lg border border-emerald-400/40 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:shadow-emerald-700/40 hover:-translate-y-0.5 min-h-[46px] group/btn"
            >
              <span>Explore Our Impact</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <Link
              to="/get-involved"
              className="w-full sm:w-auto bg-forest-darker/70 hover:bg-forest-darker/90 backdrop-blur-md text-white font-bold px-7 py-3.5 rounded-lg border border-emerald-500/40 hover:border-emerald-400/70 transition-all text-xs uppercase tracking-wider flex items-center justify-center shadow-lg hover:-translate-y-0.5 min-h-[46px]"
            >
              Support Our Work
            </Link>
          </div>

          {/* Slideshow Indicator Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-6 sm:mt-8">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.caption}`}
                title={slide.caption}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentHeroSlide
                    ? 'w-8 h-2.5 bg-gradient-to-r from-emerald-400 to-green-300 shadow-md shadow-emerald-400/50'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. VERIFIED IMPACT METRICS BAR */}
      <section className="py-16 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-sand-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Measured Progress</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">Verified Results & Active Operations</h2>
            </div>
            <Link to="/impact" className="mt-2 md:mt-0 text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1 uppercase tracking-wider">
              View Detailed Metrics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.slice(0, 4).map((stat, idx) => (
              <div key={idx} className="p-6 bg-warmBg rounded-lg border border-sand-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark">{stat.display}</span>
                    <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                      stat.type === 'achieved' ? 'bg-forest-subtle text-forest-dark' : 'bg-earth-subtle text-earth-dark'
                    }`}>
                      {stat.type}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal mb-1">{stat.label}</h3>
                  <p className="text-xs text-slateText leading-relaxed">{stat.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE & MISSION */}
      <section className="py-20 bg-warmBg border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-earth block">About Green Rwanda Initiative</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal leading-tight">
                Youth-Led Environmental Reforestation and Livelihoods in Rwanda
              </h2>
              <p className="text-slateText text-base sm:text-lg leading-relaxed">
                Founded in 2022 by young Rwandan environmentalists, Green Rwanda Initiative (GRI) works directly with rural smallholder farmers, local government leaders, and youth groups to restore degraded hillside ecosystems and strengthen climate-resilient livelihoods.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-sand-200">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-dark">Community Ownership</h3>
                  <p className="text-xs text-slateText leading-relaxed">Establishing community nurseries and working alongside local farming families.</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-dark">Inclusive Leadership</h3>
                  <p className="text-xs text-slateText leading-relaxed">Engaging women and youth as core climate decision-makers and stewards.</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-dark">Practical Action</h3>
                  <p className="text-xs text-slateText leading-relaxed">High-survival agroforestry planting and household clean energy transition.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-forest-dark hover:bg-forest text-white font-semibold px-6 py-3 rounded-md text-xs uppercase tracking-wider transition-colors"
                >
                  Read About Our Secretariat & Mission
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-3 rounded-lg border border-sand-200 shadow-sm">
                <img
                  src={normalizeImageUrl('/images/green_rwanda.jpeg')}
                  alt="Green Rwanda Initiative - Youth-Led Environmental Reforestation and Livelihoods in Rwanda"
                  onError={handleImageError}
                  className="w-full h-[360px] object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GEOGRAPHIC OPERATIONAL PRESENCE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Geographic Footprint</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">Where We Operate in Rwanda</h2>
            <p className="text-xs sm:text-sm text-slateText mt-1.5 sm:mt-2">
              Our field operations in Rwanda are concentrated in Muhanga District (Southern Province), driving community-led reforestation, seedling nursery management, and watershed restoration.
            </p>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="block md:hidden space-y-3.5">
            {GRI_OPERATIONAL_LOCATIONS.map((loc, idx) => (
              <div key={idx} className="bg-warmBg p-4 rounded-lg border border-sand-200 space-y-2 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-forest-dark">{loc.name}</h3>
                    <p className="text-[11px] text-gray-500 font-medium">{loc.district}, {loc.province}</p>
                  </div>
                  <span className="bg-forest-subtle text-forest-dark font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded shrink-0">
                    {loc.type}
                  </span>
                </div>
                <p className="text-xs text-slateText leading-relaxed pt-1.5 border-t border-sand-200/80">{loc.description}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table View (≥ md) */}
          <div className="hidden md:block overflow-x-auto border border-sand-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-sand-100 border-b border-sand-200 text-gray-600 uppercase font-mono text-[11px]">
                  <th className="py-3.5 px-4 font-bold">Location / Sector</th>
                  <th className="py-3.5 px-4 font-bold">Province / Region</th>
                  <th className="py-3.5 px-4 font-bold">Classification</th>
                  <th className="py-3.5 px-4 font-bold">Primary Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200 text-charcoal bg-white">
                {GRI_OPERATIONAL_LOCATIONS.map((loc, idx) => (
                  <tr key={idx} className="hover:bg-sand-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-sm text-forest-dark">{loc.name}</td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">{loc.district}, {loc.province}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-forest-subtle text-forest-dark font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded">
                        {loc.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slateText max-w-xs">{loc.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROGRAMS */}
      <section className="py-20 bg-warmBg border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Core Initiatives</span>
              <h2 className="text-3xl font-serif font-bold text-charcoal">Featured Programs & Projects</h2>
            </div>
            <Link to="/programs" className="mt-4 md:mt-0 text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1 uppercase tracking-wider">
              View All Programs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.filter(p => p.featured).slice(0, 3).map((prog) => (
              <div key={prog.id} className="bg-white rounded-lg border border-sand-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-sand-100">
                    <img src={normalizeImageUrl(prog.image)} alt={prog.title} onError={handleImageError} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-forest-dark text-white text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                      {prog.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-mono font-bold text-earth uppercase tracking-wider mb-2">
                      {prog.categories.join(' • ')}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-charcoal mb-2">{prog.title}</h3>
                    <p className="text-xs text-slateText line-clamp-3 mb-4 leading-relaxed">{prog.description}</p>

                    <ul className="space-y-1.5 mb-6 text-xs text-slateText">
                      {prog.keyFigures.slice(0, 3).map((fig, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                          <span>{fig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    to={`/programs/${prog.slug}`}
                    className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-2.5 rounded text-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Program Overview <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. METHODOLOGY & APPROACH */}
      <section className="py-20 bg-forest-darker text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">Methodology</span>
            <h2 className="text-3xl font-serif font-bold">The GRI Operational Approach</h2>
            <p className="text-sm text-gray-300 mt-2">
              A structured, community-anchored methodology driving sustainable ecosystem restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {APPROACH_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">0{idx + 1}</span>
                  <h3 className="text-base font-serif font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-xs font-semibold text-emerald-300 mb-2">{step.subtitle}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. UN SUSTAINABLE DEVELOPMENT GOALS */}
      <section className="py-20 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Global Alignment</span>
            <h2 className="text-3xl font-serif font-bold text-charcoal">UN Sustainable Development Goals</h2>
            <p className="text-sm text-slateText mt-2">
              Our community ecosystem restoration directly contributes to global climate and poverty reduction targets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SDG_GOALS.map((sdg) => (
              <div key={sdg.number} className="p-6 bg-warmBg rounded-lg border border-sand-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded bg-forest-dark text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {sdg.number}
                  </span>
                  <h3 className="text-base font-serif font-bold text-charcoal">{sdg.title}</h3>
                </div>
                <p className="text-xs text-slateText leading-relaxed">{sdg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FIELD PHOTO ARCHIVE PREVIEW */}
      <section className="py-20 bg-warmBg border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Visual Documentation</span>
              <h2 className="text-3xl font-serif font-bold text-charcoal">Stories From the Field</h2>
            </div>
            <Link to="/gallery" className="mt-4 md:mt-0 text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1 uppercase tracking-wider">
              View Complete Archive <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-sand-200 overflow-hidden shadow-sm">
                <div className="h-48 overflow-hidden bg-sand-100">
                  <img src={normalizeImageUrl(item.imageUrl)} alt={item.altText} onError={handleImageError} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-mono font-bold text-earth uppercase tracking-wider block mb-1">{item.category}</span>
                  <h3 className="text-xs font-bold text-charcoal line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slateText mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LATEST NEWS & FIELD UPDATES */}
      <section className="py-20 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Field Updates & News</span>
              <h2 className="text-3xl font-serif font-bold text-charcoal">Latest News & Updates</h2>
            </div>
            <Link to="/news" className="mt-4 md:mt-0 text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1 uppercase tracking-wider">
              View All Articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.slice(0, 3).map((article) => (
              <div key={article.id} className="bg-warmBg rounded-lg border border-sand-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-sand-100">
                    <img src={normalizeImageUrl(article.coverImage)} alt={article.title} onError={handleImageError} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-forest-dark text-white font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-2">
                      <span>{article.publishedAt}</span>
                      {article.readingTime && <span>{article.readingTime}</span>}
                    </div>
                    <h3 className="text-base font-serif font-bold text-charcoal mb-2 hover:text-forest transition-colors leading-snug">
                      <Link to={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-slateText line-clamp-3 leading-relaxed">{article.excerpt}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 border-t border-sand-200/60 mt-3 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-gray-600 font-medium">By {article.author}</span>
                  <Link to={`/news/${article.slug}`} className="text-xs font-bold text-forest hover:text-forest-light uppercase tracking-wider inline-flex items-center gap-1">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER SUBSCRIPTION */}
      <section className="py-16 bg-forest-dark text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">Secretariat Communications</span>
              <h2 className="text-2xl font-serif font-bold text-white mb-2">Receive Quarterly GRI Field Reports</h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Stay updated on seedling nursery production, community tree survival rates, and policy submissions across Rwanda and East Africa.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0">
              {homeNewsletterDone ? (
                <div className="bg-forest-light text-white px-5 py-3 rounded text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed to official GRI updates.</span>
                </div>
              ) : (
                <form onSubmit={handleHomeNewsletter} className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                  <input
                    type="email"
                    value={homeNewsletterEmail}
                    onChange={(e) => setHomeNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full sm:w-64 bg-white/10 border border-white/20 rounded px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-forest-light hover:bg-forest-emerald text-white font-semibold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11. VERIFIED PARTNERS & COLLABORATION */}
      <section className="py-16 sm:py-20 bg-warmBg border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Institutional Solidarity</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal mb-3">Our Verified Partners & Global Coalitions</h2>
          <p className="text-xs sm:text-sm text-slateText max-w-2xl mx-auto mb-10 leading-relaxed">
            Partnering with international UN agencies, global climate movements, public authorities, and community cooperatives to restore ecosystems and empower local livelihoods.
          </p>

          {/* Interactive Infinite Animated Partner Logos Strip */}
          <div className="bg-white py-6 rounded-2xl border border-sand-200 shadow-xs mb-10 overflow-hidden relative">
            <div className="flex animate-marquee gap-8 sm:gap-12 items-center">
              {[...PARTNERS.filter(p => p.logoUrl), ...PARTNERS.filter(p => p.logoUrl), ...PARTNERS.filter(p => p.logoUrl)].map((partner, idx) => (
                <div
                  key={idx}
                  className="h-16 shrink-0 flex items-center justify-center px-6 py-2.5 bg-warmBg/70 rounded-xl border border-sand-200/90 hover:border-emerald-500/50 hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <img
                    src={normalizeImageUrl(partner.logoUrl)}
                    alt={`${partner.name} logo`}
                    onError={handleImageError}
                    className="max-h-10 w-auto max-w-[150px] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARTNERS.slice(0, 6).map((partner, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-sand-200 text-left hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold text-forest-dark uppercase tracking-wider bg-forest-subtle px-2.5 py-0.5 rounded-full">
                      {partner.category}
                    </span>
                    {partner.verified && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
                      </span>
                    )}
                  </div>

                  {partner.logoUrl ? (
                    <div className="h-16 flex items-center justify-start mb-4 p-3 bg-warmBg/60 rounded-xl border border-sand-200/80 group-hover:bg-white transition-colors">
                      <img
                        src={normalizeImageUrl(partner.logoUrl)}
                        alt={partner.name}
                        onError={handleImageError}
                        className="max-h-11 w-auto max-w-[150px] object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-16 flex items-center justify-start mb-4 p-3 bg-forest-subtle/50 rounded-xl border border-sand-200/80">
                      <span className="text-xs font-serif font-bold text-forest-dark">{partner.name}</span>
                    </div>
                  )}

                  <h3 className="text-base font-serif font-bold text-charcoal mb-1.5 group-hover:text-forest-dark transition-colors">{partner.name}</h3>
                  <p className="text-xs text-slateText leading-relaxed">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 bg-forest-dark hover:bg-forest text-white font-semibold px-7 py-3 rounded-md text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              Explore Full Partner Directory & Network
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. TAKE ACTION & CONTACT CTA */}
      <section className="py-20 bg-forest-darker text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Partner With GRI</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Join Us in Building Climate Resilience Across Rwanda
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether through institutional funding, technical collaboration, or volunteering, your engagement directly supports grassroots ecosystem restoration and community leadership.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/get-involved"
              className="w-full sm:w-auto bg-forest-light hover:bg-forest-emerald text-white font-semibold px-7 py-3.5 rounded text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded border border-white/20 text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
            >
              Contact Secretariat
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
