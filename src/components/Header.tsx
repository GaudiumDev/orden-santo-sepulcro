import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'La Orden', href: '#la-orden' },
    { label: 'Historia', href: '#historia' },
    { label: 'Autoridades', href: '#autoridades' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Información', href: '#informacion' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Admin', href: '/auth', isExternal: true },
  ];

  const scrollToSection = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.location.href = href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/95 backdrop-blur-sm shadow-card-custom border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">✠</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-serif text-xl font-bold text-foreground">
                Orden del Santo Sepulcro
              </h1>
              <p className="text-sm text-muted-foreground">Lugartenencia Argentina</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href, item.isExternal)}
                className={`transition-colors duration-300 font-medium ${
                  item.label === 'Admin' 
                    ? 'text-sm px-3 py-1 border border-primary rounded-md text-primary hover:bg-primary hover:text-primary-foreground' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href, item.isExternal)}
                  className={`text-left transition-colors duration-300 font-medium py-2 ${
                    item.label === 'Admin' 
                      ? 'text-primary hover:text-primary-light' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;