import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { ArrowLeft, FileText } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface InfoSection {
  id: string
  title: string
  description: string | null
  content: string | null
  category: string
  image_urls: string[]
  is_active: boolean
  created_at: string
}

const InfoDetail = () => {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const [section, setSection] = useState<InfoSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (id) {
      fetchSection()
    }
  }, [id])

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from("info_sections")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setSection(data)
      }
    } catch (error) {
      console.error("Error fetching section:", error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-8 w-1/4"></div>
              <div className="h-12 bg-muted rounded mb-6"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !section) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-primary mb-4">
              Información No Encontrada
            </h1>
            <p className="text-muted-foreground mb-8">
              La información que buscas no existe o no está disponible.
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4  mr-2" />
              Volver al sitio
            </Button>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              {section.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-gold mb-8"></div>

            {section.description && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            )}
          </div>

          {/* Image Gallery */}
          {section.image_urls && section.image_urls.length > 0 && (
            <div className="mb-12">
              {section.image_urls.length === 1 ? (
                // Single image
                <div className="rounded-2xl overflow-hidden shadow-elegant">
                  <img
                    src={section.image_urls[0]}
                    alt={section.title}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              ) : (
                // Multiple images grid
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-elegant">
                    <img
                      src={section.image_urls[0]}
                      alt={`${section.title} - Principal`}
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                  {section.image_urls.length > 1 && (
                    <div className={`grid ${section.image_urls.length === 2 ? 'grid-cols-1' : section.image_urls.length === 3 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                      {section.image_urls.slice(1).map((imageUrl, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-card-custom hover:shadow-elegant transition-all duration-300">
                          <img
                            src={imageUrl}
                            alt={`${section.title} - ${index + 2}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {section.content ? (
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  El contenido detallado estará disponible próximamente.
                </p>
              </div>
            )}
          </div>

          {/* Back to Top */}
          <div className="mt-16 text-center">
            <a
              href="/"
              className="inline-block px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/80"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default InfoDetail
