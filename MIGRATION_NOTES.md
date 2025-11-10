# Notas de Migración - Múltiples Imágenes por Evento

## Cambios Realizados

### Base de Datos
Se ha actualizado la tabla `info_sections` para soportar hasta 5 imágenes por evento:

- **Antes**: Campo `image_url` (TEXT) - Solo una imagen
- **Después**: Campo `image_urls` (TEXT[]) - Hasta 5 imágenes

### Migración
Archivo: `supabase/migrations/20250901000000_add_multiple_images_support.sql`

La migración:
1. Crea una nueva columna `image_urls` como array de texto
2. Migra los datos existentes de `image_url` a `image_urls`
3. Elimina la columna antigua `image_url`
4. Agrega una restricción para permitir máximo 5 imágenes

### Componentes Actualizados

#### 1. InfoSectionsManager.tsx (Admin)
- Ahora muestra 5 campos de entrada para imágenes
- La primera imagen se marca como "Principal"
- Las imágenes vacías se filtran automáticamente antes de guardar
- Interfaz actualizada para manejar arrays de URLs

#### 2. InfoSections.tsx
- Muestra la primera imagen (principal) en la tarjeta del evento
- Actualizado para usar `image_urls[0]` en lugar de `image_url`

#### 3. InfoDetail.tsx
- Vista mejorada para mostrar múltiples imágenes
- Si hay una sola imagen, la muestra en tamaño completo
- Si hay múltiples imágenes:
  - Primera imagen se muestra grande como principal
  - Las demás se muestran en una cuadrícula responsive debajo

#### 4. types.ts
- Actualizado el tipo de `info_sections` para reflejar `image_urls: string[]`

## Cómo Aplicar la Migración

### Opción 1: Desde Supabase Dashboard
1. Ve a SQL Editor en tu proyecto de Supabase
2. Copia el contenido de `supabase/migrations/20250901000000_add_multiple_images_support.sql`
3. Ejecuta el script

### Opción 2: Usando Supabase CLI
```bash
supabase db push
```

## Uso en la Interfaz Admin

1. Ve a la sección de administración
2. Al crear o editar un evento, verás 5 campos para imágenes
3. La primera imagen es la principal (obligatoria si quieres mostrar imágenes)
4. Las otras 4 son opcionales
5. Ingresa las URLs de las imágenes y guarda

## Notas Importantes

- Los eventos existentes se migran automáticamente
- Si un evento tenía una imagen, ahora estará en la primera posición del array
- No es necesario actualizar eventos existentes manualmente
- El límite de 5 imágenes está protegido a nivel de base de datos
