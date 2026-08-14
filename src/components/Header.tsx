import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Menu,
  X,
  Hammer,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  onOpenQuote: (serviceCategory?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const { language, toggleLanguage } = useLanguage();
  const t = uiTranslations[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Contact Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href={`tel:${t.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-700">|</span>
            <a
              href={`mailto:${t.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.email}</span>
            </a>
            <span className="hidden lg:inline text-slate-700">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded text-xs font-semibold border border-slate-700 transition-colors"
              title={t.footer.languageSwitch}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className={language === 'es' ? 'text-amber-400 font-bold' : 'text-slate-400'}>ES</span>
              <span className="text-slate-500">/</span>
              <span className={language === 'en' ? 'text-amber-400 font-bold' : 'text-slate-400'}>EN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
          isScrolled ? 'border-slate-300 shadow-md py-3' : 'border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200 shadow-sm shrink-0 group-hover:border-amber-500 transition-all">
              <img
                src="/logo.ico"
                alt={t.companyName}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                {t.companyName}
              </span>
              <span className="block text-slate-500 text-xs font-medium tracking-normal mt-0.5">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-amber-600 transition-colors py-1"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-amber-600 transition-colors py-1"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="hover:text-amber-600 transition-colors py-1"
            >
              {t.nav.estimator}
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="hover:text-amber-600 transition-colors py-1"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-amber-600 transition-colors py-1"
            >
              {t.nav.contact}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`tel:${t.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-xs px-3.5 py-2 rounded-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.nav.callNow}</span>
            </a>
            <button
              onClick={() => onOpenQuote()}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-md shadow-sm transition-all hover:shadow"
            >
              <span>{t.nav.getQuote}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-lg animate-in slide-in-from-top duration-200">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-2 text-slate-800 font-semibold hover:text-amber-600 border-b border-slate-100"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left py-2 text-slate-800 font-semibold hover:text-amber-600 border-b border-slate-100"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="block w-full text-left py-2 text-slate-800 font-semibold hover:text-amber-600 border-b border-slate-100"
            >
              {t.nav.estimator}
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="block w-full text-left py-2 text-slate-800 font-semibold hover:text-amber-600 border-b border-slate-100"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-slate-800 font-semibold hover:text-amber-600 border-b border-slate-100"
            >
              {t.nav.contact}
            </button>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-md text-center text-sm shadow-sm"
              >
                {t.nav.getQuote}
              </button>
              <a
                href={`tel:${t.phone.replace(/[^0-9]/g, '')}`}
                className="w-full border border-slate-300 text-slate-800 font-semibold py-2.5 rounded-md text-center text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>{t.nav.callNow}: {t.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
