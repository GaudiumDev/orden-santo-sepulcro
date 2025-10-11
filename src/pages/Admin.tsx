import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminHeader from '@/components/admin/AdminHeader';
import GalleryManager from '@/components/admin/GalleryManager';
import InfoSectionsManager from '@/components/admin/InfoSectionsManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Images, FileText } from 'lucide-react';

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">
            Gestiona el contenido del sitio web de la Orden
          </p>
        </div>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="gallery" className="flex items-center space-x-2">
              <Images className="h-4 w-4" />
              <span>Galería</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Información</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="info">
            <InfoSectionsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;