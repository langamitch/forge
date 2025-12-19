-- ============================================
-- Website Showcase Platform - Database Schema
-- ============================================

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Technologies Table
CREATE TABLE IF NOT EXISTS technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Authors Table
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Author Roles Junction Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS author_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(author_id, role_id)
);

-- Website Submissions Table
CREATE TABLE IF NOT EXISTS website_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_title TEXT NOT NULL,
  website_url TEXT NOT NULL,
  description TEXT,
  -- Categories as an array of category ids (matches front-end payload)
  categories TEXT[] DEFAULT ARRAY[]::TEXT[],
  -- Technologies as an array of technology names/ids
  technologies TEXT[] DEFAULT ARRAY[]::TEXT[],
  -- Authors stored as JSONB to preserve roles and optional websites
  authors JSONB DEFAULT '[]'::jsonb,
  image_path TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Website Categories Junction Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS website_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES website_submissions(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(website_id, category_id)
);

-- Website Technologies Junction Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS website_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES website_submissions(id) ON DELETE CASCADE,
  technology_id UUID NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(website_id, technology_id)
);

-- Website Authors Junction Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS website_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID NOT NULL REFERENCES website_submissions(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(website_id, author_id)
);

-- ============================================
-- Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_website_submissions_status ON website_submissions(status);
CREATE INDEX IF NOT EXISTS idx_website_submissions_created_at ON website_submissions(created_at DESC);
-- Indexes for faster queries on array/jsonb fields
CREATE INDEX IF NOT EXISTS idx_website_submissions_categories ON website_submissions USING GIN (categories);
CREATE INDEX IF NOT EXISTS idx_website_submissions_technologies ON website_submissions USING GIN (technologies);
CREATE INDEX IF NOT EXISTS idx_website_submissions_authors ON website_submissions USING GIN (authors);
CREATE INDEX IF NOT EXISTS idx_website_categories_website_id ON website_categories(website_id);
CREATE INDEX IF NOT EXISTS idx_website_categories_category_id ON website_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_website_technologies_website_id ON website_technologies(website_id);
CREATE INDEX IF NOT EXISTS idx_website_technologies_technology_id ON website_technologies(technology_id);
CREATE INDEX IF NOT EXISTS idx_website_authors_website_id ON website_authors(website_id);
CREATE INDEX IF NOT EXISTS idx_website_authors_author_id ON website_authors(author_id);
CREATE INDEX IF NOT EXISTS idx_author_roles_author_id ON author_roles(author_id);
CREATE INDEX IF NOT EXISTS idx_author_roles_role_id ON author_roles(role_id);

-- ============================================
-- Insert Default Categories
-- ============================================

INSERT INTO categories (category_id, label, icon) VALUES
('all', 'All', 'interests'),
('portfolio', 'Portfolio', 'work'),
('utilities', 'Utilities', 'build'),
('ai', 'AI', 'robot'),
('e-commerce', 'E-commerce', 'shopping_basket'),
('agency', 'Agency', 'apartment'),
('non-profit', 'Non-profit', 'volunteer_activism'),
('blog', 'Blog', 'article'),
('personal', 'Personal', 'person'),
('mobile-app', 'Mobile App', 'mobile_3'),
('desktop-app', 'Desktop App', 'desktop_windows'),
('development', 'Development', 'code_blocks'),
('design', 'Design', 'palette'),
('saas', 'SAAS', 'cloud'),
('finance', 'Finance', 'attach_money'),
('fashion', 'Fashion', 'checkroom'),
('health', 'Health', 'health_and_safety'),
('art', 'Art', 'brush'),
('homeware', 'Homeware', 'home'),
('music', 'Music', 'graphic_eq'),
('gaming', 'Gaming', 'sports_esports'),
('news', 'News', 'newspaper'),
('real-estate', 'Real Estate', 'home'),
('nft', 'NFT', 'currency_bitcoin'),
('sports', 'Sports', 'sports_soccer'),
('tech', 'Tech', 'memory'),
('f1', 'F1', 'sports_motorsports'),
('web3', 'Web3', 'public'),
('food-and-drinks', 'Food & Drinks', 'restaurant'),
('beauty', 'Beauty', 'spa'),
('photography', 'Photography', 'photo_camera'),
('motion', 'Motion', 'movie'),
('education', 'Education', 'school')
ON CONFLICT (category_id) DO NOTHING;

-- ============================================
-- Insert Default Technologies
-- ============================================

INSERT INTO technologies (name) VALUES
('React'),
('Next.js'),
('Tailwind CSS'),
('Node.js'),
('Firebase'),
('Supabase'),
('Three.js'),
('Vue.js'),
('Svelte'),
('Framer Motion'),
('Other')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Insert Default Roles
-- ============================================

INSERT INTO roles (name) VALUES
('Developer'),
('Frontend Developer'),
('Backend Developer'),
('Fullstack Developer'),
('Designer'),
('UX Designer'),
('UI Designer'),
('Motion Designer'),
('Creative Developer'),
('Founder'),
('Contributor'),
('Agency'),
('Art Director'),
('Other')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE website_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE author_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Only public read access to approved submissions
CREATE POLICY "Allow public read access to approved submissions"
  ON website_submissions
  FOR SELECT
  USING (status = 'approved');

-- Allow public (anyone) to insert submissions
CREATE POLICY "Allow public insert into website_submissions"
  ON website_submissions
  FOR INSERT
  WITH CHECK (true);

-- Allow only authenticated users to delete submissions
CREATE POLICY "Allow authenticated users to delete submissions"
  ON website_submissions
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to read all submissions (including pending)
CREATE POLICY "Allow authenticated users to read all submissions"
  ON website_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow public to read only approved submissions
CREATE POLICY "Allow public read approved submissions"
  ON website_submissions
  FOR SELECT
  USING (status = 'approved');

-- Public read access to junction tables
CREATE POLICY "Allow public read access to website_categories"
  ON website_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to website_technologies"
  ON website_technologies
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to website_authors"
  ON website_authors
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to authors"
  ON authors
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to author_roles"
  ON author_roles
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to categories"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to technologies"
  ON technologies
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to roles"
  ON roles
  FOR SELECT
  USING (true);
