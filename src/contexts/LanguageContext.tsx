import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  de: {
    // Header
    'nav.services': 'Leistungen',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.title': 'KI-Lösungen für Ihr Unternehmen',
    'hero.subtitle': 'Wir identifizieren Probleme in Ihrem Unternehmen und lösen sie mit modernster KI-Technologie. Von Webentwicklung bis hin zu SaaS-Lösungen – wir sind Ihr Partner für digitale Transformation.',
    'hero.cta': 'Kostenlose Beratung',
    'hero.learn-more': 'Mehr erfahren',
    
    // Services
    'services.title': 'Unsere Leistungen',
    'services.subtitle': 'Maßgeschneiderte Lösungen für Ihre Herausforderungen',
    'services.ai.title': 'KI-Beratung',
    'services.ai.description': 'Identifikation und Lösung von Unternehmensproblemen mit künstlicher Intelligenz',
    'services.web.title': 'Webentwicklung',
    'services.web.description': 'Moderne, responsive Websites und Webanwendungen für Ihr Unternehmen',
    'services.saas.title': 'SaaS-Entwicklung',
    'services.saas.description': 'Skalierbare Software-as-a-Service Lösungen für komplexe Geschäftsanforderungen',
    'services.deployment.title': 'Deployment & Wartung',
    'services.deployment.description': 'Professionelle Bereitstellung und kontinuierliche Wartung Ihrer Lösungen',
    
    // About
    'about.title': 'Warum wir?',
    'about.subtitle': 'Expertise, die Ergebnisse liefert',
    'about.description': 'Als erfahrene IT-Berater kombinieren wir technische Expertise mit Geschäftsverständnis. Wir analysieren Ihre Prozesse, identifizieren Optimierungspotenziale und implementieren maßgeschneiderte Lösungen, die echten Mehrwert schaffen.',
    'about.experience': 'Jahre Erfahrung',
    'about.projects': 'Erfolgreiche Projekte',
    'about.clients': 'Zufriedene Kunden',
    
    // Contact
    'contact.title': 'Bereit für die Zukunft?',
    'contact.subtitle': 'Lassen Sie uns gemeinsam Ihr Unternehmen transformieren',
    'contact.cta': 'Termin vereinbaren',
    'contact.email': 'Email senden',
  },
  en: {
    // Header
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'AI Solutions for Your Business',
    'hero.subtitle': 'We identify problems in your company and solve them with cutting-edge AI technology. From web development to SaaS solutions – we are your partner for digital transformation.',
    'hero.cta': 'Free Consultation',
    'hero.learn-more': 'Learn More',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Tailored solutions for your challenges',
    'services.ai.title': 'AI Consulting',
    'services.ai.description': 'Identifying and solving business problems with artificial intelligence',
    'services.web.title': 'Web Development',
    'services.web.description': 'Modern, responsive websites and web applications for your business',
    'services.saas.title': 'SaaS Development',
    'services.saas.description': 'Scalable Software-as-a-Service solutions for complex business requirements',
    'services.deployment.title': 'Deployment & Maintenance',
    'services.deployment.description': 'Professional deployment and continuous maintenance of your solutions',
    
    // About
    'about.title': 'Why Choose Us?',
    'about.subtitle': 'Expertise that delivers results',
    'about.description': 'As experienced IT consultants, we combine technical expertise with business understanding. We analyze your processes, identify optimization potential, and implement tailored solutions that create real value.',
    'about.experience': 'Years of Experience',
    'about.projects': 'Successful Projects',
    'about.clients': 'Satisfied Clients',
    
    // Contact
    'contact.title': 'Ready for the Future?',
    'contact.subtitle': 'Let\'s transform your business together',
    'contact.cta': 'Schedule Meeting',
    'contact.email': 'Send Email',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};