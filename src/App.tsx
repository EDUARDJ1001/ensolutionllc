import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ConcreteCompProvider } from './context/ConcreteCompContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectGallery } from './components/ProjectGallery';
import { QuoteEstimator } from './components/QuoteEstimator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { ConcreteCompAdmin } from './components/ConcreteCompAdmin';
import { ProjectItem, ServiceDetail, ServiceCategory } from './types';

/** Gallery admin panel opens only through the #admin URL hash. */
const ADMIN_HASH = '#admin';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceDetail | null>(null);
  const [estimatorCategory, setEstimatorCategory] = useState<ServiceCategory | undefined>(undefined);
  const [adminOpen, setAdminOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash === ADMIN_HASH
  );

  useEffect(() => {
    const syncFromHash = () => setAdminOpen(window.location.hash === ADMIN_HASH);
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === ADMIN_HASH) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleOpenQuote = (category?: ServiceCategory) => {
    if (category) {
      setEstimatorCategory(category);
    }
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGallery = () => {
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <ConcreteCompProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        
            {/* Header & Navigation */}
            <Header onOpenQuote={() => handleOpenQuote()} />

            <main>
              {/* Hero Section */}
              <Hero
                onOpenQuote={() => handleOpenQuote()}
                onExploreGallery={handleExploreGallery}
              />

              {/* Services Showcase */}
              <ServicesSection
                onSelectServiceForQuote={(cat) => handleOpenQuote(cat)}
                onOpenServiceModal={(service) => setSelectedServiceModal(service)}
              />

              {/* Project Gallery */}
              <ProjectGallery
                onSelectProject={(proj) => setSelectedProject(proj)}
                onRequestSimilar={(cat) => handleOpenQuote(cat)}
              />

              {/* Interactive Cost Estimator */}
              <QuoteEstimator initialCategory={estimatorCategory} />

              {/* Why Choose E & N Solution LLC */}
              <WhyChooseUs />

              {/* Verified Client Testimonials */}
              <Testimonials />

              {/* Direct Contact & Inquiry */}
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Lightbox Project Modal */}
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onRequestSimilar={(cat) => handleOpenQuote(cat)}
            />

            {/* Service Details Modal */}
            <ServiceModal
              service={selectedServiceModal}
              onClose={() => setSelectedServiceModal(null)}
              onRequestQuote={(cat) => handleOpenQuote(cat)}
            />

            {/* Supabase Gallery Admin Panel (opened via the #admin hash) */}
            <ConcreteCompAdmin open={adminOpen} onClose={handleCloseAdmin} />

          </div>
        </ConcreteCompProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
