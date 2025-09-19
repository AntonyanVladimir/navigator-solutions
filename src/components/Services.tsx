import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Globe, Cog, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Brain,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: Globe,
      title: t('services.web.title'),
      description: t('services.web.description'),
      gradient: 'from-green-500 to-blue-500',
    },
    {
      icon: Cog,
      title: t('services.saas.title'),
      description: t('services.saas.description'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Rocket,
      title: t('services.deployment.title'),
      description: t('services.deployment.description'),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card"
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${service.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl text-primary">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;