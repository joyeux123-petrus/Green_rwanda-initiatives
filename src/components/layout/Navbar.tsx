import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { normalizeImageUrl, handleImageError } from '../../lib/imageUtils';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close dropdown or mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-forest-darker/95 backdrop-blur-md shadow-lg border-b border-white/10 py-2 sm:py-2.5' : 'bg-forest-darker py-2.5 sm:py-3.5 text-white border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between min-h-[44px]">
        {/* Logo & Brand Identity */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-forest-light rounded-lg p-0.5 transition-opacity hover:opacity-95 max-w-[70%] sm:max-w-none">
          <img
            src={normalizeImageUrl('/images/logo.jpeg')}
            alt="Green Rwanda Initiative Logo"
            onError={handleImageError}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover border border-white/20 shadow-sm shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-lg font-serif font-bold text-white tracking-tight leading-none truncate">
              Green Rwanda Initiative
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6" ref={dropdownRef}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xs font-semibold tracking-wide uppercase transition-colors py-1 ${
                isActive ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`
            }
          >
            {t('nav.home')}
          </NavLink>

          {/* About Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('about')}
              className={`text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1 py-1 ${
                activeDropdown === 'about' || location.pathname === '/about' ? 'text-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`}
              aria-expanded={activeDropdown === 'about'}
            >
              {t('nav.about')}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-emerald-400' : ''}`} />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-forest-dark border border-white/15 rounded-lg shadow-xl p-2 space-y-1 animate-fade-in z-50">
                <Link
                  to="/about"
                  className="block px-3 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-emerald-300 rounded transition-colors"
                >
                  Mission & Secretariat
                </Link>
                <Link
                  to="/about#leadership"
                  className="block px-3 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-emerald-300 rounded transition-colors"
                >
                  Governance & Leadership
                </Link>
                <Link
                  to="/about#governance"
                  className="block px-3 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-emerald-300 rounded transition-colors"
                >
                  Progress Timeline (2022–2026)
                </Link>
              </div>
            )}
          </div>

          {/* Work Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('work')}
              className={`text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1 py-1 ${
                activeDropdown === 'work' || location.pathname.startsWith('/programs') || location.pathname === '/campaigns' ? 'text-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`}
              aria-expanded={activeDropdown === 'work'}
            >
              Our Work
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'work' ? 'rotate-180 text-emerald-400' : ''}`} />
            </button>

            {activeDropdown === 'work' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-forest-dark border border-white/15 rounded-lg shadow-xl p-2 space-y-1 animate-fade-in z-50">
                <Link
                  to="/programs"
                  className="block px-3 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-emerald-300 rounded transition-colors"
                >
                  Programs & Reforestation
                </Link>
                <Link
                  to="/campaigns"
                  className="block px-3 py-2 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-emerald-300 rounded transition-colors"
                >
                  Climate Advocacy Campaigns
                </Link>
                <Link
                  to="/programs/rise-tree-expansion"
                  className="block px-3 py-2 text-xs font-semibold text-emerald-400 hover:bg-white/10 rounded transition-colors"
                >
                  RISE TREE 2026 Reforestation
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/impact"
            className={({ isActive }) =>
              `text-xs font-semibold tracking-wide uppercase transition-colors py-1 ${
                isActive ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`
            }
          >
            {t('nav.impact')}
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              `text-xs font-semibold tracking-wide uppercase transition-colors py-1 ${
                isActive ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`
            }
          >
            {t('nav.news')}
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `text-xs font-semibold tracking-wide uppercase transition-colors py-1 ${
                isActive ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`
            }
          >
            {t('nav.gallery')}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-xs font-semibold tracking-wide uppercase transition-colors py-1 ${
                isActive ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-200 hover:text-emerald-300'
              }`
            }
          >
            {t('nav.contact')}
          </NavLink>
        </nav>

        {/* Header Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/get-involved"
            className="bg-forest-light hover:bg-forest-emerald text-white text-xs font-semibold px-4 py-2.5 rounded-md border border-emerald-500/30 transition-colors shadow-sm min-h-[40px] inline-flex items-center"
          >
            {t('nav.supportWork')}
          </Link>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2.5 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer & Overlay */}
      {isOpen && (
        <div className="lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 top-[52px] sm:top-[60px] bg-black/70 backdrop-blur-sm z-30 animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <nav
            role="navigation"
            aria-label="Mobile Navigation"
            className="fixed left-0 right-0 top-[52px] sm:top-[60px] z-40 bg-forest-darker border-b border-white/15 max-h-[calc(100dvh-60px)] overflow-y-auto py-5 px-4 sm:px-6 shadow-2xl animate-fade-in pb-safe"
          >
            <div className="flex flex-col gap-1 text-xs font-semibold tracking-wide uppercase max-w-lg mx-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                {t('nav.home')}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                {t('nav.about')}
              </NavLink>

              <NavLink
                to="/programs"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                Programs & Reforestation
              </NavLink>

              <NavLink
                to="/campaigns"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                Climate Advocacy
              </NavLink>

              <NavLink
                to="/impact"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                {t('nav.impact')}
              </NavLink>

              <NavLink
                to="/news"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                {t('nav.news')}
              </NavLink>

              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                {t('nav.gallery')}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg flex items-center min-h-[44px] transition-colors ${
                    isActive ? 'bg-white/15 text-emerald-400 font-bold' : 'text-gray-200 hover:bg-white/10'
                  }`
                }
              >
                {t('nav.contact')}
              </NavLink>

              <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-2">
                <Link
                  to="/get-involved"
                  className="w-full text-center bg-forest-light hover:bg-forest-emerald text-white font-bold py-3.5 px-4 rounded-lg min-h-[44px] flex items-center justify-center text-xs tracking-wider"
                >
                  {t('nav.supportWork')}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
