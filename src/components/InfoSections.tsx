import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InfoSection {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

const InfoSections = () => {
  const [sections, setSections] = useState<InfoSection[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('info_sections')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching info sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (section: InfoSection) => {
    navigate(`/informacion/${section.category}/${section.id}`);
  };

  if (loading) {
    return (
      <section id="informacion" className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Más Información de Interés
              </h2>
              <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            </div>
            
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-card-custom">
                  <div className="h-48 bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sections.length === 0) {
    return (
      <section id="informacion" className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Más Información de Interés
              </h2>
              <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            </div>
            
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                Contenido en Preparación
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Pronto publicaremos información adicional de interés sobre la Orden.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="informacion" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Más Información de Interés
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground">
              Descubre más sobre la historia, actividades y misión de la Orden
            </p>
          </div>

          {/* Sections Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Card key={section.id} className="overflow-hidden shadow-card-custom hover:shadow-elegant transition-all duration-300 group">
                {/* Image */}
                <div className="h-48 relative overflow-hidden">
                  {section.image_url ? (
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-primary/50" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-primary mb-3 group-hover:text-primary-light transition-colors">
                    {section.title}
                  </h3>
                  
                  {section.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {section.description}
                    </p>
                  )}
                  
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => handleReadMore(section)}
                  >
                    Seguir Leyendo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSections;