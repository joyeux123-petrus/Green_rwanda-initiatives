import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = 'https://greenrwandainitiatives.org/images/logo.jpeg',
  canonicalUrl,
  type = 'website',
  noindex = false,
  jsonLd
}) => {
  // Normalize canonical URL (ensure HTTPS, no query params unless needed, clean domain)
  let cleanCanonical = canonicalUrl;
  if (!cleanCanonical && typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const origin = 'https://greenrwandainitiatives.org';
    if (pathname === '/' || pathname === '') {
      cleanCanonical = `${origin}/`;
    } else {
      // Strip trailing slashes for subpages
      const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
      cleanCanonical = `${origin}${normalizedPath}`;
    }
  } else if (!cleanCanonical) {
    cleanCanonical = 'https://greenrwandainitiatives.org/';
  }

  // Normalize image URL to absolute HTTPS URL for Open Graph / Twitter crawlers
  let absoluteImage = image || 'https://greenrwandainitiatives.org/images/logo.jpeg';
  if (absoluteImage.startsWith('/')) {
    absoluteImage = `https://greenrwandainitiatives.org${absoluteImage}`;
  } else if (!absoluteImage.startsWith('http://') && !absoluteImage.startsWith('https://') && !absoluteImage.startsWith('data:')) {
    absoluteImage = `https://greenrwandainitiatives.org/${absoluteImage}`;
  }

  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // 2. Robots Meta Tag (Indexability)
    if (noindex) {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 3. Meta Description
    setMetaTag('meta[name="description"]', 'name', 'description', description);

    // 4. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', absoluteImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', cleanCanonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Green Rwanda Initiatives');

    // 5. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImage);
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@GreenRwandaOrg');

    // 6. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', cleanCanonical);

    // 7. Dynamic JSON-LD injection
    let scriptTag = document.querySelector('#dynamic-jsonld') as HTMLScriptElement;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, absoluteImage, cleanCanonical, type, noindex, jsonLd]);

  return null;
};
