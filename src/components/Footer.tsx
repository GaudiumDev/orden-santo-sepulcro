const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'La Orden', href: '#la-orden' },
    { label: 'Historia', href: '#historia' },
    { label: 'Autoridades', href: '#autoridades' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column - Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-foreground text-xl font-bold">✠</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    Orden del Santo Sepulcro
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    Lugartenencia Argentina
                  </p>
                </div>
              </div>
              
              <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">
                Una institución pontificia milenaria al servicio de la Iglesia Católica 
                y la Tierra Santa, promoviendo la fe cristiana y apoyando a las comunidades 
                cristianas de Jerusalén.
              </p>

              <div className="text-primary-foreground/70 text-xs">
                <p className="mb-1">Fundada en 1099</p>
                <p>Reconstitución Pontificia 1847</p>
              </div>
            </div>

            {/* Middle Column - Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-serif text-lg font-semibold mb-6">
                Navegación
              </h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-primary-foreground/80 hover:text-secondary transition-colors duration-300 text-sm text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Column - Contact and Mission */}
            <div className="md:col-span-1">
              <h4 className="font-serif text-lg font-semibold mb-6">
                Nuestra Misión
              </h4>
              <div className="space-y-4 text-sm text-primary-foreground/90">
                <p>
                  Sostener y ayudar a las obras caritativas, culturales y sociales 
                  de la Iglesia Católica en Tierra Santa.
                </p>
                <p>
                  Preservar la presencia cristiana en los lugares santos de 
                  Jerusalén y apoyar a las comunidades locales.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-xs text-primary-foreground/70 mb-2">
                  Contacto:
                </p>
                <a 
                  href="mailto:contacto@ordensantosepulcro.org.ar"
                  className="text-secondary hover:text-secondary-light transition-colors text-sm"
                >
                  contacto@ordensantosepulcro.org.ar
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="text-xs text-primary-foreground/70 mb-4 md:mb-0">
                © {currentYear} Orden Ecuestre del Santo Sepulcro de Jerusalén - Lugartenencia Argentina. 
                Todos los derechos reservados.
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="text-xs text-primary-foreground/80 hover:text-secondary transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Volver al inicio</span>
                <span className="text-secondary">↑</span>
              </button>
            </div>
          </div>

          {/* Latin Motto */}
          <div className="text-center mt-8 pt-8 border-t border-primary-foreground/10">
            <p className="font-serif text-secondary italic text-sm">
              "Deus lo Vult"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;