const Autoridades = () => {
  const autoridadesVaticano = [
    {
      name: "Gran Maestre",
      title: "Cardenal Fernando Feloni",
      role: "Gran Maestre de la Orden",
      description: "Máxima autoridad de la Orden",
    },
    {
      name: "Gran Prior",
      title: "Cardenal Pierbattista Pizzaballa",
      role: "Patriarca Latino de Jerusalén",
      description: "Gran Prior de la Orden",
    },
    {
      name: "Gobernador General",
      title: "Embajador Leonardo Visconti di Modrone",
      role: "Gobernador General de la Orden",
      description: "Representa al Gran Maestre en el gobierno",
    },
  ]

  const viceGobernadores = [
    {
      title: "Enric Mas",
      role: "Vice Gobernador General para Latinoamérica",
    },
    {
      title: "Thomas Pogge",
      role: "Vice Gobernador General para América del Norte",
    },
    {
      title: "Jean Pierre de Glutz",
      role: "Vice Gobernador General para Europa",
    },
    {
      title: "John Secker",
      role: "Vice Gobernador General para Asia-Australia-Pacífico",
    },
  ]

  const autoridadesArgentina = [
    {
      name: "Gran Prior",
      title: "Monseñor Alejandro Giorgi",
      role: "Gran Prior de la Orden",
      description: "Decano de los Obispos de Buenos Aires",
    },
    {
      name: "Lugarteniente",
      title: "Gustavo Arigós",
      role: "Lugarteniente",
      description: "Máxima autoridad de la Lugartenencia Argentina",
    },
    {
      name: "Canciller",
      title: "Jorge Colombres Mármol",
      role: "Canciller",
      description: "Responsable de los asuntos administrativos",
    },
    {
      name: "Secretario",
      title: "Fernando Menéndez Behety",
      role: "Secretario",
      description: "Secretario de la Lugartenencia",
    },
    {
      name: "Tesorero",
      title: "Gerardo Rodríguez Goyena",
      role: "Tesorero",
      description: "Administra los recursos financieros",
    },
    {
      name: "Ceremoniero",
      title: "Gonzalo Roca",
      role: "Ceremoniero",
      description: "Responsable de las ceremonias",
    },
    {
      name: "Consejero",
      title: "Guillermo Leguizamón",
      role: "Consejero",
      description: "Consejero de la Lugartenencia",
    },
    {
      name: "Secretario de Comunicaciones",
      title: "Fernando G. Ferreyra",
      role: "Secretario de Comunicaciones",
      description: "Responsable de las comunicaciones",
    },
    {
      name: "Capellán Mayor",
      title: "Monseñor Víctor Pinto",
      role: "Capellán Mayor",
      description: "Guía espiritual de la Lugartenencia",
    },
  ]

  return (
    <section id="autoridades" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Autoridades
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground">
              El gobierno de la Orden y la Lugartenencia Argentina
            </p>
          </div>

          {/* Vatican Leadership */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl font-semibold text-primary text-center mb-8">
              Gran Magisterio - Vaticano
            </h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {autoridadesVaticano.map((autoridad, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-card-custom hover:shadow-elegant transition-all duration-300"
                >
                  <div className="text-center">
                    {/* Placeholder for photo */}
                    <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-elegant">
                      <span className="text-primary-foreground text-4xl">
                        👤
                      </span>
                    </div>
                    <h4 className="font-serif text-xl font-semibold text-primary mb-2">
                      {autoridad.title}
                    </h4>
                    <p className="text-secondary font-medium mb-3">
                      {autoridad.role}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {autoridad.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vice Gobernadores */}
            <div className="max-w-4xl mx-auto">
              <h4 className="font-serif text-xl font-semibold text-primary text-center mb-6">
                Vice Gobernadores Generales
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {viceGobernadores.map((vice, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-4 shadow-card-custom hover:shadow-elegant transition-all duration-300"
                  >
                    <div className="text-center">
                      <p className="font-serif text-lg font-semibold text-primary mb-1">
                        {vice.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {vice.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Argentina Leadership */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary text-center mb-8">
              Lugartenencia Argentina
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {autoridadesArgentina.map((autoridad, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-card-custom hover:shadow-elegant transition-all duration-300"
                >
                  <div className="text-center">
                    {/* Placeholder for photo */}
                    <div className="w-24 h-24 bg-gradient-gold rounded-full mx-auto mb-4 flex items-center justify-center shadow-gold">
                      <span className="text-foreground text-2xl">👤</span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {autoridad.title}
                    </h4>
                    <p className="text-secondary font-medium text-sm mb-3">
                      {autoridad.role}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {autoridad.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="text-center mt-12">
            <div className="bg-muted rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-muted-foreground italic">
                Las autoridades de la Lugartenencia Argentina son elegidas de
                acuerdo con los estatutos de la Orden y confirmadas por el Gran
                Maestro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Autoridades
