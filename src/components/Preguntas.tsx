import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Preguntas = () => {
  return (
    <section id="preguntas" className="py-20 px-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Las siguientes preguntas son las formuladas con mayor frecuencia. Procuramos
            responder a cada una de ellas de un modo claro y concreto; sin perjuicio de ello, puede
            contactarnos mediante el buzón de correo para mayor información.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left hover:no-underline">
              ¿La Orden del Santo Sepulcro forma parte de la Iglesia Católica?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              La Orden de Caballería del Santo Sepulcro de Jerusalén, es una muy antigua Orden
              Pontificia, es decir, aprobada por el Papa y en el ámbito de su dependencia directa. Un
              ejemplo, es que el Papa San Pío X, fue su Gran Maestre. En la actualidad, depende del
              Papa a través del Gran Magisterio que está conformado por un Cardenal, un Gobernador
              Central (Laico) y un Consejo. Además, el cruzamiento de caballero conlleva el
              juramento –entre otros- de fidelidad al Papa y a la doctrina de la Iglesia configurando de
              este modo un esencial rasgo de unidad.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left hover:no-underline">
              ¿Cómo ayuda la Orden a la Iglesia?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  En primer lugar con su oración toda vez que los Caballeros y las Damas se comprometen a vivir la vida cristiana y parte muy importante de ella es la oración.
                </li>
                <li>
                  En segundo lugar con el ejemplo de la vida cristiana en el ámbito de la familia, trabajo, amistad, preocupaciones, enfermedades y alegrías, en fin, en todos los órdenes del cotidiana.
                </li>
                <li>
                  En tercer lugar gracias a las contribuciones económicas que cada una de las Lugartenencias realizan para el sostenimiento de la comunidad católica de Tierra Santa, especialmente de las iglesias, escuelas y hospitales.
                </li>
              </ul>
              <p>
                En efecto, la Orden del Santo Sepulcro coordina la ayuda global enviada al Patriarcado latino que cuenta con 60 parroquias, unas 40 escuelas y más de 150.000 fieles, en Jordania, Palestina, Israel y Chipre. Las instituciones del Patriarcado, tales como parroquias y escuelas particularmente, son el objeto esencial de esta solidaridad material que también concierne, en menor medida a proyectos precisos de restauración o de construcción siempre validados en Roma por el Gran Magisterio. El presupuesto del conjunto se acerca a los 10 millones de euros cada año.
              </p>
              <p>
                En el marco de la Reunión de las Obras de ayuda a las Iglesias Orientales, la Orden del Santo Sepulcro asume también otros proyectos en territorios bíblicos, como Egipto o Líbano.
              </p>
              <p>
                Por otra parte los miembros de la Orden, animados a ir regularmente de peregrinación a Tierra Santa aportan un apoyo moral importante a los cristianos de esta región del mundo que en un clima, de variadas crisis económicas y políticas procuran ser actores de la cultura del encuentro para el servicio de la paz.
              </p>
              <p>
                Caballeros y Damas desean formar parte de la vida de sus respectivas diócesis, respondiendo así, a las directivas del Gran Maestre, particularmente para responder a las necesidades de los más pobres por ejemplo en lo concerniente a la acogida de personas refugiadas y emigrantes.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left hover:no-underline">
              Los integrantes de la Orden procuran vivir la vida cristiana ¿qué diferencia hay con el resto de los católicos?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Cada católico es responsable de su correspondencia a la Gracia. La
              Orden se presenta como un ámbito apropiado para descubrir el apoyo necesario
              para vivir las exigencias de la vida cristiana: formación doctrinal, consejo, piedad
              rectitud de vida y ejemplo.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left hover:no-underline">
              ¿La Orden también está integrada por mujeres?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              La Orden no es exclusiva para varones. Las mujeres se incorporan como Damas de la
              Orden con los mismos derechos y obligaciones que los Caballeros, pueden ocupar cargos en el Consejo e incluso ser designadas como Lugartenientes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Preguntas;
