import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { number: '10+', label: t('about.experience') },
    { number: '100+', label: t('about.projects') },
    { number: '50+', label: t('about.clients') },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-primary rounded-2xl shadow-hero opacity-20"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-elevated flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {t('about.subtitle')}
                </h3>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;