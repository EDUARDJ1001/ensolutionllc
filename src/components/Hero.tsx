import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Building2,
  Award,
  PhoneCall
} from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreGallery }) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].hero;
  const company = uiTranslations[language];

  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>{t.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>

            {/* Key Assurance Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t.badges.map((badgeText, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-200 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{badgeText}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-lg shadow-md transition-all hover:shadow-lg text-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>{t.primaryCTA}</span>
              </button>

              <button
                onClick={onExploreGallery}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm"
              >
                <span>{t.secondaryCTA}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Side Feature Box / Quick Contact Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-xl p-6 shadow-2xl space-y-6">
              <div className="border-b border-slate-700 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {company.companyName}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {language === 'es' ? 'Atención Inmediata a Clientes' : 'Immediate Client Support'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'es'
                    ? 'Evaluamos su terreno o propiedad y entregamos estimación detallada sin costo.'
                    : 'We assess your project on-site and provide an itemized written estimate at zero cost.'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-700/50">
                  <span className="text-2xl font-black text-amber-400 block leading-none">100%</span>
                  <span className="text-xs text-slate-300 font-medium mt-1 block">{t.stats.satisfaction}</span>
                </div>
              </div>

              {/* Quick Call Direct Box */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-amber-300 block font-medium">
                      {language === 'es' ? 'Atención telefónica directa' : 'Direct Phone Line'}
                    </span>
                    <span className="text-base font-bold text-white block">
                      {company.phone}
                    </span>
                  </div>
                </div>
                <a
                  href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-2 rounded transition-colors"
                >
                  {language === 'es' ? 'Llamar' : 'Call'}
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
