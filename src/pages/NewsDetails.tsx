import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { Lightbox } from '../components/ui/Lightbox';
import { getNewsBySlug, getNewsArticles } from '../services/firebaseService';
import { NewsArticle } from '../types';
import { normalizeImageUrl, handleImageError } from '../lib/imageUtils';
import {
  ArrowLeft, Calendar, User, Clock, Share2, Tag, Twitter,
  Linkedin, Facebook, Link as LinkIcon, Check, ShieldCheck,
  ExternalLink, CheckCircle2, ChevronRight, BookOpen, Camera
} from 'lucide-react';

export const NewsDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const a = slug ? await getNewsBySlug(slug) : undefined;
      setArticle(a || null);
      setLoading(false);

      const all = await getNewsArticles(false);
      if (slug) {
        const other = all.filter(item => item.slug !== slug && item.id !== slug);
        const currentCategory = a?.category || 'Advocacy';
        const sameCategory = other.filter(item => item.category === currentCategory);
        const rest = other.filter(item => item.category !== currentCategory);
        setRelatedArticles([...sameCategory, ...rest].slice(0, 3));
      } else {
        setRelatedArticles(all.slice(0, 3));
      }
    }
    load();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slateText text-xs space-y-2">
        <div className="w-6 h-6 border-2 border-forest border-t-transparent rounded-full animate-spin"></div>
        <span>Retrieving publication...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-2xl font-serif font-bold text-charcoal mb-3">Publication Not Found</h1>
        <p className="text-xs text-slateText mb-6">The requested publication could not be located in GRI's archives.</p>
        <Link to="/news" className="bg-forest-dark hover:bg-forest text-white font-semibold px-5 py-2.5 rounded text-xs uppercase tracking-wider transition-colors shadow-sm">
          Return to News & Insights
        </Link>
      </div>
    );
  }

  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://greenrwandainitiatives.org/news/${article.slug}`;

  // Structured Data Schema for NewsArticle & BreadcrumbList
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        "headline": article.seoTitle || article.title,
        "description": article.seoDescription || article.excerpt,
        "image": [article.coverImage],
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt || article.publishedAt,
        "mainEntityOfPage": articleUrl,
        "author": {
          "@type": "Person",
          "name": article.author,
          "jobTitle": article.authorRole || "GRI Secretariat"
        },
        "publisher": {
          "@type": "NGO",
          "name": "Green Rwanda Initiatives",
          "url": "https://greenrwandainitiatives.org/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://greenrwandainitiatives.org/images/logo.jpeg"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://greenrwandainitiatives.org/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "News & Stories",
            "item": "https://greenrwandainitiatives.org/news"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": articleUrl
          }
        ]
      }
    ]
  };

  // Helper to render formatted article paragraphs, H2s, lists, and blockquotes
  const renderArticleContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-charcoal pt-4 pb-1 border-b border-sand-200 mt-6 mb-2">
            {trimmed.replace(/^##\s+/, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-serif font-bold text-charcoal pt-3 mt-4 mb-1">
            {trimmed.replace(/^###\s+/, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-6 p-4 bg-forest-subtle border-l-4 border-forest rounded-r text-forest-dark italic text-xs sm:text-sm leading-relaxed">
            "{trimmed.replace(/^>\s+/, '')}"
          </blockquote>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map(item => item.replace(/^[-*]\s+/, ''));
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc pl-5 text-slateText text-xs sm:text-sm leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-slateText text-xs sm:text-sm leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title={article.seoTitle || `${article.title} | Green Rwanda Initiative`}
        description={article.seoDescription || article.excerpt}
        image={article.coverImage}
        type="article"
        jsonLd={articleJsonLd}
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-16 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[11px] text-gray-300 font-mono mb-6 flex-wrap">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-500" />
            <Link to="/news" className="hover:text-emerald-400 transition-colors">News & Insights</Link>
            <ChevronRight className="w-3 h-3 text-gray-500" />
            <span className="text-emerald-400 truncate max-w-xs">{article.category}</span>
          </nav>

          <span className="bg-forest-light text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded inline-block mb-4">
            {article.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight mb-4 leading-snug text-white">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed mb-6 italic text-balance">
              {article.subtitle}
            </p>
          )}

          {/* Author & Meta Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-3">
              {article.authorAvatar ? (
                <img
                  src={normalizeImageUrl(article.authorAvatar)}
                  alt={article.author}
                  onError={handleImageError}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/10 text-emerald-400 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="font-semibold text-white block leading-tight">{article.author}</span>
                <span className="text-[10px] font-mono text-emerald-400 block">{article.authorRole || 'Green Rwanda Initiative'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-gray-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {article.publishedAt}
              </span>
              {article.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> {article.readingTime}
                </span>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-16 bg-white border-b border-sand-200 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">

            {/* Featured Image Block */}
            <div className="rounded-lg overflow-hidden border border-sand-200 bg-sand-100">
              <div className="h-56 sm:h-80 md:h-[400px] overflow-hidden">
                <img src={normalizeImageUrl(article.coverImage)} alt={article.title} onError={handleImageError} className="w-full h-full object-cover" />
              </div>
              {(article.coverImageCaption || article.coverImageCredit) && (
                <div className="p-3 bg-sand-50 border-t border-sand-200 text-[11px] text-gray-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 font-mono">
                  <span>{article.coverImageCaption}</span>
                  {article.coverImageCredit && <span className="text-gray-400">{article.coverImageCredit}</span>}
                </div>
              )}
            </div>

            {/* Key Highlights Callout Box */}
            {article.keyHighlights && article.keyHighlights.length > 0 && (
              <div className="bg-forest-subtle border border-forest-muted/20 p-5 rounded-lg space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-forest-dark flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-forest" /> Key Executive Takeaways
                </h3>
                <ul className="space-y-2 text-xs text-slateText">
                  {article.keyHighlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Sharing Bar Top */}
            <div className="flex items-center justify-between py-3 border-y border-sand-200 text-xs text-slateText flex-wrap gap-2">
              <span className="font-mono font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5 text-[11px]">
                <Share2 className="w-3.5 h-3.5 text-forest" /> Share Publication
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${articleUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-warmBg hover:bg-forest-subtle text-gray-700 hover:text-forest flex items-center justify-center transition-colors border border-sand-200 min-h-[36px] min-w-[36px]"
                  aria-label="Share on WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-warmBg hover:bg-forest-subtle text-gray-700 hover:text-forest flex items-center justify-center transition-colors border border-sand-200 min-h-[36px] min-w-[36px]"
                  aria-label="Share on X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-warmBg hover:bg-forest-subtle text-gray-700 hover:text-forest flex items-center justify-center transition-colors border border-sand-200 min-h-[36px] min-w-[36px]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded bg-warmBg hover:bg-forest-subtle text-gray-700 hover:text-forest flex items-center justify-center transition-colors border border-sand-200 min-h-[36px] min-w-[36px]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded bg-warmBg hover:bg-forest-subtle text-gray-700 hover:text-forest flex items-center justify-center transition-colors border border-sand-200 min-h-[36px] min-w-[36px]"
                  aria-label="Copy Link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-forest" /> : <LinkIcon className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Main Content Paragraphs */}
            <div className="space-y-4 pt-2">
              {renderArticleContent(article.content)}
            </div>

            {/* Photo Reportage Gallery Section */}
            {article.articleGallery && article.articleGallery.length > 0 && (
              <div className="mt-10 pt-8 border-t border-sand-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-dark block">Official Photo Reportage</span>
                    <h3 className="text-lg font-serif font-bold text-charcoal flex items-center gap-2">
                      <Camera className="w-4 h-4 text-forest" /> Event Documentation & Assembly Gallery
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{article.articleGallery.length} Photographs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {article.articleGallery.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className="group cursor-pointer bg-warmBg rounded-lg border border-sand-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="h-44 overflow-hidden relative bg-sand-100">
                        <img src={normalizeImageUrl(item.url)} alt={item.caption} onError={handleImageError} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-forest-dark text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                            View Image
                          </span>
                        </div>
                      </div>
                      <div className="p-3 text-xs space-y-1">
                        <p className="text-charcoal font-medium line-clamp-2 leading-snug">{item.caption}</p>
                        {item.credit && <p className="text-[10px] text-gray-400 font-mono">{item.credit}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sources & References Block */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-10 pt-6 border-t border-sand-200 space-y-3 bg-warmBg p-5 rounded-lg border border-sand-200">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-forest" /> Sources & Policy References
                </h3>
                <ul className="space-y-2 text-xs text-slateText">
                  {article.sources.map((src, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 border-b border-sand-200/60 pb-1.5 last:border-0">
                      <div>
                        <span className="font-semibold text-charcoal block">{src.title}</span>
                        <span className="text-[10px] text-gray-500 font-mono block">{src.sourceName}</span>
                      </div>
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-forest hover:text-forest-light inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase shrink-0"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-sand-200 flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-gray-400 mr-1" />
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-forest-subtle text-forest-dark text-[11px] font-mono font-medium px-2.5 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Biography Footer Card */}
            <div className="bg-warmBg p-6 rounded-lg border border-sand-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
              {article.authorAvatar ? (
                <img src={normalizeImageUrl(article.authorAvatar)} alt={article.author} onError={handleImageError} className="w-14 h-14 rounded-full object-cover border border-sand-300 shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-forest-dark text-white flex items-center justify-center font-bold text-lg shrink-0">
                  <User className="w-7 h-7" />
                </div>
              )}
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase font-bold text-forest-dark">Article Author</div>
                <h4 className="text-base font-serif font-bold text-charcoal">{article.author}</h4>
                {article.authorRole && <p className="text-xs font-mono text-gray-500">{article.authorRole}</p>}
                <p className="text-xs text-slateText leading-relaxed pt-1">
                  {article.authorBio || 'Authoring official research and field updates on ecosystem restoration, youth leadership, and climate policy for Green Rwanda Initiative.'}
                </p>
              </div>
            </div>

          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-sand-200 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-charcoal">Related Publications & Stories</h2>
                <Link to="/news" className="text-xs font-semibold text-forest hover:text-forest-light uppercase tracking-wider inline-flex items-center gap-1">
                  View All <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <div key={rel.id} className="bg-warmBg rounded-lg border border-sand-200 overflow-hidden flex flex-col justify-between p-4">
                    <div>
                      <div className="h-36 overflow-hidden rounded bg-sand-100 mb-3">
                        <img src={normalizeImageUrl(rel.coverImage)} alt={rel.title} onError={handleImageError} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-2">
                        {rel.category}
                      </span>
                      <h3 className="text-xs font-serif font-bold text-charcoal hover:text-forest transition-colors line-clamp-2 leading-snug">
                        <Link to={`/news/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                    </div>
                    <div className="mt-4 pt-2 border-t border-sand-200 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                      <span>{rel.publishedAt}</span>
                      <Link to={`/news/${rel.slug}`} className="text-forest font-bold uppercase hover:underline">Read</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal for Photo Reportage */}
      <Lightbox
        isOpen={activePhotoIndex !== null}
        imageUrl={activePhotoIndex !== null && article.articleGallery ? article.articleGallery[activePhotoIndex]?.url : ''}
        title={activePhotoIndex !== null && article.articleGallery ? article.articleGallery[activePhotoIndex]?.caption : ''}
        description={activePhotoIndex !== null && article.articleGallery ? article.articleGallery[activePhotoIndex]?.credit : ''}
        onClose={() => setActivePhotoIndex(null)}
        onNext={() => {
          if (activePhotoIndex !== null && article.articleGallery) {
            setActivePhotoIndex((activePhotoIndex + 1) % article.articleGallery.length);
          }
        }}
        onPrev={() => {
          if (activePhotoIndex !== null && article.articleGallery) {
            setActivePhotoIndex((activePhotoIndex - 1 + article.articleGallery.length) % article.articleGallery.length);
          }
        }}
      />

    </div>
  );
};
