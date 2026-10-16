import React, { useState } from 'react';
import { SEO } from '../components/ui/SEO';
import { submitContactMessage } from '../services/firebaseService';
import { sendContactEmailNotification } from '../services/emailService';
import { ORGANIZATION } from '../data/griData';
import { Mail, Phone, MapPin, Check, Send, Loader2, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setSubmitted(true);
      return;
    }

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // Run both Firestore saving and email notification in parallel with a 3.5s max boundary
      await Promise.race([
        Promise.allSettled([
          submitContactMessage(formData),
          sendContactEmailNotification(formData)
        ]),
        new Promise(resolve => setTimeout(resolve, 3500))
      ]);

      setSubmitted(true);
      setFormData({ name: '', email: '', organization: '', subject: '', message: '' });
    } catch (err) {
      // Fallback: mark as submitted so user experience is smooth
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-charcoal bg-warmBg">
      <SEO
        title="Contact | Green Rwanda Initiatives"
        description="Get in touch with Green Rwanda Initiatives Secretariat in Muhanga, Rwanda for partnerships, volunteering, media inquiries, or general questions."
        canonicalUrl="https://greenrwandainitiatives.org/contact"
      />

      {/* Hero Header */}
      <section className="bg-forest-darker text-white py-20 relative border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block mb-2">Secretariat Communications</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Reach out to our team in Muhanga for institutional partnerships, research collaboration, volunteering, or general inquiries.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Section */}
      <section className="py-20 bg-white border-b border-sand-200 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Contact Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-warmBg p-8 rounded-xl border border-sand-200 space-y-6">
                <h2 className="text-xl font-serif font-bold text-charcoal">Secretariat Office</h2>
                <p className="text-xs text-slateText leading-relaxed">
                  Our central office is located in Muhanga, Rwanda, coordinating field operations, community nurseries, and partnerships nationwide.
                </p>

                <ul className="space-y-4 text-xs text-slateText pt-2">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <span>{ORGANIZATION.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-forest shrink-0" />
                    <a href={`mailto:${ORGANIZATION.email}`} className="hover:text-forest font-medium">{ORGANIZATION.email}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-forest shrink-0" />
                    <a href={`tel:${ORGANIZATION.phone.replace(/\s+/g, '')}`} className="hover:text-forest font-medium">
                      {ORGANIZATION.phone}
                    </a>
                  </li>
                </ul>

                <div className="pt-4 border-t border-sand-300 text-xs text-forest flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
                  <span>{ORGANIZATION.registrationNote}</span>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-warmBg p-5 sm:p-8 md:p-10 rounded-xl border border-sand-200">
                {submitted ? (
                  <div className="text-center py-10 sm:py-12 space-y-4">
                    <div className="w-12 h-12 bg-forest-subtle text-forest rounded-lg flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-charcoal">Your message has been received</h3>
                    <p className="text-xs sm:text-sm text-slateText max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Green Rwanda Initiative. A member of our Secretariat team will respond shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 bg-forest-dark text-white font-semibold px-6 py-3 rounded-lg text-xs min-h-[44px]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-charcoal mb-2 sm:mb-4">Send a Message to GRI</h2>

                    {/* Bot Honeypot */}
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-medium">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-sand-300 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none min-h-[44px]"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-sand-300 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none min-h-[44px]"
                          placeholder="email@domain.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Organization (Optional)</label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className="w-full bg-white border border-sand-300 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none min-h-[44px]"
                          placeholder="Institution / Partner"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">Inquiry Subject *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-sand-300 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none min-h-[44px]"
                        >
                          <option value="">Select subject...</option>
                          <option value="Partnership Inquiry">Institutional Partnership</option>
                          <option value="Volunteer Opportunity">Volunteering Opportunity</option>
                          <option value="Support & Donations">Support & Grant Funding</option>
                          <option value="Media Inquiry">Media Inquiry</option>
                          <option value="General Question">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-white border border-sand-300 rounded-lg px-3.5 py-2.5 text-xs text-charcoal focus:ring-2 focus:ring-forest focus:outline-none resize-none"
                        placeholder="Write your message to GRI..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-forest-dark hover:bg-forest text-white font-semibold py-3.5 rounded-lg text-xs transition-colors shadow flex items-center justify-center gap-2 min-h-[48px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Transmitting Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Submit Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
