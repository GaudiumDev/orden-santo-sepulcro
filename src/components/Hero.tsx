import { Button } from "@/components/ui/button"
import heroImage from "@/assets/hero-jerusalem.jpg"

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Iglesia del Santo Sepulcro en Jerusalén"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-elegant">
            <span className="text-primary-foreground text-3xl">✠</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
            Orden De Caballeria del
            <span className="block text-primary">Santo Sepulcro</span>
            <span className="block text-2xl md:text-3xl font-normal mt-2">
              de Jerusalén
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl  font-light italic">
            Lugartenencia Argentina - 1888
          </p>
        </div>

        <div className="space-y-6">
          {/* <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            Una institución milenaria al servicio de la Iglesia Católica y la
            Tierra Santa, promoviendo la fe cristiana y apoyando a los
            cristianos de Jerusalén.
          </p>  */}
          <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            El primer objetivo de nuestra Orden es ayudar a sus miembros a vivir
            mejor su fe cristiana y crecer en santidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("#la-orden")}
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-3 text-lg shadow-elegant transition-all duration-300"
            >
              Conocer la Orden
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#historia")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg transition-all duration-300"
            >
              Nuestra Historia
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
