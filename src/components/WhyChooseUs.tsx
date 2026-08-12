import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { language } = useLanguage();
  const t = uiTranslations[language].whyUs;

  const featureIcons = [
    Building2,
    Award,
    FileText,
    ShieldCheck
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.features.map((feat, idx) => {
            const Icon = featureIcons[idx % featureIcons.length];
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {feat.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality Banner Guarantee Box */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              {language === 'es' ? 'Compromiso Total' : 'Total Commitment'}
            </span>
            <h4 className="text-xl sm:text-2xl font-bold">
              {language === 'es' ? 'Trabajos con Garantía Estructural por Escrito' : 'Structural Work Backed by Written Warranty'}
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              {language === 'es'
                ? 'Todas nuestras obras de concreto y remodelación cumplen estrictamente con los códigos de edificación locales y especificaciones técnicas.'
                : 'All our concrete pours and remodeling projects strictly adhere to local building codes and rigorous structural specifications.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-slate-800 border border-slate-700 px-5 py-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <div className="text-left">
              <span className="block text-xs text-slate-400 font-medium">Status</span>
              <span className="block text-sm font-extrabold text-white">E & N Solution LLC</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
