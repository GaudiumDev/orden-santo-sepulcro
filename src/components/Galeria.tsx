import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Camera, Plus, Database } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface GalleryImage {
  id: string
  title: string
  description: string | null
  image_url: string
  category: string | null
  created_at: string
}

const Galeria = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error("Error fetching gallery images:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Galería
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground">
              Momentos destacados de las actividades de la Orden
            </p>
          </div>

          {/* Backend Integration Notice */}
          {/* <div className="bg-muted rounded-2xl p-8 mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <Database className="h-8 w-8 text-primary mr-3" />
              <h3 className="font-serif text-2xl font-semibold text-primary">
                Galería Dinámica
              </h3>
            </div>
            <p className="text-foreground text-lg mb-6 max-w-2xl mx-auto">
              Para implementar una galería completamente funcional donde se
              puedan subir y gestionar imágenes de eventos, necesitamos conectar
              el sitio con Supabase, nuestro backend integrado.
            </p>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <Plus className="h-5 w-5 text-secondary" />
                <span>Subir fotos de eventos y actividades</span>
              </div>
              <div className="flex items-center space-x-3">
                <Camera className="h-5 w-5 text-secondary" />
                <span>Organizar imágenes por categorías</span>
              </div>
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-secondary" />
                <span>Gestión administrativa de contenido</span>
              </div>
            </div>
          </div> */}

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {loading ? (
              // Loading placeholders
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl overflow-hidden shadow-card-custom"
                >
                  <div className="h-48 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : images.length > 0 ? (
              // Actual images
              images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="bg-card rounded-2xl overflow-hidden shadow-card-custom hover:shadow-elegant transition-all duration-300 cursor-pointer"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                      {image.title}
                    </h4>
                    {image.description && (
                      <p className="text-muted-foreground text-sm">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Empty state
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Camera className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                  Galería en Preparación
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Pronto compartiremos las primeras imágenes de nuestras
                  actividades y eventos.
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          {/* <div className="text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 text-center shadow-elegant">
              <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-4">
                ¿Listo para activar la galería?
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Conecta tu proyecto con Supabase para habilitar la funcionalidad completa 
                de gestión de imágenes y contenido dinámico.
              </p>
              <Button 
                variant="secondary"
                className="bg-card text-foreground hover:bg-card/90 px-8 py-3 shadow-gold"
              >
                <Database className="h-5 w-5 mr-2" />
                Configurar Backend
              </Button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Image Detail Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary">
              {selectedImage?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={selectedImage?.image_url}
                alt={selectedImage?.title}
                className="w-full h-full object-contain"
              />
            </div>
            {selectedImage?.description && (
              <p className="text-foreground text-lg">
                {selectedImage.description}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Galeria
