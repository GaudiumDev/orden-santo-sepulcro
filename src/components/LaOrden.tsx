const LaOrden = () => {
  return (
    <section id="la-orden" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              La Orden
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground">
              Una institución pontificia al servicio de Tierra Santa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Description */}
            <div className="text-left space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-4">
                ¿Qué es la Orden?
              </h3>
              <p className="text-lg leading-relaxed text-foreground">
                La Orden Ecuestre del Santo Sepulcro de Jerusalén es una
                institución católica pontificia que tiene como misión sostener y
                ayudar a las obras caritativas, culturales y sociales de la
                Iglesia Católica en Tierra Santa.
              </p>
              <p className="text-lg leading-relaxed text-foreground">
                Fundada en el siglo XI durante las Cruzadas, mantiene viva la
                presencia cristiana en los lugares santos y apoya a las
                comunidades cristianas locales.
              </p>
            </div>

            {/* Right Column - Mission */}
            <div className="bg-card rounded-2xl p-8 shadow-card-custom">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                Nuestra Misión
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3"></div>
                  <p className="text-foreground">
                    Defensa de la fe y protección de los necesitados en Tierra
                    Santa
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3"></div>
                  <p className="text-foreground">
                    Preservar y fortalecer la presencia cristiana en Tierra
                    Santa
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3"></div>
                  <p className="text-foreground">
                    Apoyar al Patriarcado Latino de Jerusalén y sus obras
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3"></div>
                  <p className="text-foreground">
                    Promover el conocimiento de Tierra Santa en el mundo
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-3"></div>
                  <p className="text-foreground">
                    Sostener económicamente las actividades pastorales y
                    educativas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Values */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground text-2xl">⛪</span>
              </div>
              <h4 className="font-serif text-xl font-semibold text-primary mb-3">
                Fe
              </h4>
              <p className="text-muted-foreground">
                Comprometidos con la tradición católica y los valores
                evangélicos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-foreground text-2xl">🤝</span>
              </div>
              <h4 className="font-serif text-xl font-semibold text-primary mb-3">
                Caridad
              </h4>
              <p className="text-muted-foreground">
                Dedicados al servicio de los más necesitados en Tierra Santa
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground text-2xl">⚔️</span>
              </div>
              <h4 className="font-serif text-xl font-semibold text-primary mb-3">
                Honor
              </h4>
              <p className="text-muted-foreground">
                Manteniendo los ideales caballerescos de justicia y dignidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LaOrden
