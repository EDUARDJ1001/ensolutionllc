import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { testimonialsData } from '../data/projects';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const t = uiTranslations[language].testimonials;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{review.comment[language]}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    {review.clientName}
                  </span>
                  <span className="text-slate-500 block">
                    {review.location}
                  </span>
                </div>

                <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded text-2xs">
                  {review.serviceCategory[language]}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
