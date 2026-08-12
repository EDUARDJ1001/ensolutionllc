import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { ServiceCategory, QuoteFormData } from '../types';
import {
  Calculator,
  Building2,
  Hammer,
  Ruler,
  Paintbrush,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface QuoteEstimatorProps {
  initialCategory?: ServiceCategory;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ initialCategory }) => {
  const { language } = useLanguage();
  const t = uiTranslations[language].estimator;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const [formData, setFormData] = useState<QuoteFormData>({
    category: initialCategory || 'concrete',
    specificService: 'driveway',
    areaSizeSqFt: 400,
    timeframe: 'immediate',
    propertyType: 'residential',
    name: '',
    phone: '',
    email: '',
    zipCode: '',
    details: '',
    preferredContact: 'phone'
  });

  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({
        ...prev,
        category: initialCategory,
        specificService: getDefaultSubService(initialCategory)
      }));
    }
  }, [initialCategory]);

  const getDefaultSubService = (cat: ServiceCategory) => {
    switch (cat) {
      case 'concrete':
        return 'driveway';
      case 'remodeling':
        return 'kitchen';
      case 'carpentry':
        return 'trim';
      case 'painting':
        return 'interior';
    }
  };

  const subServiceOptions: Record<ServiceCategory, { id: string; label: { es: string; en: string }; baseRate: number }[]> = {
    concrete: [
      { id: 'driveway', label: { es: 'Entrada de Autos (Concrete Driveway)', en: 'Concrete Driveway' }, baseRate: 10 },
      { id: 'stamped_patio', label: { es: 'Patio de Concreto Estampado', en: 'Stamped Concrete Patio' }, baseRate: 14 },
      { id: 'slab_foundation', label: { es: 'Losa de Cimentación / Garaje', en: 'Garage / Foundation Slab' }, baseRate: 12 },
      { id: 'sidewalk_steps', label: { es: 'Aceras, Caminería y Escalones', en: 'Sidewalks, Walkways & Steps' }, baseRate: 9 },
      { id: 'retaining_wall', label: { es: 'Muros de Contención de Concreto', en: 'Concrete Retaining Walls' }, baseRate: 18 }
    ],
    remodeling: [
      { id: 'kitchen', label: { es: 'Remodelación de Cocina', en: 'Kitchen Remodel' }, baseRate: 50 },
      { id: 'bathroom', label: { es: 'Remodelación de Baño Completo', en: 'Full Bathroom Remodel' }, baseRate: 65 },
      { id: 'flooring', label: { es: 'Instalación de Pisos (LVP / Azulejo)', en: 'Flooring Installation (LVP/Tile)' }, baseRate: 8 },
      { id: 'drywall_framing', label: { es: 'Tablaroca (Drywall) & Enmarcado', en: 'Drywall & Framing' }, baseRate: 12 },
      { id: 'basement', label: { es: 'Sótano Habitable / Conversión', en: 'Basement Finishing' }, baseRate: 35 }
    ],
    carpentry: [
      { id: 'trim', label: { es: 'Zócalos, Molduras y Zócalos Altos', en: 'Baseboards & Crown Molding' }, baseRate: 7 },
      { id: 'deck', label: { es: 'Construcción de Terraza / Deck', en: 'Deck & Pergola Construction' }, baseRate: 22 },
      { id: 'framing', label: { es: 'Estructuras de Madera (Framing)', en: 'Wood Framing Work' }, baseRate: 15 },
      { id: 'custom_wood', label: { es: 'Muebles Empotrados & Maderería', en: 'Built-in Cabinetry & Custom Wood' }, baseRate: 28 }
    ],
    painting: [
      { id: 'interior', label: { es: 'Pintura Interior Completa', en: 'Full Interior Painting' }, baseRate: 3.5 },
      { id: 'exterior', label: { es: 'Pintura Exterior de Fachada', en: 'Exterior House Painting' }, baseRate: 4.5 },
      { id: 'deck_stain', label: { es: 'Teñido y Sellado de Madera / Deck', en: 'Deck Staining & Sealing' }, baseRate: 3.0 },
      { id: 'epoxy_garage', label: { es: 'Recubrimiento Epóxico para Garaje', en: 'Garage Floor Epoxy Coating' }, baseRate: 5.5 }
    ]
  };

  // Calculate estimated cost range
  const calculateEstimate = () => {
    const list = subServiceOptions[formData.category];
    const item = list.find((s) => s.id === formData.specificService) || list[0];
    const base = item.baseRate;
    const sqft = formData.areaSizeSqFt;
    const propertyMult = formData.propertyType === 'commercial' ? 1.2 : 1.0;

    const minTotal = Math.round(sqft * base * 0.85 * propertyMult);
    const maxTotal = Math.round(sqft * base * 1.25 * propertyMult);

    return { minTotal, maxTotal };
  };

  const { minTotal, maxTotal } = calculateEstimate();

  const handleCategoryChange = (cat: ServiceCategory) => {
    const defaultSub = getDefaultSubService(cat);
    setFormData((prev) => ({
      ...prev,
      category: cat,
      specificService: defaultSub
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const code = `EN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setReferenceCode(code);
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({
      category: 'concrete',
      specificService: 'driveway',
      areaSizeSqFt: 400,
      timeframe: 'immediate',
      propertyType: 'residential',
      name: '',
      phone: '',
      email: '',
      zipCode: '',
      details: '',
      preferredContact: 'phone'
    });
  };

  return (
    <section id="estimator" className="py-20 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-amber-500/40 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Estimator Card Container */}
        <div className="bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-10">
          
          {!submitted ? (
            <div>
              {/* Step Progress Bar */}
              <div className="grid grid-cols-3 gap-2 mb-8 border-b border-slate-700 pb-6 text-xs sm:text-sm font-bold">
                <button
                  onClick={() => setStep(1)}
                  className={`flex items-center justify-center gap-2 pb-2 transition-colors border-b-2 ${
                    step === 1 ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs">1</span>
                  <span className="hidden sm:inline">{t.step1Title}</span>
                </button>

                <button
                  onClick={() => setStep(2)}
                  className={`flex items-center justify-center gap-2 pb-2 transition-colors border-b-2 ${
                    step === 2 ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs">2</span>
                  <span className="hidden sm:inline">{t.step2Title}</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className={`flex items-center justify-center gap-2 pb-2 transition-colors border-b-2 ${
                    step === 3 ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs">3</span>
                  <span className="hidden sm:inline">{t.step3Title}</span>
                </button>
              </div>

              {/* STEP 1: CATEGORY & SERVICE */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-3">
                      {t.serviceTypeLabel}
                    </label>

                    {/* Category Selection Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('concrete')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          formData.category === 'concrete'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-900/50 border-slate-700 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <Building2 className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-sm block text-white">
                            {language === 'es' ? 'Trabajos en Concreto' : 'Concrete Work'}
                          </span>
                          <span className="text-xs text-slate-400 block mt-0.5">
                            {language === 'es' ? 'Driveways, patios, losas & estampado' : 'Driveways, patios, slabs & stamped'}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange('remodeling')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          formData.category === 'remodeling'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-900/50 border-slate-700 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <Hammer className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-sm block text-white">
                            {language === 'es' ? 'Remodelación Interior' : 'Interior Remodeling'}
                          </span>
                          <span className="text-xs text-slate-400 block mt-0.5">
                            {language === 'es' ? 'Cocinas, baños, sótanos & pisos' : 'Kitchens, baths, basements & floors'}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange('carpentry')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          formData.category === 'carpentry'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-900/50 border-slate-700 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <Ruler className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-sm block text-white">
                            {language === 'es' ? 'Carpintería Profesional' : 'Professional Carpentry'}
                          </span>
                          <span className="text-xs text-slate-400 block mt-0.5">
                            {language === 'es' ? 'Molduras, zócalos, decks & marcos' : 'Trim, baseboards, decks & framing'}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange('painting')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          formData.category === 'painting'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-900/50 border-slate-700 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <Paintbrush className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-sm block text-white">
                            {language === 'es' ? 'Pintura Profesional' : 'Professional Painting'}
                          </span>
                          <span className="text-xs text-slate-400 block mt-0.5">
                            {language === 'es' ? 'Interior, exterior, stain & epóxico' : 'Interior, exterior, stain & epoxy'}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Specific Sub-Service Select */}
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-2">
                      {t.subServiceLabel}
                    </label>
                    <select
                      value={formData.specificService}
                      onChange={(e) => setFormData({ ...formData, specificService: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      {subServiceOptions[formData.category].map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 1 Next Action */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm shadow-md"
                    >
                      <span>{language === 'es' ? 'Siguiente: Especificaciones' : 'Next: Specifications'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PROJECT PARAMETERS */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Area Slider & Input */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-200">
                        {t.areaLabel}
                      </label>
                      <span className="text-amber-400 font-extrabold text-lg">
                        {formData.areaSizeSqFt} sq ft
                      </span>
                    </div>

                    <input
                      type="range"
                      min="100"
                      max="3000"
                      step="50"
                      value={formData.areaSizeSqFt}
                      onChange={(e) => setFormData({ ...formData, areaSizeSqFt: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />

                    <div className="flex justify-between text-xs text-slate-400">
                      <span>100 sq ft</span>
                      <span>1,500 sq ft</span>
                      <span>3,000+ sq ft</span>
                    </div>
                  </div>

                  {/* Property Type Radio */}
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-2">
                      {t.propertyTypeLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: 'residential' })}
                        className={`p-3 rounded-lg border text-sm font-bold text-center transition-all ${
                          formData.propertyType === 'residential'
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {t.residential}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: 'commercial' })}
                        className={`p-3 rounded-lg border text-sm font-bold text-center transition-all ${
                          formData.propertyType === 'commercial'
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {t.commercial}
                      </button>
                    </div>
                  </div>

                  {/* Timeframe Select */}
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-2">
                      {t.timeframeLabel}
                    </label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 text-sm focus:border-amber-500"
                    >
                      <option value="immediate">{t.timeframeOptions.immediate}</option>
                      <option value="soon">{t.timeframeOptions.soon}</option>
                      <option value="flexible">{t.timeframeOptions.flexible}</option>
                    </select>
                  </div>

                  {/* Estimated Range Indicator Banner */}
                  <div className="bg-slate-900/90 border border-amber-500/50 rounded-xl p-5 text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                      {t.estimatedRangeTitle}
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      ${minTotal.toLocaleString()} – ${maxTotal.toLocaleString()} <span className="text-xs font-normal text-slate-400">EST</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                      {t.estimateDisclaimer}
                    </p>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-slate-400 hover:text-white text-sm font-semibold py-2 px-3"
                    >
                      {language === 'es' ? 'Atrás' : 'Back'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm shadow-md"
                    >
                      <span>{language === 'es' ? 'Siguiente: Contacto' : 'Next: Contact Info'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT INFORMATION & SUBMIT */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.contactLabels.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.contactLabels.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="(555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.contactLabels.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.contactLabels.zipCode} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="Zip Code / Ciudad"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {t.contactLabels.preferredContact}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'phone' })}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold text-center ${
                          formData.preferredContact === 'phone'
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {t.contactLabels.phoneOption}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold text-center ${
                          formData.preferredContact === 'whatsapp'
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {t.contactLabels.whatsappOption}
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
                        className={`py-2 px-3 rounded-lg border text-xs font-bold text-center ${
                          formData.preferredContact === 'email'
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {t.contactLabels.emailOption}
                      </button>
                    </div>
                  </div>

                  {/* Additional Details TextArea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {t.contactLabels.details}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder={t.contactLabels.detailsPlaceholder}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-xs space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{language === 'es' ? 'Superficie Seleccionada:' : 'Selected Area:'}</span>
                      <span className="font-bold text-white">{formData.areaSizeSqFt} sq ft</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>{language === 'es' ? 'Rango Estimado Aproximado:' : 'Approx. Estimated Range:'}</span>
                      <span className="font-bold text-amber-400">${minTotal.toLocaleString()} – ${maxTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-slate-400 hover:text-white text-sm font-semibold py-2 px-3"
                    >
                      {language === 'es' ? 'Atrás' : 'Back'}
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm shadow-md transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{t.submitting}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.submitButton}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* SUCCESS CONFIRMATION RECEIPT */
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">
                  {t.successTitle}
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  {t.successMessage}
                </p>
              </div>

              {/* Reference Code Ticket Box */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 max-w-md mx-auto space-y-2 text-left">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>{t.referenceCode}:</span>
                  <span className="font-mono text-amber-400 font-bold">{referenceCode}</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 pt-1">
                  <div><strong>Cliente:</strong> {formData.name}</div>
                  <div><strong>Teléfono:</strong> {formData.phone}</div>
                  <div><strong>Superficie:</strong> {formData.areaSizeSqFt} sq ft</div>
                  <div><strong>Estimado:</strong> ${minTotal.toLocaleString()} - ${maxTotal.toLocaleString()}</div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-slate-200 font-semibold px-5 py-2.5 rounded-lg text-xs transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.resetForm}</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
