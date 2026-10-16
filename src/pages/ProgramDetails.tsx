import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { getProgramBySlug, getGalleryItems } from '../services/firebaseService';
import { SDG_GOALS } from '../data/griData';
import { Program, GalleryItem } from '../types';
import { ArrowLeft, Check, MapPin, Calendar, Target, ShieldCheck, Download, Handshake, Globe } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const ProgramDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const p = slug ? await getProgramBySlug(slug) : undefined;
      setProgram(p || null);
      setLoading(false);

      const g = await getGalleryItems();
      setGallery(g);
    }
    load();
  }, [slug]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-xs">Loading program details...</div>;
  }

  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-serif font-bold text-charcoal mb-3">Program Record Not Found</h1>
        <p className="text-xs text-gray-600 mb-6">The specified program details could not be retrieved.</p>
        <Link to="/programs" className="bg-forest-dark text-white font-semibold px-5 py-2.5 rounded-lg text-xs">
          Return to Programs List
        </Link>
      </div>
    );
  }

  const relatedGallery = gallery.filter(g => g.programId === program.id || program.categories.includes(g.category));
  const alignedSdgs = SDG_GOALS.filter(sdg => program.sdgGoals?.includes(sdg.number));

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title={`${program.title} | Green Rwanda Initiative`}
        description={program.description}
        image={program.image}
      />

      {/* Hero Header */}
      <section className="relative bg-forest-darker text-white py-12 sm:py-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={normalizeImageUrl(program.image)} alt={program.title} onError={handleImageError} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-darker via-forest-darker/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/programs" className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-white mb-4 sm:mb-6 text-xs font-semibold transition-colors min-h-[36px]">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Programs & Projects
          </Link>

          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            <span className="bg-forest-dark text-white border border-white/20 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
              {program.status}
            </span>
            {program.categories.map((cat, i) => (
              <span key={i} className="bg-white/10 text-white px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-3 sm:mb-4">{program.title}</h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-3xl leading-relaxed">{program.description}</p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/10 text-xs text-gray-300">
            {program.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{program.location}</span>
              </div>
            )}
            {program.startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{program.startDate} {program.endDate ? `— ${program.endDate}` : ''}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white border-b border-sand-200 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-8 space-y-8">
              <div className="bg-warmBg p-8 rounded-xl border border-sand-200 space-y-4">
                <h2 className="text-xl font-serif font-bold text-charcoal">Program Summary</h2>
                <p className="text-slateText leading-relaxed text-sm">{program.description}</p>

                <div className="pt-4 border-t border-sand-300">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">Focus Objective</h3>
                  <p className="text-xs text-forest-dark bg-forest-subtle p-3.5 rounded-lg border border-forest-muted/20 font-medium">
                    {program.focus}
                  </p>
                </div>
              </div>

              {/* UN SDGs Alignment */}
              {alignedSdgs.length > 0 && (
                <div className="bg-warmBg p-8 rounded-xl border border-sand-200 space-y-4">
                  <h2 className="text-xl font-serif font-bold text-charcoal flex items-center gap-2">
                    <Globe className="w-5 h-5 text-forest" /> Global Framework Alignment (UN SDGs)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {alignedSdgs.map((sdg) => (
                      <div key={sdg.number} className="bg-white p-4 rounded-lg border border-sand-200 flex items-start gap-3">
                        <span className="w-7 h-7 rounded bg-forest-dark text-white shrink-0 flex items-center justify-center text-xs font-mono font-bold">
                          SDG {sdg.number}
                        </span>
                        <div>
                          <h3 className="font-bold text-charcoal text-xs">{sdg.title}</h3>
                          <p className="text-[11px] text-gray-600 line-clamp-2 mt-0.5">{sdg.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results or Targets */}
              {program.results && program.results.length > 0 && (
                <div className="bg-warmBg p-8 rounded-xl border border-sand-200 space-y-4">
                  <h2 className="text-xl font-serif font-bold text-charcoal flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-forest" /> Documented Outcomes
                  </h2>
                  <ul className="space-y-2">
                    {program.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slateText bg-white p-3.5 rounded-lg border border-sand-200 text-xs">
                        <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {program.targets && program.targets.length > 0 && (
                <div className="bg-warmBg p-8 rounded-xl border border-sand-200 space-y-4">
                  <h2 className="text-xl font-serif font-bold text-charcoal flex items-center gap-2">
                    <Target className="w-5 h-5 text-earth" /> Strategic Operational Goals
                  </h2>
                  <ul className="space-y-2">
                    {program.targets.map((target, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slateText bg-white p-3.5 rounded-lg border border-sand-200 text-xs">
                        <Target className="w-4 h-4 text-earth shrink-0 mt-0.5" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-forest-dark text-white p-6 rounded-xl border border-white/10 shadow-sm space-y-6">
                <h3 className="text-base font-serif font-bold border-b border-white/15 pb-3">Key Figures & Metrics</h3>
                <ul className="space-y-3">
                  {program.keyFigures.map((fig, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-gray-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{fig}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/15 space-y-3">
                  <Link
                    to="/contact"
                    className="w-full bg-forest-light hover:bg-forest text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-center text-xs"
                  >
                    <Handshake className="w-3.5 h-3.5" /> Institutional Collaboration
                  </Link>

                  <button
                    onClick={() => alert(`Project Factsheet for ${program.title} requested. Official document will be provided by GRI Secretariat.`)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-center text-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Request Factsheet (PDF)
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Related Gallery */}
          {relatedGallery.length > 0 && (
            <div className="mt-16 pt-12 border-t border-sand-200">
              <h2 className="text-xl font-serif font-bold text-charcoal mb-6">Program Documentation Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedGallery.slice(0, 4).map((img) => (
                  <div key={img.id} className="bg-warmBg rounded-xl overflow-hidden border border-sand-200">
                    <div className="h-44 overflow-hidden">
                      <img src={normalizeImageUrl(img.imageUrl)} alt={img.altText} onError={handleImageError} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold text-charcoal line-clamp-1">{img.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
