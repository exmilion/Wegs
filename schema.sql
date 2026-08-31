-- ============================================
-- Sat4Life — Esquema de base de datos (Supabase)
-- ============================================

-- Tabla de pases satelitales
CREATE TABLE IF NOT EXISTS public.passes (
  id          SERIAL PRIMARY KEY,
  satellite   TEXT NOT NULL,
  timestamp   TIMESTAMPTZ NOT NULL,
  folder_name TEXT,
  png_count   INT DEFAULT 0,
  raw_count   INT DEFAULT 0,
  filled_count INT DEFAULT 0,
  status      TEXT DEFAULT 'completed',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de imágenes por pase
CREATE TABLE IF NOT EXISTS public.pass_images (
  id            SERIAL PRIMARY KEY,
  pass_id       INT NOT NULL REFERENCES public.passes(id) ON DELETE CASCADE,
  type          TEXT NOT NULL,
  label         TEXT,
  image_url     TEXT,
  thumbnail_url TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas por pase
CREATE INDEX IF NOT EXISTS idx_pass_images_pass_id
  ON public.pass_images(pass_id);

-- Habilitar Row Level Security
ALTER TABLE public.passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pass_images ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Lectura publica de pases"
  ON public.passes FOR SELECT USING (true);

CREATE POLICY "Lectura publica de imagenes"
  ON public.pass_images FOR SELECT USING (true);

-- ============================================
-- Storage: crear bucket manualmente en dashboard
-- Nombre: satellite-images
-- Público: true
-- Política: SELECT para todos
-- ============================================
