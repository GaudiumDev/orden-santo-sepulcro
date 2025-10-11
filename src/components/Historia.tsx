const Historia = () => {
  const timelineEvents = [
    {
      year: "1099",
      title: "Fundación de la Orden",
      description:
        "Establecida durante la Primera Cruzada por Godofredo de Bouillón en Jerusalén.",
    },
    {
      year: "1847",
      title: "Reconstitución Pontificia",
      description:
        "El Papa Pío IX reconstituye la Orden como institución pontificia moderna.",
    },
    {
      year: "1949",
      title: "Estatutos Modernos",
      description:
        "El Papa Pío XII aprueba los nuevos estatutos que rigen la Orden actualmente.",
    },
    {
      year: "1962",
      title: "Lugartenencia Argentina",
      description:
        "Se establece oficialmente la Lugartenencia Argentina de la Orden.",
    },
    {
      year: "1988",
      title: "Constitución Apostólica",
      description:
        "Juan Pablo II publica la Constitución Apostólica que define la estructura actual.",
    },
    {
      year: "Presente",
      title: "Misión Continua",
      description:
        "La Orden mantiene su compromiso con Tierra Santa y las comunidades cristianas.",
    },
  ]

  return (
    <section id="historia" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Historia
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Más de nueve siglos de tradición al servicio de la Iglesia y
              Tierra Santa
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - left aligned on mobile, centered on desktop */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary opacity-30"></div>

            {/* Timeline Events */}
            <div className="space-y-12 md:space-y-16">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center md:${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Mobile layout - always left aligned with padding for line */}
                  <div className="w-full pl-12 md:pl-0 md:w-5/12 md:pr-8 md:text-right md:even:pl-8 md:even:pr-0 md:even:text-left">
                    <div className="bg-card rounded-2xl p-6 shadow-card-custom hover:shadow-elegant transition-all duration-300">
                      <div className="flex items-center justify-start md:justify-end md:even:justify-start mb-4">
                        <span className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-gold">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-primary mb-3 text-left">
                        {event.title}
                      </h3>
                      <p className="text-foreground leading-relaxed text-left">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Circle - left aligned on mobile, centered on desktop */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-gold rounded-full border-4 border-card shadow-gold"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="text-center mt-20">
            <blockquote className="font-serif text-2xl md:text-3xl italic text-primary max-w-3xl mx-auto">
              "Por la gracia de Dios, guardianes de los Santos Lugares y
              protectores de los cristianos de Tierra Santa"
            </blockquote>
            <div className="w-16 h-1 bg-gradient-gold mx-auto mt-6"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Historia
