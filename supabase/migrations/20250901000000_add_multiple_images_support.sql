-- Add support for multiple images per info section (up to 5 images)
-- Change image_url from TEXT to TEXT[] array

-- First, create a backup column with existing data converted to array
ALTER TABLE public.info_sections
ADD COLUMN image_urls TEXT[];

-- Migrate existing single image_url to array format
UPDATE public.info_sections
SET image_urls = CASE
  WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
  ELSE ARRAY[]::TEXT[]
END;

-- Drop the old column
ALTER TABLE public.info_sections
DROP COLUMN image_url;

-- Rename new column to image_urls for clarity
-- (already named correctly)

-- Add a check constraint to ensure max 5 images
ALTER TABLE public.info_sections
ADD CONSTRAINT max_5_images CHECK (array_length(image_urls, 1) IS NULL OR array_length(image_urls, 1) <= 5);

-- Add comment for documentation
COMMENT ON COLUMN public.info_sections.image_urls IS 'Array of image URLs, maximum 5 images allowed per section';
