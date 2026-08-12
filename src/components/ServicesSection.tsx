import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { servicesData } from '../data/services';
import { ServiceDetail, ServiceCategory } from '../types';
import {
  CheckCircle2,
  ArrowRight,
  Calculator,
  Eye,
  Hammer,
  Paintbrush,
  Building2,
  Ruler
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceCategory: ServiceCategory) => void;
  onOpenServiceModal: (service: ServiceDetail) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote,
  onOpenServiceModal,
}) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].servicesSection;
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');

  const filteredServices = activeTab === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeTab);

  const categoryIcons = {
    concrete: Building2,
    remodeling: Hammer,
    carpentry: Ruler,
    painting: Paintbrush,
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            {language === 'es' ? 'Todos los Servicios' : 'All Services'}
          </button>

          {(Object.keys(t.categories) as ServiceCategory[]).map((catKey) => {
            const Icon = categoryIcons[catKey];
            const isSelected = activeTab === catKey;
            return (
              <button
                key={catKey}
                onClick={() => setActiveTab(catKey)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.categories[catKey]}</span>
              </button>
            );
          })}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const CategoryIcon = categoryIcons[service.category];
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Title Header */}
                  <div className="relative w-full bg-slate-900 p-5 space-y-3">
                    {/* Popular Tag */}
                    {service.popular && (
                      <span className="inline-block bg-amber-500 text-slate-950 text-xs font-black uppercase px-2.5 py-1 rounded shadow">
                        {t.popularTag}
                      </span>
                    )}

                    {/* Category Title */}
                    <span className="text-white font-extrabold text-lg sm:text-xl block">
                      {service.title[language]}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-amber-600">
                      <CategoryIcon className="w-3.5 h-3.5" />
                      <span>{service.subtitle[language]}</span>
                    </p>

                    <p className="text-slate-700 text-sm leading-relaxed">
                      {service.description[language]}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {service.bulletPoints[language].slice(0, 4).map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-2 bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onOpenServiceModal(service)}
                    className="flex-1 flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold text-xs py-2.5 px-3 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.viewDetails}</span>
                  </button>

                  <button
                    onClick={() => onSelectServiceForQuote(service.category)}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-lg shadow-sm transition-all"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>{t.requestQuoteForService}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
