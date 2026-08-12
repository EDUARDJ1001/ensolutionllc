import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceDetail, ServiceCategory } from '../types';
import {
  X,
  CheckCircle2,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onRequestQuote: (category: ServiceCategory) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestQuote
}) => {
  const { language } = useLanguage();
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            E & N Solution LLC - Specialty
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {service.title[language]}
            </h3>
            <p className="text-amber-700 font-semibold text-xs uppercase tracking-wide">
              {service.subtitle[language]}
            </p>
            <p className="text-slate-700 text-sm leading-relaxed pt-2">
              {service.description[language]}
            </p>
          </div>

          {/* Bullet Points */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'es' ? 'Alcance del Servicio Include:' : 'Included Scope of Work:'}
            </h4>
            <div className="space-y-2">
              {service.bulletPoints[language].map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.category);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs shadow"
          >
            <Calculator className="w-4 h-4" />
            <span>{language === 'es' ? 'Cotizar Este Servicio' : 'Request Quote for This Service'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
