import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Camera, Plus, Database, ChevronLeft, ChevronRight, Images } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface GalleryImage {
  id: string
  title: string
  description: string | null
  image_urls: string[]
  category: string | null
  created_at: string
}

const Galeria = () => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
                  onClick={() => {
                    setSelectedImage(image);
                    setCurrentImageIndex(0);
                  }}
                  className="bg-card rounded-2xl overflow-hidden shadow-card-custom hover:shadow-elegant transition-all duration-300 cursor-pointer group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={image.image_urls && image.image_urls.length > 0 ? image.image_urls[0] : ''}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Indicator for multiple images */}
                    {image.image_urls && image.image_urls.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                        <Images className="h-3 w-3" />
                        <span>{image.image_urls.length}</span>
                      </div>
                    )}
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
        </div>
      </div>

      {/* Image Detail Dialog with Carousel */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedImage(null);
            setCurrentImageIndex(0);
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary">
              {selectedImage?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedImage && selectedImage.image_urls && selectedImage.image_urls.length > 0 && (
              <>
                {selectedImage.image_urls.length === 1 ? (
                  // Single image
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <img
                      src={selectedImage.image_urls[0]}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  // Carousel for multiple images
                  <div className="space-y-3">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden group bg-muted">
                      <img
                        src={selectedImage.image_urls[currentImageIndex]}
                        alt={`${selectedImage.title} - ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />

                      {/* Navigation Buttons */}
                      <button
                        onClick={() => setCurrentImageIndex((prev) =>
                          prev === 0 ? selectedImage.image_urls.length - 1 : prev - 1
                        )}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>

                      <button
                        onClick={() => setCurrentImageIndex((prev) =>
                          prev === selectedImage.image_urls.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedImage.image_urls.length}
                      </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                      {selectedImage.image_urls.map((imageUrl, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                            currentImageIndex === index
                              ? 'ring-4 ring-primary shadow-lg scale-105'
                              : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imageUrl}
                            alt={`Miniatura ${index + 1}`}
                            className="w-16 h-16 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
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
