import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';
import { Sprout, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-warmBg px-4 text-charcoal">
      <SEO title="Page Not Found | Green Rwanda Initiative" description="The page you are looking for does not exist." />
      <div className="max-w-md w-full bg-white rounded-lg border border-sand-200 p-8 text-center shadow-sm space-y-5">
        <div className="w-12 h-12 bg-forest-subtle text-forest rounded-lg flex items-center justify-center mx-auto">
          <Sprout className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-charcoal">404 — Page Not Found</h1>
        <p className="text-slateText text-xs leading-relaxed">
          The requested page could not be located. It may have been relocated or updated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          Return to Homepage <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
