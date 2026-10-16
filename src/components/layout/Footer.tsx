import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook, Send, Check, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { normalizeImageUrl, handleImageError } from '../../lib/imageUtils';
import { ORGANIZATION } from '../../data/griData';
import { sendNewsletterNotification } from '../../services/emailService';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    const emailToSend = newsletterEmail;
    const existing = JSON.parse(localStorage.getItem('gri_subscribers') || '[]');
    existing.push({ email: emailToSend, date: new Date().toISOString() });
    localStorage.setItem('gri_subscribers', JSON.stringify(existing));

    sendNewsletterNotification(emailToSend);

    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-forest-darker text-gray-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* Col 1 & 2: Brand, Mission & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={normalizeImageUrl('/images/logo.jpeg')}
                alt="Green Rwanda Initiative Logo"
                onError={handleImageError}
                className="w-10 h-10 rounded-lg object-cover border border-white/20 shadow-sm"
              />
              <div>
                <span className="text-lg font-bold text-white block leading-none font-serif">Green Rwanda Initiative</span>
              </div>
            </Link>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {t('footer.mission')}
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{ORGANIZATION.registrationNote}</span>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-3 max-w-sm">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Subscribe to Field Updates</h3>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-300 bg-forest-dark p-3 rounded-lg border border-emerald-800/80">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Subscribed to GRI official field updates.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 min-h-[44px]"
                  />
                  <button
                    type="submit"
                    className="bg-forest-light hover:bg-forest text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 transition-colors min-h-[44px]"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-3.5 h-3.5" /> Subscribe
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a href={ORGANIZATION.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-forest-light flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={ORGANIZATION.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-forest-light flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={ORGANIZATION.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-forest-light flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={ORGANIZATION.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-forest-light flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Organization */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About GRI</Link></li>
              <li><Link to="/programs" className="hover:text-emerald-400 transition-colors">Programs & Reforestation</Link></li>
              <li><Link to="/impact" className="hover:text-emerald-400 transition-colors">Verified Impact Data</Link></li>
              <li><Link to="/gallery" className="hover:text-emerald-400 transition-colors">Field Photo Archive</Link></li>
              <li><Link to="/news" className="hover:text-emerald-400 transition-colors">News & Field Updates</Link></li>
              <li><Link to="/campaigns" className="hover:text-emerald-400 transition-colors">Climate Campaigns</Link></li>
            </ul>
          </div>

          {/* Col 4: Get Involved */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">{t('footer.getInvolved')}</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/get-involved#volunteer" className="hover:text-emerald-400 transition-colors">Volunteer Opportunities</Link></li>
              <li><Link to="/get-involved#partner" className="hover:text-emerald-400 transition-colors">Institutional Partnerships</Link></li>
              <li><Link to="/get-involved#support" className="hover:text-emerald-400 transition-colors">Support Our Work</Link></li>
              <li><Link to="/partners" className="hover:text-emerald-400 transition-colors">Verified Partners</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Secretariat</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Contact Secretariat</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ORGANIZATION.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${ORGANIZATION.email}`} className="hover:text-emerald-400 transition-colors">{ORGANIZATION.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${ORGANIZATION.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 transition-colors">
                  {ORGANIZATION.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
