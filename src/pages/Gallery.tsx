import React, { useEffect, useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { Lightbox } from '../components/ui/Lightbox';
import { getGalleryItems } from '../services/firebaseService';
import { GalleryItem } from '../types';
import { Filter, Eye } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const Gallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getGalleryItems();
      setGallery(data);
    }
    load();
  }, []);

  const categories = ['All', 'Programs', 'Community', 'Youth', 'Women', 'Agriculture', 'Restoration', 'Campaigns'];

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const activeItem = activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Gallery | Green Rwanda Initiatives"
        description="Explore high-resolution photographs from Green Rwanda Initiatives' community tree planting, youth climate leadership workshops, agroforestry training, and advocacy campaigns across Rwanda."
        canonicalUrl="https://greenrwandainitiatives.org/gallery"
      />

      {/* Hero */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Visual Archive</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">Gallery</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Authentic visual documentation of ecosystem restoration, community tree planting, and youth climate leadership across Rwanda.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-6 bg-white border-b border-sand-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-forest mr-2 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setActiveImageIndex(null); }}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
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

      {/* Gallery Grid */}
      <section className="py-16 bg-warmBg flex-grow border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-sand-200">
              <p className="text-slateText text-xs">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImageIndex(index)}
                  className="group relative h-72 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white border border-sand-200"
                >
                  <img
                    src={normalizeImageUrl(item.imageUrl)}
                    alt={item.altText}
                    onError={handleImageError}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-darker/90 via-forest-darker/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">{item.category}</span>
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white text-sm font-serif font-bold">{item.title}</h3>
                    {item.description && <p className="text-gray-300 text-xs mt-0.5 line-clamp-2">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={activeImageIndex !== null}
        imageUrl={activeItem?.imageUrl || ''}
        title={activeItem?.title || ''}
        description={activeItem?.description}
        onClose={() => setActiveImageIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

    </div>
  );
};
