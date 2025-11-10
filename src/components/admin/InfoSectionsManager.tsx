import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, FileText, Eye, EyeOff } from 'lucide-react';

interface InfoSection {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  category: string;
  image_urls: string[];
  is_active: boolean;
  created_at: string;
}

const InfoSectionsManager = () => {
  const [sections, setSections] = useState<InfoSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingSection, setEditingSection] = useState<InfoSection | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'gran_magisterio',
    image_urls: ['', '', '', '', ''],
    is_active: true
  });
  const { toast } = useToast();

  const categories = [
    { value: 'gran_magisterio', label: 'Gran Magisterio' },
    { value: 'patriarcado_latino', label: 'Patriarcado Latino' },
    { value: 'lugartenencia_argentina', label: 'Lugartenencia Argentina' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'actividades', label: 'Actividades' },
    { value: 'beatificacion', label: 'Beatificación' },
    { value: 'memorias', label: 'Memorias' },
    { value: 'noticias_tierra_santa', label: 'Noticias Tierra Santa' },
    { value: 'formacion_doctrinal', label: 'Formación Doctrinal' }
  ];

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('info_sections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las secciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingSection) {
        // Update existing section
        // Filter out empty strings from image_urls
        const filteredImageUrls = formData.image_urls.filter(url => url.trim() !== '');

        const { error } = await supabase
          .from('info_sections')
          .update({
            title: formData.title,
            description: formData.description || null,
            content: formData.content || null,
            category: formData.category,
            image_urls: filteredImageUrls,
            is_active: formData.is_active
          })
          .eq('id', editingSection.id);

        if (error) throw error;

        toast({
          title: "Sección actualizada",
          description: "La sección se ha actualizado correctamente",
        });
      } else {
        // Create new section
        // Filter out empty strings from image_urls
        const filteredImageUrls = formData.image_urls.filter(url => url.trim() !== '');

        const { error } = await supabase
          .from('info_sections')
          .insert({
            title: formData.title,
            description: formData.description || null,
            content: formData.content || null,
            category: formData.category,
            image_urls: filteredImageUrls,
            is_active: formData.is_active
          });

        if (error) throw error;

        toast({
          title: "Sección agregada",
          description: "La sección se ha agregado correctamente",
        });
      }

      await fetchSections();
      resetForm();
      setShowDialog(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al procesar la sección",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta sección?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('info_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sección eliminada",
        description: "La sección se ha eliminado correctamente",
      });

      await fetchSections();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la sección",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('info_sections')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      await fetchSections();
      
      toast({
        title: "Estado actualizado",
        description: `La sección se ha ${!isActive ? 'activado' : 'desactivado'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: 'gran_magisterio',
      image_urls: ['', '', '', '', ''],
      is_active: true
    });
    setEditingSection(null);
  };

  const openEditDialog = (section: InfoSection) => {
    setEditingSection(section);
    // Ensure we always have exactly 5 slots for images
    const imageUrlsArray = [...(section.image_urls || []), '', '', '', '', ''].slice(0, 5);
    setFormData({
      title: section.title,
      description: section.description || '',
      content: section.content || '',
      category: section.category,
      image_urls: imageUrlsArray,
      is_active: section.is_active
    });
    setShowDialog(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">
          Gestión de Información
        </h2>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Sección
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSection ? 'Editar Sección' : 'Agregar Nueva Sección'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Título de la sección"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción Corta</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción que aparece en la tarjeta"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenido Completo</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Contenido completo de la página"
                  rows={8}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">URLs de Imágenes (hasta 5)</Label>
                <p className="text-sm text-muted-foreground">Puedes agregar hasta 5 imágenes para este evento</p>
                {formData.image_urls.map((url, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`image_url_${index}`}>
                      Imagen {index + 1} {index === 0 ? '(Principal)' : '(opcional)'}
                    </Label>
                    <Input
                      id={`image_url_${index}`}
                      value={url}
                      onChange={(e) => {
                        const newUrls = [...formData.image_urls];
                        newUrls[index] = e.target.value;
                        setFormData({ ...formData, image_urls: newUrls });
                      }}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Sección activa</Label>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? 'Guardando...' : (editingSection ? 'Actualizar' : 'Agregar')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {sections.length === 0 ? (
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            No hay secciones de información. Agrega la primera sección usando el botón de arriba.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Card key={section.id} className={`${!section.is_active ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-primary">{section.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {categories.find(c => c.value === section.category)?.label}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleActive(section.id, section.is_active)}
                    >
                      {section.is_active ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {section.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {section.description.length > 150 
                      ? `${section.description.substring(0, 150)}...` 
                      : section.description
                    }
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${
                    section.is_active 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {section.is_active ? 'Activa' : 'Inactiva'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(section)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(section.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoSectionsManager;