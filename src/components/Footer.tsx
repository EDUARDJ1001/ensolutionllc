import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Hammer,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = uiTranslations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-white shrink-0">
                <img
                  src="/logo.ico"
                  alt={t.companyName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-white font-extrabold text-lg block leading-none">
                  {t.companyName}
                </span>
                <span className="text-slate-400 text-xs mt-0.5 block">
                  {t.tagline}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t.footer.aboutCompany}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('estimator')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.estimator}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-us')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Specialties List */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              {t.footer.servicesList}
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>• {language === 'es' ? 'Entradas de Autos & Concreto Estampado' : 'Driveways & Stamped Concrete Patios'}</li>
              <li>• {language === 'es' ? 'Losas de Cimentación & Muros de Contención' : 'Foundation Slabs & Retaining Walls'}</li>
              <li>• {language === 'es' ? 'Remodelación de Cocinas y Baños' : 'Kitchen & Bathroom Interior Remodeling'}</li>
              <li>• {language === 'es' ? 'Carpintería de Zócalos, Molduras & Decks' : 'Trim Carpentry, Baseboards & Decks'}</li>
              <li>• {language === 'es' ? 'Pintura Profesional Interior & Exterior' : 'Professional Interior & Exterior Painting'}</li>
            </ul>

            {/* Language Switch */}
            <div className="pt-3">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1.5 rounded text-xs font-semibold hover:border-amber-500 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.footer.languageSwitch}: {language.toUpperCase()}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & scroll top */}
        <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© {new Date().getFullYear()} {t.companyName}. {t.footer.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <span>{language === 'es' ? 'Volver Arriba' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
