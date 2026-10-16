import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { ORGANIZATION, LEADERSHIP_TEAM, STAFF_TEAM, ALL_TEAM_MEMBERS } from '../data/griData';
import { Check, ShieldCheck, Users, Target, ArrowRight, Briefcase, Award, Sprout } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const About: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'leadership' | 'management' | 'field'>('all');

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="About Us | Green Rwanda Initiatives"
        description="Learn about Green Rwanda Initiatives (GRI), our executive leadership, management team, and dedicated field staff driving ecosystem restoration and youth empowerment in Rwanda."
        canonicalUrl="https://greenrwandainitiatives.org/about"
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-2">Established 2022 • Kigali & Muhanga, Rwanda</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">About Us</h1>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
            {ORGANIZATION.primaryMessage}
          </p>
        </div>
      </section>

      {/* Mission & Core Purpose */}
      <section className="py-20 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-earth uppercase tracking-widest block">Core Purpose</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-charcoal">
                Ecosystem Restoration & Community Ownership
              </h2>
              <p className="text-slateText text-sm sm:text-base leading-relaxed">
                Founded in 2022 in Rwanda, Green Rwanda Initiative (GRI) emerged from a commitment among young environmentalists, community leaders, and climate advocates. We recognized that durable ecological restoration requires direct community engagement, economic benefit, and youth ownership.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-forest-subtle text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">Ecosystem Restoration & Agroforestry</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Rehabilitating degraded hillside terrain, propagating native species, and protecting vital watershed catchments.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-forest-subtle text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">Youth Leadership & Women's Inclusion</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Positioning youth and women as primary leaders in nursery management, environmental advocacy, and decision-making.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-forest-subtle text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">Climate-Smart Agriculture & Resilient Livelihoods</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Enhancing smallholder farmer resilience through soil erosion control, agroforestry trees, and clean household energy options.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-warmBg p-2 rounded-xl border border-sand-200 shadow-sm">
                <img
                  src={normalizeImageUrl('/images/_SMN1953.JPG')}
                  alt="GRI team and community members in Rwanda"
                  onError={handleImageError}
                  className="rounded-lg w-full h-[380px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIZATIONAL TIMELINE */}
      <section id="governance" className="py-20 bg-warmBg border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold text-earth uppercase tracking-widest block mb-1">Milestones</span>
            <h2 className="text-3xl font-serif font-bold text-charcoal">GRI Progress Timeline (2022–2026)</h2>
          </div>

          <div className="relative border-l border-sand-300 ml-4 md:ml-24 space-y-10">
            <div className="relative pl-8 md:pl-10">
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-forest-dark border-2 border-white"></div>
              <span className="text-xs font-mono font-bold text-forest uppercase tracking-wider block mb-1">2022 — Founding</span>
              <h3 className="text-base font-serif font-bold text-charcoal mb-1">Establishment of Green Rwanda Initiative</h3>
              <p className="text-xs text-slateText max-w-2xl leading-relaxed">
                Founded by Rwandan youth environmentalists to address hillside soil erosion and watershed degradation in smallholder farming areas.
              </p>
            </div>

            <div className="relative pl-8 md:pl-10">
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-forest-dark border-2 border-white"></div>
              <span className="text-xs font-mono font-bold text-forest uppercase tracking-wider block mb-1">2023–2024 — RISE TREE Milestones</span>
              <h3 className="text-base font-serif font-bold text-charcoal mb-1">30,641+ Trees Planted & 1,000+ Households Reached</h3>
              <p className="text-xs text-slateText max-w-2xl leading-relaxed">
                Executed the RISE TREE initiative, distributing 42 clean energy eco-stoves and training 231 local farmers and youth in nursery maintenance.
              </p>
            </div>

            <div className="relative pl-8 md:pl-10">
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-forest-dark border-2 border-white"></div>
              <span className="text-xs font-mono font-bold text-forest uppercase tracking-wider block mb-1">2025 — Climate Advocacy</span>
              <h3 className="text-base font-serif font-bold text-charcoal mb-1">Afrika Vuka & Regional Youth Mobilization</h3>
              <p className="text-xs text-slateText max-w-2xl leading-relaxed">
                Engaged 42 youth leaders and municipal officials in clean energy affordability, connecting with regional climate caravan networks.
              </p>
            </div>

            <div className="relative pl-8 md:pl-10">
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-earth border-2 border-white"></div>
              <span className="text-xs font-mono font-bold text-earth uppercase tracking-wider block mb-1">2026 — Reforestation Scaling</span>
              <h3 className="text-base font-serif font-bold text-charcoal mb-1">15,000 Seedling Pipeline & EmpowerLink Launch</h3>
              <p className="text-xs text-slateText max-w-2xl leading-relaxed">
                Scaling RISE TREE with 15,000 seedlings in community nurseries in Muhanga District, while launching EmpowerLink for digital climate leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM & STAFF SECTION */}
      <section id="leadership" className="py-20 bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-earth block mb-1">Governance, Management & Operations</span>
              <h2 className="text-3xl font-serif font-bold text-charcoal">Our Team & Staff</h2>
              <p className="text-xs sm:text-sm text-slateText mt-2 leading-relaxed">
                Green Rwanda Initiative is powered by an experienced team of Rwandan climate leaders, management executives, field agronomists, and community educators dedicated to sustainable ecosystem restoration.
              </p>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 bg-warmBg p-1.5 rounded-lg border border-sand-200">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-forest-dark text-white shadow-sm'
                    : 'text-slateText hover:text-charcoal hover:bg-sand-100'
                }`}
              >
                All Team ({ALL_TEAM_MEMBERS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('leadership')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedCategory === 'leadership'
                    ? 'bg-forest-dark text-white shadow-sm'
                    : 'text-slateText hover:text-charcoal hover:bg-sand-100'
                }`}
              >
                Executive Leadership ({LEADERSHIP_TEAM.length})
              </button>
              <button
                onClick={() => setSelectedCategory('management')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedCategory === 'management'
                    ? 'bg-forest-dark text-white shadow-sm'
                    : 'text-slateText hover:text-charcoal hover:bg-sand-100'
                }`}
              >
                Management ({STAFF_TEAM.filter(s => s.category === 'management').length})
              </button>
              <button
                onClick={() => setSelectedCategory('field')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedCategory === 'field'
                    ? 'bg-forest-dark text-white shadow-sm'
                    : 'text-slateText hover:text-charcoal hover:bg-sand-100'
                }`}
              >
                Field Operations ({STAFF_TEAM.filter(s => s.category === 'field').length})
              </button>
            </div>
          </div>

          {/* Section 1: Executive Leadership (Shown when ALL or LEADERSHIP selected) */}
          {(selectedCategory === 'all' || selectedCategory === 'leadership') && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-sand-200">
                <Award className="w-5 h-5 text-forest-dark" />
                <h3 className="text-xl font-serif font-bold text-charcoal">Executive Governance & Leadership</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {LEADERSHIP_TEAM.map((member) => (
                  <div
                    key={member.id}
                    className="bg-warmBg rounded-xl border border-sand-200 overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div>
                      <div className="h-80 sm:h-96 overflow-hidden rounded-lg border border-sand-200 bg-sand-100 mb-6 relative flex items-center justify-center">
                        <img
                          src={normalizeImageUrl(member.image)}
                          alt={member.name}
                          onError={handleImageError}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-darker/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-forest-dark bg-forest-subtle border border-forest/15 px-3 py-1 rounded-full uppercase tracking-wider">
                          {member.role}
                        </span>
                        {member.department && (
                          <span className="text-[10px] font-mono text-earth bg-sand-100 border border-sand-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {member.department}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-serif font-bold text-charcoal mb-3 group-hover:text-forest-dark transition-colors">{member.name}</h4>
                      <p className="text-xs sm:text-sm text-slateText leading-relaxed">{member.bio}</p>
                    </div>
                    <div className="pt-4 mt-6 border-t border-sand-200 flex items-center justify-between text-xs text-gray-500">
                      <span className="font-mono text-[11px] text-forest-dark font-medium">Green Rwanda Initiative</span>
                      <span className="font-mono text-[11px] text-gray-500">Rwanda Secretariat</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Management & Field Staff (Shown when ALL, MANAGEMENT, or FIELD selected) */}
          {(selectedCategory === 'all' || selectedCategory === 'management' || selectedCategory === 'field') && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-sand-200">
                <Users className="w-5 h-5 text-forest-dark" />
                <h3 className="text-xl font-serif font-bold text-charcoal">
                  {selectedCategory === 'management'
                    ? 'Departmental Management'
                    : selectedCategory === 'field'
                    ? 'Field Operations & Technical Officers'
                    : 'Management & Technical Field Staff'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === 'all'
                  ? STAFF_TEAM
                  : STAFF_TEAM.filter(s => s.category === selectedCategory)
                ).map((member) => (
                  <div
                    key={member.id}
                    className="bg-warmBg rounded-xl border border-sand-200 overflow-hidden flex flex-col justify-between p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div>
                      <div className="h-64 sm:h-72 overflow-hidden rounded-lg border border-sand-200 bg-sand-100 mb-5 relative flex items-center justify-center">
                        <img
                          src={normalizeImageUrl(member.image)}
                          alt={member.name}
                          onError={handleImageError}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-darker/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle border border-forest/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {member.role}
                        </span>
                      </div>
                      <h4 className="text-lg font-serif font-bold text-charcoal mb-2 group-hover:text-forest-dark transition-colors">{member.name}</h4>
                      <p className="text-xs text-slateText leading-relaxed mb-4">{member.bio}</p>
                    </div>
                    <div className="pt-3 border-t border-sand-200 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                      <span className="text-forest-dark font-medium">{member.department || 'Staff'}</span>
                      <span className="text-gray-400">GRI Staff</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-forest-darker text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Partner with Our Field Team</h2>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
            Our dedicated team is on the ground in Muhanga District and across Rwanda driving ecosystem restoration, clean energy adoption, and youth leadership.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-md"
            >
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors border border-white/20"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
