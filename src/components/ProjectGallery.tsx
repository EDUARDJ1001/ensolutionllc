import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { projectsData } from '../data/projects';
import { ConcreteCompGallery } from './ConcreteCompGallery';
import { ProjectItem, ServiceCategory } from '../types';
import {
  MapPin,
  Clock,
  ArrowRight,
  Layers
} from 'lucide-react';

interface ProjectGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
  onRequestSimilar: (category: ServiceCategory) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onSelectProject,
  onRequestSimilar
}) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].gallery;
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  // Static showcase projects are optional: while `projectsData` is empty the
  // section is filled by the projects published from the admin panel.
  const hasStaticProjects = projectsData.length > 0;

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {hasStaticProjects && (
          <>
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {t.allCategories}
          </button>

          <button
            onClick={() => setSelectedCategory('concrete')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
              selectedCategory === 'concrete'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'es' ? 'Concreto' : 'Concrete'}
          </button>

          <button
            onClick={() => setSelectedCategory('remodeling')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
              selectedCategory === 'remodeling'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'es' ? 'Remodelación' : 'Remodeling'}
          </button>

          <button
            onClick={() => setSelectedCategory('carpentry')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
              selectedCategory === 'carpentry'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'es' ? 'Carpintería' : 'Carpentry'}
          </button>

          <button
            onClick={() => setSelectedCategory('painting')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border ${
              selectedCategory === 'painting'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {language === 'es' ? 'Pintura' : 'Painting'}
          </button>
        </div>

        {/* Gallery Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Project Header Container */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative w-full bg-slate-900 cursor-pointer p-5 space-y-3"
                >
                  {/* Category Pill Tag */}
                  <span className="inline-block bg-slate-800/90 text-amber-400 text-xs font-bold px-2.5 py-1 rounded border border-slate-700">
                    {project.categoryLabel[language]}
                  </span>

                  {/* Meta Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200 bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{project.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{project.duration[language]}</span>
                    </span>
                  </div>
                </div>

                {/* Card Text Information */}
                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="font-bold text-slate-900 text-lg hover:text-amber-600 transition-colors cursor-pointer leading-snug"
                  >
                    {project.title[language]}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {project.description[language]}
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 pt-4">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 transition-colors"
                >
                  <span>{t.viewProject}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onRequestSimilar(project.category)}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded transition-colors"
                >
                  {t.requestSimilar}
                </button>
              </div>

            </div>
          ))}
        </div>
          </>
        )}

        {/* Projects published from the admin panel (Supabase: concrete_comp_edgar) */}
        <ConcreteCompGallery showHeading={hasStaticProjects} />

      </div>
    </section>
  );
};
