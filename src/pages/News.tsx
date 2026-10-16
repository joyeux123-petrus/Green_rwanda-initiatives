import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { getNewsArticles } from '../services/firebaseService';
import { NewsArticle } from '../types';
import { ArrowRight, Calendar, User, Clock, Search, Filter, RotateCcw, Newspaper } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';

export const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function load() {
      const data = await getNewsArticles(false);
      setArticles(data);
    }
    load();
  }, []);

  const categories = [
    'All',
    'Advocacy',
    'Youth & Innovation',
    'Projects & Field Stories',
    'Climate Action',
    'Sustainable Agriculture'
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Youth & Innovation' && article.category.includes('Youth')) ||
      (selectedCategory === 'Projects & Field Stories' && article.category.includes('Project'));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      article.title.toLowerCase().includes(q) ||
      (article.subtitle && article.subtitle.toLowerCase().includes(q)) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const regularArticles = featuredArticle
    ? filteredArticles.filter(a => a.id !== featuredArticle.id)
    : filteredArticles;

  const handleResetSearch = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="News & Stories | Green Rwanda Initiatives"
        description="Official publication archive of Green Rwanda Initiatives featuring field updates, research insights, youth leadership stories, and climate advocacy reports."
        canonicalUrl="https://greenrwandainitiatives.org/news"
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Secretariat Publications</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">News & Stories</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Verified field reports, regional advocacy outcomes, community reforestation updates, and research insights from Green Rwanda Initiatives.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 bg-white border-b border-sand-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-forest mr-1 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full bg-warmBg border border-sand-300 rounded px-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Articles Listing */}
      <section className="py-16 bg-warmBg flex-grow border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Empty Search State */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-lg border border-sand-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
              <div className="w-12 h-12 bg-forest-subtle text-forest rounded-lg flex items-center justify-center mx-auto">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-charcoal">No Articles Match Your Search</h3>
              <p className="text-xs text-slateText leading-relaxed">
                We couldn't find any published articles matching "{searchQuery}". Try refining your search or clearing active category filters.
              </p>
              <button
                onClick={handleResetSearch}
                className="inline-flex items-center gap-2 bg-forest-dark hover:bg-forest text-white font-semibold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Lead Article Hero */}
              {featuredArticle && !searchQuery && (
                <div className="bg-white rounded-lg border border-sand-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-72 lg:h-auto bg-sand-100 border-r border-sand-200">
                    <img
                      src={normalizeImageUrl(featuredArticle.coverImage)}
                      alt={featuredArticle.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-forest-dark text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                      Featured Publication
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-500 mb-3">
                        <span className="bg-forest-subtle text-forest-dark px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                          {featuredArticle.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-forest" /> {featuredArticle.publishedAt}
                        </span>
                        {featuredArticle.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-forest" /> {featuredArticle.readingTime}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-serif font-bold text-charcoal mb-3 leading-snug hover:text-forest transition-colors">
                        <Link to={`/news/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                      </h2>

                      {featuredArticle.subtitle && (
                        <p className="text-xs font-medium text-forest-dark mb-3 line-clamp-2 leading-relaxed italic">
                          {featuredArticle.subtitle}
                        </p>
                      )}

                      <p className="text-xs text-slateText leading-relaxed line-clamp-3 mb-6">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {featuredArticle.authorAvatar ? (
                          <img
                            src={normalizeImageUrl(featuredArticle.authorAvatar)}
                            alt={featuredArticle.author}
                            onError={handleImageError}
                            className="w-8 h-8 rounded-full object-cover border border-sand-300"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-forest-subtle text-forest font-bold text-xs flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <span className="text-xs font-bold text-charcoal block leading-tight">{featuredArticle.author}</span>
                          <span className="text-[10px] text-gray-500 font-mono block">{featuredArticle.authorRole || 'GRI Secretariat'}</span>
                        </div>
                      </div>

                      <Link
                        to={`/news/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-1.5 bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary Articles Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                  <h2 className="text-xl font-serif font-bold text-charcoal">
                    {searchQuery ? `Search Results (${filteredArticles.length})` : 'All Field Updates & Publications'}
                  </h2>
                  <span className="text-xs text-gray-500 font-mono">Showing {filteredArticles.length} publications</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {regularArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg border border-sand-200 overflow-hidden shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="relative h-48 overflow-hidden bg-sand-100">
                          <img src={normalizeImageUrl(article.coverImage)} alt={article.title} onError={handleImageError} className="w-full h-full object-cover" />
                          <span className="absolute top-3 left-3 bg-forest-dark text-white font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                            {article.category}
                          </span>
                        </div>

                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                            <span>{article.publishedAt}</span>
                            {article.readingTime && <span>{article.readingTime}</span>}
                          </div>

                          <h3 className="text-base font-serif font-bold text-charcoal hover:text-forest transition-colors leading-snug">
                            <Link to={`/news/${article.slug}`}>{article.title}</Link>
                          </h3>

                          {article.subtitle && (
                            <p className="text-[11px] font-medium text-forest-dark line-clamp-1 italic">
                              {article.subtitle}
                            </p>
                          )}

                          <p className="text-xs text-slateText line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-0 border-t border-sand-100 mt-4 pt-4 flex items-center justify-between">
                        <span className="text-[11px] text-gray-600 font-medium">By {article.author}</span>
                        <Link
                          to={`/news/${article.slug}`}
                          className="inline-flex items-center gap-1 text-forest hover:text-forest-light font-semibold text-xs uppercase tracking-wider"
                        >
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </section>

    </div>
  );
};
