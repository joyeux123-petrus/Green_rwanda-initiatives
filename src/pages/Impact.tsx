import React, { useEffect, useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { getImpactStats } from '../services/firebaseService';
import { ImpactStat } from '../types';
import { ShieldCheck, Check } from 'lucide-react';

export const Impact: React.FC = () => {
  const [stats, setStats] = useState<ImpactStat[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getImpactStats();
      setStats(data);
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Our Impact | Green Rwanda Initiatives"
        description="Discover Green Rwanda Initiatives' verified environmental achievements, community engagement metrics, seedling pipelines, and strategic climate targets."
        canonicalUrl="https://greenrwandainitiatives.org/impact"
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-2">Transparent Metrics</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">Our Impact</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Rigorous tracking of our completed reforestation projects, active operational pipelines, and future strategic targets.
          </p>
        </div>
      </section>

      {/* Data Commitment Banner */}
      <section className="py-4 bg-forest-subtle border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2.5 text-xs text-forest-dark font-medium">
          <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
          <p>
            <strong>Data Governance Statement:</strong> Green Rwanda Initiative maintains strict distinction between verified historical achievements, active seedling pipelines, and future program targets.
          </p>
        </div>
      </section>

      {/* Impact Data Grid */}
      <section className="py-20 bg-white border-b border-sand-200 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-warmBg rounded-xl border border-sand-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-serif font-bold text-forest-dark">{stat.display}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      stat.type === 'achieved' ? 'bg-emerald-100 text-emerald-800' :
                      stat.type === 'ongoing' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {stat.type}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-charcoal mb-2">{stat.label}</h3>
                  {stat.note && <p className="text-xs text-slateText leading-relaxed">{stat.note}</p>}
                </div>

                <div className="mt-6 pt-3 border-t border-sand-300 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Verified Operational Record</span>
                  <span className="text-forest">Green Rwanda Initiative</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
