import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { ProjectItem, ServiceCategory } from '../types';
import {
  X,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Calculator,
  ArrowRight
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (category: ServiceCategory) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestSimilar
}) => {
  const { language } = useLanguage();
  if (!project) return null;

  const t = uiTranslations[language].gallery.specs;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {project.categoryLabel[language]}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {project.title[language]}
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {project.description[language]}
            </p>
          </div>

          {/* Project Spec Quick Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-medium block flex items-center gap-1 mb-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.location}</span>
              </span>
              <span className="font-bold text-slate-800 block">{project.location}</span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block flex items-center gap-1 mb-0.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.completion}</span>
              </span>
              <span className="font-bold text-slate-800 block">{project.completionDate}</span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 font-medium block flex items-center gap-1 mb-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.duration}</span>
              </span>
              <span className="font-bold text-slate-800 block">{project.duration[language]}</span>
            </div>
          </div>

          {/* Materials & Highlights lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{t.materials}</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {project.materialsUsed[language].map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{t.highlights}</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {project.keyHighlights[language].map((hl, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
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
              onRequestSimilar(project.category);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs shadow"
          >
            <Calculator className="w-4 h-4" />
            <span>{language === 'es' ? 'Cotizar Proyecto Similar' : 'Request Similar Project Quote'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
