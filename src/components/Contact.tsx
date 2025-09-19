import { Button } from '@/components/ui/button';
import { Mail, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-hero transition-all duration-300 hover:scale-105"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t('contact.cta')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              {t('contact.email')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;