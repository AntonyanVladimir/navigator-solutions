import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/techconsult-logo.svg';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear().toString();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-32 w-full max-w-5xl -translate-y-1/2 rounded-full bg-gradient-primary opacity-30 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <img
              src={logo}
              alt="TechConsult AI logo"
              className="h-14 w-auto shadow-hero"
            />
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary/70">
              {t('footer.companyTitle')}
            </h3>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary/80" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {t('footer.companyDescription')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary">
              {t('footer.contactsTitle')}
            </h3>
            <div className="mt-6 space-y-4">
              <a
                href="tel:+493012345678"
                className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium uppercase tracking-wide text-primary/80">
                    {t('footer.contact.phone')}
                  </span>
                  <span className="text-base">+49 30 1234 5678</span>
                </div>
              </a>
              <a
                href="mailto:contact@techconsult.ai"
                className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium uppercase tracking-wide text-primary/80">
                    {t('footer.contact.email')}
                  </span>
                  <span className="text-base">contact@techconsult.ai</span>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary">
              {t('footer.addressTitle')}
            </h3>
            <div className="mt-6 flex items-start gap-3 text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="text-base leading-relaxed">
                <p>{t('footer.address.street')}</p>
                <p>{t('footer.address.city')}</p>
                <p>{t('footer.address.country')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          {t('footer.copy').replace('{year}', year)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
