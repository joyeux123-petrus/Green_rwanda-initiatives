import React from 'react';
import { SEO } from '../components/ui/SEO';
import { ORGANIZATION } from '../data/griData';
import { Mail, MapPin } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Terms of Service | Green Rwanda Initiative"
        description="Terms of service and intellectual property guidelines for using the digital platforms of Green Rwanda Initiative."
      />

      {/* Header */}
      <section className="bg-forest-darker text-white py-16 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Legal Terms</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-xs text-gray-300 font-mono">Last updated: October 2026 • Green Rwanda Initiative (GRI)</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 flex-grow border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-sand-200 p-8 sm:p-12 shadow-sm space-y-8 text-slateText leading-relaxed text-xs sm:text-sm">

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Green Rwanda Initiative (GRI) website, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please refrain from using our digital platforms.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">2. Organizational Purpose</h2>
              <p>
                GRI is a Rwandan youth-led environmental and climate non-profit organization working on ecosystem restoration, sustainable agriculture, youth leadership, and community empowerment. All website content is provided for informational, educational, and partnership purposes.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">3. Intellectual Property & Fair Use</h2>
              <p className="mb-2">
                All photographs, program reports, text, logos, and digital assets published on this site are the intellectual property of Green Rwanda Initiative unless otherwise credited.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slateText">
                <li><strong>Non-Commercial Use:</strong> Educational institutions, media organizations, and researchers are encouraged to reference GRI materials provided proper attribution is given to "Green Rwanda Initiative".</li>
                <li><strong>Commercial Restrictions:</strong> Logo reproduction or content distribution for commercial gain is strictly prohibited without prior written consent.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">4. Accuracy of Impact Data</h2>
              <p>
                GRI makes every effort to ensure all impact statistics (e.g. tree counts, nursery pipelines, beneficiary numbers) reflect verified, real-world operational records. Historical achievements, ongoing activities, and strategic targets are clearly distinguished.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">5. User Conduct</h2>
              <p>
                Users agree not to engage in malicious activities, including submitting false contact messages, attempting unauthorized access to admin systems, or uploading harmful code.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">6. Contact Information</h2>
              <p className="mb-3">For legal inquiries or permission regarding GRI assets, contact:</p>
              <div className="bg-warmBg p-4 rounded border border-sand-200 text-xs space-y-2">
                <p className="font-bold text-charcoal">{ORGANIZATION.name} Secretariat</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-forest" /> <a href={`mailto:${ORGANIZATION.email}`} className="hover:text-forest font-medium">{ORGANIZATION.email}</a></p>
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-forest" /> {ORGANIZATION.address}</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
