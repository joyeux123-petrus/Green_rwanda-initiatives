import React, { useEffect, useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { Link } from 'react-router-dom';
import { getPrograms } from '../services/firebaseService';
import { Program } from '../types';
import { ArrowRight, Check } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const Campaigns: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getPrograms();
      setPrograms(data);
    }
    load();
  }, []);

  const campaigns = programs.filter(p => p.statusType === 'campaign' || p.categories.includes('Climate Advocacy'));

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Climate Campaigns & Advocacy | Green Rwanda Initiative"
        description="Explore GRI's climate advocacy campaigns including Africa Climate Caravan, Afrika Vuka energy justice, and East Africa Youth Water & Climate Engagement."
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-2">Policy & Advocacy</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">Climate Advocacy Campaigns</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Mobilizing youth delegates and rural communities to advocate for clean energy affordability, climate justice, and watershed protection across East Africa.
          </p>
        </div>
      </section>

      {/* Campaigns List */}
      <section className="py-20 bg-white border-b border-sand-200 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {campaigns.length === 0 ? (
            <div className="text-center py-12 text-slateText text-xs">
              No active campaigns found.
            </div>
          ) : (
            campaigns.map((camp) => (
              <div key={camp.id} className="bg-warmBg rounded-xl border border-sand-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-5 relative h-64 lg:h-auto bg-sand-100">
                  <img src={normalizeImageUrl(camp.image)} alt={camp.title} onError={handleImageError} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-forest-dark text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                    {camp.status}
                  </span>
                </div>
                <div className="lg:col-span-7 p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-earth uppercase tracking-wider mb-2">
                      {camp.categories.join(' • ')}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-charcoal mb-3">{camp.title}</h2>
                    <p className="text-xs text-slateText leading-relaxed mb-6">{camp.description}</p>

                    <ul className="space-y-1.5 mb-8">
                      {camp.keyFigures.map((fig, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slateText">
                          <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                          <span>{fig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      to={`/programs/${camp.slug}`}
                      className="inline-flex items-center gap-1.5 bg-forest-dark hover:bg-forest text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-xs"
                    >
                      Campaign Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};
