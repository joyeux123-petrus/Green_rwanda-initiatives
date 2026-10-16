import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { INITIAL_RESOURCES } from '../data/griData';
import { ResourceDocument } from '../types';
import { FileText, Download, Filter, Search, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Resources: React.FC = () => {
  const [resources] = useState<ResourceDocument[]>(INITIAL_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Annual Report', 'Policy Brief', 'Field Manual', 'Factsheet'];

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Publications & Resources | Green Rwanda Initiative"
        description="Access official annual reports, policy briefs, agroforestry field manuals, and climate action factsheets published by Green Rwanda Initiative."
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Knowledge & Transparency</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">Publications & Resources</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Download our annual impact reports, watershed policy briefs, community agroforestry field manuals, and clean energy research factsheets.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-6 bg-white border-b border-sand-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-forest mr-2 shrink-0" />
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search publications..."
              className="w-full bg-warmBg border border-sand-300 rounded px-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-forest focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-16 bg-warmBg flex-grow border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="bg-white p-12 rounded-lg text-center border border-sand-200 text-slateText text-xs">
              No publications match your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredResources.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg border border-sand-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold text-forest-dark bg-forest-subtle px-2.5 py-1 rounded uppercase tracking-wider">
                        {doc.category}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">{doc.fileSize}</span>
                    </div>

                    <h2 className="text-lg font-serif font-bold text-charcoal mb-2">{doc.title}</h2>
                    <p className="text-xs text-slateText leading-relaxed mb-6">{doc.description}</p>
                  </div>

                  <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 font-mono">Published: {doc.publishedAt}</span>
                    <a
                      href={doc.downloadUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Thank you for requesting "${doc.title}". Official PDF document download will be provided directly by GRI Secretariat.`);
                      }}
                      className="inline-flex items-center gap-1.5 bg-forest-dark hover:bg-forest text-white font-semibold px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Institutional Research Callout */}
          <div className="mt-16 bg-white rounded-lg border border-sand-200 p-8 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-10 h-10 bg-forest-subtle text-forest rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-charcoal mb-2">Academic & Research Collaboration</h3>
            <p className="text-slateText mb-6 text-xs leading-relaxed">
              Are you a university researcher, UN agency, or NGO partner seeking raw field data or joint research collaboration on ecosystem restoration in Rwanda?
            </p>
            <Link to="/contact" className="bg-forest-dark hover:bg-forest text-white font-semibold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2">
              Contact Secretariat <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
