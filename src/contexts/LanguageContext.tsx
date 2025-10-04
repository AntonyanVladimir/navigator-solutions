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

    // Footer
    'footer.companyTitle': 'TechConsult AI GmbH',
    'footer.companyDescription': 'Ihr Partner für KI-gestützte Transformation und nachhaltiges Wachstum.',
    'footer.contactsTitle': 'Kontakt',
    'footer.addressTitle': 'Adresse',
    'footer.contact.phone': 'Telefon',
    'footer.contact.email': 'E-Mail',
    'footer.address.street': 'Alexanderplatz 1',
    'footer.address.city': '10178 Berlin',
    'footer.address.country': 'Deutschland',
    'footer.copy': '© {year} TechConsult AI. Alle Rechte vorbehalten.',

    // Booking
    'booking.title': 'Termin vereinbaren',
    'booking.step1.title': 'Wählen Sie eine Leistung',
    'booking.step1.subtitle': 'Welche Unterstützung benötigen Sie?',
    'booking.step2.title': 'Datum & Uhrzeit',
    'booking.step2.subtitle': 'Wann passt es Ihnen am besten?',
    'booking.step3.title': 'Ihre Kontaktdaten',
    'booking.step3.subtitle': 'Damit wir Sie erreichen können',
    'booking.service.label': 'Leistung auswählen',
    'booking.service.ai.duration': '60 Min. - Kostenlose Erstberatung',
    'booking.service.web.duration': '45 Min. - Projektbesprechung',
    'booking.service.saas.duration': '60 Min. - Anforderungsanalyse',
    'booking.date.label': 'Datum auswählen',
    'booking.time.label': 'Uhrzeit auswählen',
    'booking.firstName.label': 'Vorname',
    'booking.firstName.placeholder': 'Max',
    'booking.lastName.label': 'Nachname',
    'booking.lastName.placeholder': 'Mustermann',
    'booking.email.label': 'E-Mail',
    'booking.email.placeholder': 'max@unternehmen.de',
    'booking.phone.label': 'Telefon (optional)',
    'booking.phone.placeholder': '+49 123 456789',
    'booking.company.label': 'Unternehmen (optional)',
    'booking.company.placeholder': 'Ihr Unternehmen',
    'booking.message.label': 'Nachricht (optional)',
    'booking.message.placeholder': 'Beschreiben Sie kurz Ihre Herausforderung...',
    'booking.summary.title': 'Zusammenfassung',
    'booking.buttons.previous': 'Zurück',
    'booking.buttons.next': 'Weiter',
    'booking.buttons.submit': 'Termin buchen',
    'booking.buttons.submitting': 'Wird gebucht...',
    'booking.validation.service': 'Bitte wählen Sie eine Leistung aus',
    'booking.validation.date': 'Bitte wählen Sie ein Datum aus',
    'booking.validation.time': 'Bitte wählen Sie eine Uhrzeit aus',
    'booking.validation.firstName': 'Vorname ist erforderlich',
    'booking.validation.lastName': 'Nachname ist erforderlich',
    'booking.validation.email': 'E-Mail ist erforderlich',
    'booking.validation.emailFormat': 'Bitte geben Sie eine gültige E-Mail an',
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

    // Footer
    'footer.companyTitle': 'TechConsult AI GmbH',
    'footer.companyDescription': 'Your partner for AI-driven transformation and sustainable growth.',
    'footer.contactsTitle': 'Contacts',
    'footer.addressTitle': 'Address',
    'footer.contact.phone': 'Phone',
    'footer.contact.email': 'Email',
    'footer.address.street': 'Alexanderplatz 1',
    'footer.address.city': '10178 Berlin',
    'footer.address.country': 'Germany',
    'footer.copy': '© {year} TechConsult AI. All rights reserved.',

    // Booking
    'booking.title': 'Schedule Meeting',
    'booking.step1.title': 'Choose a Service',
    'booking.step1.subtitle': 'What kind of support do you need?',
    'booking.step2.title': 'Date & Time',
    'booking.step2.subtitle': 'When works best for you?',
    'booking.step3.title': 'Your Contact Details',
    'booking.step3.subtitle': 'So we can reach you',
    'booking.service.label': 'Select Service',
    'booking.service.ai.duration': '60 Min. - Free Initial Consultation',
    'booking.service.web.duration': '45 Min. - Project Discussion',
    'booking.service.saas.duration': '60 Min. - Requirements Analysis',
    'booking.date.label': 'Choose Date',
    'booking.time.label': 'Choose Time',
    'booking.firstName.label': 'First Name',
    'booking.firstName.placeholder': 'John',
    'booking.lastName.label': 'Last Name',
    'booking.lastName.placeholder': 'Doe',
    'booking.email.label': 'Email',
    'booking.email.placeholder': 'john@company.com',
    'booking.phone.label': 'Phone (optional)',
    'booking.phone.placeholder': '+1 234 567890',
    'booking.company.label': 'Company (optional)',
    'booking.company.placeholder': 'Your Company',
    'booking.message.label': 'Message (optional)',
    'booking.message.placeholder': 'Briefly describe your challenge...',
    'booking.summary.title': 'Summary',
    'booking.buttons.previous': 'Previous',
    'booking.buttons.next': 'Next',
    'booking.buttons.submit': 'Book Meeting',
    'booking.buttons.submitting': 'Booking...',
    'booking.validation.service': 'Please select a service',
    'booking.validation.date': 'Please select a date',
    'booking.validation.time': 'Please select a time',
    'booking.validation.firstName': 'First name is required',
    'booking.validation.lastName': 'Last name is required',
    'booking.validation.email': 'Email is required',
    'booking.validation.emailFormat': 'Please enter a valid email address',
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
