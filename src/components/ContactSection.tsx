import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/content';
import { buildWhatsAppUrl, toTelNumber } from '../lib/contact';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const t = uiTranslations[language].contact;
  const company = uiTranslations[language];

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const whatsappMessage =
    language === 'es'
      ? `Hola ${company.companyName}, deseo solicitar información sobre sus servicios.`
      : `Hello ${company.companyName}, I would like to request information about your services.`;
  const whatsappUrl = buildWhatsAppUrl(company.phone, whatsappMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setContactForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-amber-500/40 text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">{t.phoneTitle}</h3>
                <a
                  href={`tel:${toTelNumber(company.phone)}`}
                  className="text-lg font-black text-amber-400 hover:underline block"
                >
                  {company.phone}
                </a>
                <p className="text-xs text-slate-400">
                  {language === 'es' ? 'Llamadas e inspecciones directas en sitio' : 'Direct calls and on-site estimate bookings'}
                </p>
              </div>
            </div>

            {/* WhatsApp Direct Link Card */}
            <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:border-amber-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">{t.whatsappTitle}</h3>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-black text-emerald-400 hover:underline block"
                >
                  {company.phone}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg mt-1 shadow transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
                <p className="text-xs text-slate-400 pt-1">
                  {language === 'es' ? 'Respuesta rápida y envío de fotos del sitio' : 'Fast replies and site photo sharing'}
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-6 flex items-start gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-slate-700 text-slate-200 flex items-center justify-center font-bold shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-white">{t.emailTitle}</h3>
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm font-semibold text-slate-300 hover:text-amber-400 block"
                >
                  {company.email}
                </a>
              </div>
            </div>

            {/* Hours & Area Card */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.hoursTitle}</h4>
                  <p className="text-xs text-slate-300 whitespace-pre-line mt-1">
                    {t.hoursDetails}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-3 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.areaTitle}</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {t.areaDetails}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800 border border-slate-700/80 rounded-2xl p-8 shadow-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white">{t.formTitle}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'es'
                    ? 'Déjenos un mensaje y responderemos sus inquietudes el mismo día.'
                    : 'Leave us a message and we will respond to your inquiry same day.'}
                </p>
              </div>

              {sent ? (
                <div className="bg-slate-900 border border-emerald-500/50 rounded-xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <p className="text-white font-bold text-base">{t.messageSent}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.namePlaceholder} *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="Nombre completo"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.phonePlaceholder} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.emailPlaceholder} *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        {t.servicePlaceholder}
                      </label>
                      <select
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                      >
                        <option value="">{language === 'es' ? 'Seleccionar servicio' : 'Select service'}</option>
                        <option value="concrete">{language === 'es' ? 'Trabajos de Concreto' : 'Concrete Work'}</option>
                        <option value="remodeling">{language === 'es' ? 'Remodelación Interior' : 'Interior Remodeling'}</option>
                        <option value="carpentry">{language === 'es' ? 'Carpintería' : 'Carpentry'}</option>
                        <option value="painting">{language === 'es' ? 'Pintura Profesional' : 'Painting'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {t.messagePlaceholder} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 text-sm focus:border-amber-500"
                      placeholder="Escriba aquí los detalles de su proyecto..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? t.sendingMessage : t.sendMessage}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
