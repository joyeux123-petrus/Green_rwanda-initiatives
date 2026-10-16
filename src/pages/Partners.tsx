import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { PARTNERS } from '../data/griData';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';
import {
  ShieldCheck, ArrowRight, Globe, Building2, Handshake,
  TreePine, Flame, Users, Sparkles, CheckCircle2, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Partners: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Climate Advocacy', 'International Organization', 'International NGO', 'Pan-African Network', 'Public Institution', 'Grassroots'];

  const filteredPartners = selectedCategory === 'All'
    ? PARTNERS
    : PARTNERS.filter(p => p.category === selectedCategory);

  const partnershipPillars = [
    {
      title: "Reforestation & Ecosystem Restoration",
      icon: TreePine,
      description: "Co-funding community nurseries, agroforestry distribution, and hillside slope stabilization in Muhanga District."
    },
    {
      title: "Youth Climate Leadership & Advocacy",
      icon: Users,
      description: "Empowering young environmental stewards through regional policy advocacy, EAC Youth Parliament, and local climate circles."
    },
    {
      title: "Household Clean Energy Transition",
      icon: Flame,
      description: "Scaling household access to clean-cooking eco-stoves to halt deforestation pressure on native watersheds."
    },
    {
      title: "Research, GIS & Impact Monitoring",
      icon: Globe,
      description: "Collaborating with academic bodies and UN agencies on seedling survival rate verification and ecosystem monitoring."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Our Partners & Networks | Green Rwanda Initiative"
        description="Explore Green Rwanda Initiative's verified partnerships with 350.org, UN Migration (IOM), Oxfam, Afrika Vuka, Stay Grounded, and local government leadership."
      />

      {/* 1. HERO SECTION */}
      <section className="bg-forest-darker text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-emerald/20 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-[11px] font-mono uppercase tracking-wider mb-5 backdrop-blur-sm">
            <Handshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Institutional Solidarity & Global Networks</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-5 leading-tight">
            Our Verified Partners & Strategic Allies
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            Green Rwanda Initiative collaborates with international development agencies, global climate movements, public authorities, and community cooperatives to restore degraded ecosystems and empower resilient livelihoods.
          </p>

          {/* Key Partnership Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-center">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-emerald-400">5+</span>
              <span className="text-gray-300 font-medium text-[11px] sm:text-xs">Global & Regional Coalitions</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-emerald-400">15,000</span>
              <span className="text-gray-300 font-medium text-[11px] sm:text-xs">Seedlings Pipeline Supported</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-emerald-400">6</span>
              <span className="text-gray-300 font-medium text-[11px] sm:text-xs">East African Countries Engaged</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-emerald-400">100%</span>
              <span className="text-gray-300 font-medium text-[11px] sm:text-xs">Community-Driven Execution</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE ANIMATED LOGO TICKER */}
      <section className="py-8 bg-white border-b border-sand-200 overflow-hidden">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-earth mb-5 font-bold">
          Recognized & Supported By Leading Global Organizations & Networks
        </p>
        <div className="relative w-full overflow-hidden py-3 bg-warmBg/50 border-y border-sand-200/80">
          <div className="flex animate-marquee gap-8 sm:gap-12 items-center">
            {[...PARTNERS.filter(p => p.logoUrl), ...PARTNERS.filter(p => p.logoUrl), ...PARTNERS.filter(p => p.logoUrl)].map((partner, idx) => (
              <div
                key={idx}
                className="h-16 shrink-0 flex items-center justify-center px-6 py-2 bg-white rounded-xl border border-sand-200 hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 group cursor-pointer"
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
      </section>

      {/* 3. PARTNERS DIRECTORY */}
      <section className="py-16 sm:py-20 bg-warmBg flex-grow border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Directory</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal">Verified Organizational Partners</h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-forest-dark text-white shadow-xs'
                      : 'bg-white border border-sand-300 text-charcoal hover:bg-sand-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sand-200 p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative Top Emerald Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-light via-emerald-400 to-forest-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div>
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-3 py-1 rounded-full uppercase tracking-wider">
                      {partner.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                    </div>
                  </div>

                  {partner.logoUrl ? (
                    <div className="h-20 flex items-center justify-start mb-5 p-3.5 bg-warmBg/60 rounded-xl border border-sand-200/80 group-hover:bg-white group-hover:border-sand-300 transition-colors">
                      <img
                        src={normalizeImageUrl(partner.logoUrl)}
                        alt={partner.name}
                        onError={handleImageError}
                        className="max-h-14 w-auto max-w-[170px] object-contain"
                      />
                    </div>
                  ) : (
                    <div className="h-20 flex items-center justify-center mb-5 p-3 bg-forest-subtle/50 rounded-xl border border-sand-200/80">
                      <Building2 className="w-8 h-8 text-forest-dark/60" />
                    </div>
                  )}

                  <h3 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-forest-dark transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-slateText leading-relaxed text-xs sm:text-sm">
                    {partner.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-sand-200/80 flex items-center justify-between text-xs font-semibold text-forest">
                  <span className="inline-flex items-center gap-1.5 text-forest-emerald">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Active Collaboration
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STRATEGIC PARTNERSHIP PILLARS */}
      <section className="py-16 sm:py-20 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Collaboration Models</span>
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-3">How We Partner for Lasting Impact</h2>
            <p className="text-slateText text-sm sm:text-base leading-relaxed">
              Green Rwanda Initiative provides tailored partnership frameworks for international NGOs, philanthropic foundations, UN agencies, and research institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="p-6 bg-warmBg rounded-xl border border-sand-200 space-y-3 hover:border-emerald-500/40 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-forest-subtle text-forest-dark flex items-center justify-center mb-2">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-charcoal">{pillar.title}</h3>
                  <p className="text-xs text-slateText leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION / PARTNERSHIP INQUIRY PORTAL */}
      <section className="py-20 bg-forest-darker text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Join Our Global Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-4 tracking-tight">
            Interested in Partnering With Green Rwanda Initiative?
          </h2>

          <p className="text-gray-200 text-sm sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            We welcome collaboration with development agencies, philanthropic foundations, research institutions, and corporate leaders committed to environmental restoration and climate justice in Rwanda and East Africa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-forest-light hover:bg-forest-emerald text-white font-semibold px-8 py-3.5 rounded-md border border-emerald-500/30 transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md min-h-[48px]"
            >
              <Mail className="w-4 h-4" />
              Contact Partnership Secretariat
            </Link>
            <Link
              to="/get-involved#partner"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-md border border-white/20 transition-colors text-xs uppercase tracking-wider flex items-center justify-center min-h-[48px]"
            >
              Explore Partnership Benefits
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
