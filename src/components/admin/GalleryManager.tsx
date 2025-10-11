import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, Edit, Trash2, Image } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  created_at: string;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'ceremonias', label: 'Ceremonias' },
    { value: 'peregrinaciones', label: 'Peregrinaciones' },
    { value: 'eventos', label: 'Eventos' },
    { value: 'autoridades', label: 'Autoridades' },
    { value: 'actividades', label: 'Actividades' }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las imágenes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = editingImage?.image_url || '';

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      if (editingImage) {
        // Update existing image
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title: formData.title,
            description: formData.description || null,
            category: formData.category,
            image_url: imageUrl
          })
          .eq('id', editingImage.id);

        if (error) throw error;

        toast({
          title: "Imagen actualizada",
          description: "La imagen se ha actualizado correctamente",
        });
      } else {
        // Create new image
        if (!selectedFile) {
          throw new Error('Debes seleccionar una imagen');
        }

        const { error } = await supabase
          .from('gallery_images')
          .insert({
            title: formData.title,
            description: formData.description || null,
            category: formData.category,
            image_url: imageUrl
          });

        if (error) throw error;

        toast({
          title: "Imagen agregada",
          description: "La imagen se ha agregado correctamente",
        });
      }

      await fetchImages();
      resetForm();
      setShowDialog(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al procesar la imagen",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Imagen eliminada",
        description: "La imagen se ha eliminado correctamente",
      });

      await fetchImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la imagen",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'general' });
    setSelectedFile(null);
    setEditingImage(null);
  };

  const openEditDialog = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || '',
      category: image.category || 'general'
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
          Gestión de Galería
        </h2>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Imagen
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingImage ? 'Editar Imagen' : 'Agregar Nueva Imagen'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Título de la imagen"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripción opcional"
                  rows={3}
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

              <div className="space-y-2">
                <Label htmlFor="image">
                  {editingImage ? 'Nueva Imagen (opcional)' : 'Imagen'}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  required={!editingImage}
                />
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
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    'Procesando...'
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      {editingImage ? 'Actualizar' : 'Agregar'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {images.length === 0 ? (
        <Alert>
          <Image className="h-4 w-4" />
          <AlertDescription>
            No hay imágenes en la galería. Agrega la primera imagen usando el botón de arriba.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-primary mb-2">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {image.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-muted rounded">
                    {categories.find(c => c.value === image.category)?.label || 'General'}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(image)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(image.id)}
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

export default GalleryManager;