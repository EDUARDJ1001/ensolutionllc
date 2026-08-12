import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { useConcreteComps } from '../context/ConcreteCompContext';
import { ConcreteComp } from '../types';
import {
  UploadCloud,
  Calendar,
  ImageOff,
  AlertTriangle,
  RefreshCw,
  Loader2
} from 'lucide-react';

export function formatRecordDate(value: string, language: 'es' | 'en'): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const ConcreteCompCard: React.FC<{ item: ConcreteComp }> = ({ item }) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].dynamicGallery;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
      <div>
        {/* Image Showcase Container */}
        <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
          {item.imagen_url ? (
            <img
              src={item.imagen_url}
              alt={item.titulo}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-500">
              <ImageOff className="w-8 h-8" />
              <span className="text-xs font-semibold">{t.noImage}</span>
            </div>
          )}

          {/* Bottom Meta Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded border border-slate-800">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>{formatRecordDate(item.fecha_creacion, language)}</span>
            </span>
          </div>
        </div>

        {/* Card Text Information */}
        <div className="p-5 space-y-3">
          <h3 className="font-bold text-slate-900 text-lg leading-snug">{item.titulo}</h3>
          {item.descripcion && (
            <p className="text-slate-600 text-xs leading-relaxed">{item.descripcion}</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface ConcreteCompGalleryProps {
  /**
   * Renders its own sub-heading and top divider. Disabled when this block is the
   * only content of the gallery section, so the section header is not duplicated.
   */
  showHeading?: boolean;
}

/**
 * Supabase-backed block rendered inside the existing #gallery section.
 * Reuses the same card styling as the static project grid.
 */
export const ConcreteCompGallery: React.FC<ConcreteCompGalleryProps> = ({ showHeading = true }) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].dynamicGallery;
  const { items, loading, loadError, configured, refresh } = useConcreteComps();

  return (
    <div className={showHeading ? 'mt-16 pt-12 border-t border-slate-200' : ''}>
      {/* Sub-section Header */}
      {showHeading && (
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <UploadCloud className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.badge}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.title}</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t.subtitle}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-64 w-full bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-full" />
                <div className="h-3 bg-slate-100 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <p className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mt-6">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
          <span>{t.loading}</span>
        </p>
      )}

      {/* Error State */}
      {!loading && loadError && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">{t.errorTitle}</h4>
          <p className="text-red-700 text-xs leading-relaxed break-words">
            {configured ? loadError : t.notConfigured}
          </p>
          {configured && (
            <button
              onClick={() => void refresh()}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.retry}</span>
            </button>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !loadError && items.length === 0 && (
        <div className="max-w-2xl mx-auto bg-slate-50 border border-dashed border-slate-300 rounded-xl p-10 text-center space-y-2">
          <ImageOff className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-bold text-slate-800 text-sm">{t.empty}</p>
          <p className="text-slate-500 text-xs">{t.emptyHint}</p>
        </div>
      )}

      {/* Records Grid */}
      {!loading && !loadError && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <ConcreteCompCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
