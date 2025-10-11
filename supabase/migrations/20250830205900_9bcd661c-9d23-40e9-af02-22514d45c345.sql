-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery_images
CREATE POLICY "Gallery images are viewable by everyone" 
ON public.gallery_images 
FOR SELECT 
USING (true);

CREATE POLICY "Only authenticated users can insert gallery images" 
ON public.gallery_images 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can update gallery images" 
ON public.gallery_images 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can delete gallery images" 
ON public.gallery_images 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create info_sections table
CREATE TABLE public.info_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.info_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for info_sections
CREATE POLICY "Info sections are viewable by everyone" 
ON public.info_sections 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only authenticated users can manage info sections" 
ON public.info_sections 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Create policies for gallery bucket
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update gallery images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete gallery images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery' AND auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_info_sections_updated_at
  BEFORE UPDATE ON public.info_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();