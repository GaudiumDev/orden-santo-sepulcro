const Autoridades = () => {
  const autoridades = [
    {
      name: "Gran Maestro",
      title: "Su Eminencia Cardinal Fernando Filoni",
      role: "Gran Maestro de la Orden",
      description: "Nombrado por Su Santidad el Papa Francisco"
    },
    {
      name: "Lugarteniente General",
      title: "Leonardo Visconti di Modrone",
      role: "Conde, Lugarteniente General",
      description: "Representa al Gran Maestro en el gobierno de la Orden"
    },
    {
      name: "Lugarteniente Argentina",
      title: "[Nombre del Lugarteniente]",
      role: "Lugarteniente para Argentina",
      description: "Responsable de la Lugartenencia Argentina"
    },
    {
      name: "Vice-Lugarteniente",
      title: "[Nombre del Vice-Lugarteniente]", 
      role: "Vice-Lugarteniente Argentina",
      description: "Asiste al Lugarteniente en sus funciones"
    },
    {
      name: "Canciller",
      title: "[Nombre del Canciller]",
      role: "Canciller de la Lugartenencia",
      description: "Responsable de los asuntos administrativos"
    },
    {
      name: "Tesorero",
      title: "[Nombre del Tesorero]",
      role: "Tesorero de la Lugartenencia",
      description: "Administra los recursos financieros"
    }
  ];

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
              Autoridades en el Vaticano
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {autoridades.slice(0, 2).map((autoridad, index) => (
                <div key={index} className="bg-card rounded-2xl p-8 shadow-card-custom hover:shadow-elegant transition-all duration-300">
                  <div className="text-center">
                    {/* Placeholder for photo */}
                    <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-elegant">
                      <span className="text-primary-foreground text-4xl">👤</span>
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
          </div>

          {/* Argentina Leadership */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary text-center mb-8">
              Lugartenencia Argentina
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {autoridades.slice(2).map((autoridad, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-card-custom hover:shadow-elegant transition-all duration-300">
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
                Las autoridades de la Lugartenencia Argentina son elegidas de acuerdo con los 
                estatutos de la Orden y confirmadas por el Gran Maestro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Autoridades;