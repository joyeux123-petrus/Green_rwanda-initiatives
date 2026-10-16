import React from 'react';
import { SEO } from '../components/ui/SEO';
import { ORGANIZATION } from '../data/griData';
import { Shield, Mail, MapPin } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Privacy Policy | Green Rwanda Initiative"
        description="Privacy policy and data protection commitments of Green Rwanda Initiative, complying with Rwandan law and international data protection principles."
      />

      {/* Header */}
      <section className="bg-forest-darker text-white py-16 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">Data Governance</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-xs text-gray-300 font-mono">Last updated: October 2026 • Green Rwanda Initiative (GRI)</p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 flex-grow border-b border-sand-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-sand-200 p-8 sm:p-12 shadow-sm space-y-8 text-slateText leading-relaxed text-xs sm:text-sm">

            <div className="flex items-center gap-3 p-4 bg-forest-subtle rounded border border-forest-muted/20 text-forest-dark text-xs font-medium">
              <Shield className="w-5 h-5 text-forest shrink-0" />
              <p>
                <strong>Our Commitment:</strong> Green Rwanda Initiative respects your privacy and is dedicated to protecting personal data collected through our digital platforms in compliance with Rwandan Law N° 058/2021 on Personal Data Protection and international privacy standards.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">1. Information We Collect</h2>
              <p className="mb-2">We collect information only when voluntarily provided by visitors or partners:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slateText">
                <li><strong>Contact & Inquiry Data:</strong> Name, email address, phone number, organization, and message contents submitted via our contact or partner forms.</li>
                <li><strong>Newsletter Subscriptions:</strong> Email address provided for organizational updates and field stories.</li>
                <li><strong>Volunteering & Partnership Applications:</strong> Contact details and professional background submitted for volunteer or institutional collaboration.</li>
                <li><strong>Technical Diagnostics:</strong> Anonymized browser type, device information, and general locale data for performance optimization.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">2. How We Use Your Information</h2>
              <p className="mb-2">Information collected is used strictly to fulfill GRI's organizational mission:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slateText">
                <li>Responding to partnership, volunteer, or general inquiries.</li>
                <li>Sending periodic newsletters and operational field updates (with clear opt-out links).</li>
                <li>Maintaining administrative, financial, and institutional transparency.</li>
                <li>Enhancing platform accessibility, performance, and cybersecurity.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">3. Data Sharing & Third Parties</h2>
              <p>
                GRI <strong>never sells, rents, or trades</strong> personal data to commercial third parties. Data is shared only with secure infrastructure providers (e.g., Firebase Firestore / Google Cloud) solely for hosting and data management, operating under strict confidentiality obligations.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">4. Security Safeguards</h2>
              <p>
                We employ technical, administrative, and physical safeguards—including SSL/TLS encryption and access-controlled databases—to safeguard information against unauthorized access, loss, or alteration.
              </p>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">5. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slateText">
                <li>Request access to personal data held by GRI.</li>
                <li>Request correction or deletion of your information.</li>
                <li>Unsubscribe from newsletter communications at any time.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-serif font-bold text-charcoal mb-2">6. Contact Data Officer</h2>
              <p className="mb-3">For privacy inquiries or data requests, please contact:</p>
              <div className="bg-warmBg p-4 rounded border border-sand-200 text-xs space-y-2">
                <p className="font-bold text-charcoal">{ORGANIZATION.name} — Secretariat Data Protection</p>
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
