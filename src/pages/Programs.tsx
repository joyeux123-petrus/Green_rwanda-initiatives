import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { getPrograms } from '../services/firebaseService';
import { Program } from '../types';
import { ArrowRight, Check, Filter } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function load() {
      const data = await getPrograms();
      setPrograms(data);
    }
    load();
  }, []);

  const categories = ['All', 'Restoration', 'Agriculture', 'Energy', 'Youth', 'Climate Advocacy'];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter(p => p.categories.includes(selectedCategory));

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Our Work | Green Rwanda Initiatives"
        description="Explore Green Rwanda Initiatives' community-driven environmental programs including RISE TREE, FOBASI, EmpowerLink, and climate advocacy campaigns across Rwanda."
        canonicalUrl="https://greenrwandainitiatives.org/programs"
      />

      {/* Hero */}
      <section className="bg-forest-darker text-white py-12 sm:py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Our Initiatives</span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-3 sm:mb-4">Our Work</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From grassroots ecosystem restoration and agroforestry to youth leadership and clean energy campaigns across Rwanda.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-3.5 sm:py-5 bg-white border-b border-sand-200 sticky top-12 sm:top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          <Filter className="w-4 h-4 text-forest mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors min-h-[40px] flex items-center justify-center ${
                selectedCategory === cat
                  ? 'bg-forest-dark text-white shadow-sm'
                  : 'bg-sand-100 text-charcoal hover:bg-sand-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-10 sm:py-16 bg-warmBg flex-grow border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPrograms.map((prog) => (
              <div key={prog.id} className="bg-white rounded-lg border border-sand-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative h-44 sm:h-52 overflow-hidden bg-sand-100">
                    <img src={normalizeImageUrl(prog.image)} alt={prog.title} onError={handleImageError} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-forest-dark text-white text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                      {prog.status}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {prog.categories.map((cat, i) => (
                        <span key={i} className="text-[10px] font-mono font-semibold bg-forest-subtle text-forest-dark px-2 py-0.5 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-charcoal mb-2">{prog.title}</h3>
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

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <Link
                    to={`/programs/${prog.slug}`}
                    className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    View Program Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
