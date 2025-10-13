import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/techconsult-logo.svg';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const displayName = user ? (user.email.split('@')[0] || user.email) : '';

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 flex items-center gap-3"
            aria-label="TechConsult AI"
          >
            <img
              src={logo}
              alt="TechConsult AI logo"
              className="h-10 w-auto shadow-hero"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.services')}
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.about')}
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </a>
            
          </nav>

          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-primary"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language.toUpperCase()}
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-card">
              {t('hero.cta')}
            </Button>
            {user && user.role === "Admin" ? (
              <>
                <span className="text-sm font-medium text-primary">
                  {`${t('nav.hello')} ${displayName}`}
                </span>
                <Button variant="outline" asChild>
                  <Link to="/admin">{t('nav.admin')}</Link>
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register">{t('nav.register')}</Link>
                </Button>
                {user && (
              <>
                <Button variant="outline" asChild>
                  <Link to="/admin">{t('nav.admin')}</Link>
                </Button>
              </>
            )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-2 pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#services" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.services')}
              </a>
              <a 
                href="#about" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </a>
              <a 
                href="#contact" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
              <Link
                to="/admin"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.admin')}
              </Link>
              {user ? (
                <div className="rounded-lg border border-border/70 bg-card/50 px-4 py-3 text-left text-sm font-medium text-primary">
                  {`${t('nav.hello')} ${displayName}`}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
                <Button className="bg-gradient-primary hover:opacity-90 shadow-card">
                  {t('hero.cta')}
                </Button>
                {user ? (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.admin')}
                      </Link>
                    </Button>
                    <Button variant="secondary" onClick={handleLogout}>
                      {t('nav.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.login')}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.register')}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.admin')}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
