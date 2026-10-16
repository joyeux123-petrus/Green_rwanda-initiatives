import React from 'react';
import { SEO } from '../components/ui/SEO';
import { Link } from 'react-router-dom';
import { Users, Handshake, Heart, Sparkles, ArrowRight, Check } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Get Involved | Green Rwanda Initiative"
        description="Join Green Rwanda Initiative as a volunteer, institutional partner, donor, or youth climate advocate."
      />

      {/* Hero */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-2">Collaboration & Engagement</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">Get Involved With GRI</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Support grassroots ecosystem restoration, community tree planting, and youth environmental leadership across Rwanda and East Africa.
          </p>
        </div>
      </section>

      {/* Action Categories */}
      <section className="py-20 bg-white border-b border-sand-200 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* 1. Volunteer */}
            <div id="volunteer" className="bg-warmBg rounded-xl border border-sand-200 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-forest-subtle flex items-center justify-center text-forest mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Volunteer Opportunities</h2>
                <p className="text-xs text-slateText leading-relaxed mb-6">
                  Contribute your skills to community tree planting drives, youth environmental clubs, and seedling nursery care in Rwanda.
                </p>
                <ul className="space-y-2 text-xs text-slateText mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Field tree planting & nursery cultivation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Youth climate advocacy facilitation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Communications & field reporting</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3 rounded-lg text-xs text-center transition-colors flex items-center justify-center gap-2">
                Apply to Volunteer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Partner With Us */}
            <div id="partner" className="bg-warmBg rounded-xl border border-sand-200 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-forest-subtle flex items-center justify-center text-forest mb-6">
                  <Handshake className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Institutional Partnerships</h2>
                <p className="text-xs text-slateText leading-relaxed mb-6">
                  Collaborate with GRI as an NGO, development partner, research institution, or municipal authority committed to sustainability.
                </p>
                <ul className="space-y-2 text-xs text-slateText mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Joint grant programs & field funding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Technical & scientific research collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>CSR & corporate sustainability initiatives</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3 rounded-lg text-xs text-center transition-colors flex items-center justify-center gap-2">
                Explore Partnership <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Support Our Work */}
            <div id="support" className="bg-warmBg rounded-xl border border-sand-200 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-forest-subtle flex items-center justify-center text-forest mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Support Our Work</h2>
                <p className="text-xs text-slateText leading-relaxed mb-6">
                  Direct financial support to scale seedling nurseries in Muhanga, distribute eco-stoves, and train youth leaders.
                </p>
                <ul className="space-y-2 text-xs text-slateText mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Seedling production & planting funds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Clean cooking eco-stove distribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>EmpowerLink youth training workshops</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="w-full bg-forest-light hover:bg-forest text-white font-semibold py-3 rounded-lg text-xs text-center transition-colors flex items-center justify-center gap-2">
                Make a Contribution <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Join the Movement */}
            <div id="movement" className="bg-warmBg rounded-xl border border-sand-200 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-forest-subtle flex items-center justify-center text-forest mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Community & Advocacy Network</h2>
                <p className="text-xs text-slateText leading-relaxed mb-6">
                  Stay updated on GRI field updates, share publications, and participate in regional climate dialogues across East Africa.
                </p>
                <ul className="space-y-2 text-xs text-slateText mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Receive quarterly Secretariat field reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Engage in Afrika Vuka & Climate Caravan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                    <span>Amplify African youth voices for climate justice</span>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3 rounded-lg text-xs text-center transition-colors flex items-center justify-center gap-2">
                Contact Secretariat <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
