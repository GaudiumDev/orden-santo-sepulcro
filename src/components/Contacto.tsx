import { Mail, MapPin, Phone } from "lucide-react"

const Contacto = () => {
  return (
    <section id="contacto" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contacto
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground">
              Ponerse en contacto con la Lugartenencia Argentina
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                  Información de Contacto
                </h3>

                {/* Email */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-card rounded-lg shadow-card-custom hover:shadow-elegant transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Correo Electrónico
                    </p>
                    <a
                      href="mailto:contacto@ordensantosepulcro.org.ar"
                      className="text-primary font-medium hover:text-primary-light transition-colors"
                    >
                      contacto@ordensantosepulcro.org.ar
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-card rounded-lg shadow-card-custom">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="text-foreground font-medium">
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-card-custom">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-foreground font-medium">
                      +54 9 11 3032-2727
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="bg-card rounded-2xl p-8 shadow-elegant">
              <h3 className="font-serif text-2xl font-semibold text-primary mb-6">
                Sobre las Consultas
              </h3>

              <div className="space-y-4 text-foreground">
                <p className="leading-relaxed">
                  Para consultas sobre membresía, actividades de la Orden o
                  información sobre nuestras obras en Tierra Santa, no dude en
                  contactarnos.
                </p>

                <p className="leading-relaxed">
                  La Lugartenencia Argentina está disponible para atender
                  inquietudes relacionadas con:
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Proceso de admisión a la Orden</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Actividades y eventos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Donaciones y obras caritativas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Información histórica e institucional</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm italic text-center">
                  "Nos comprometemos a responder todas las consultas con la
                  dignidad y respeto que caracterizan a nuestra institución."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
