-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum para roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'coordenador', 'membro', 'visitante');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enum para status de usuário
DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('ativo', 'pendente', 'inativo', 'rejeitado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tabela de paróquias
CREATE TABLE IF NOT EXISTS paroquias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nome TEXT NOT NULL,
  endereco TEXT,
  telefone TEXT,
  email TEXT,
  parocho TEXT,
  diocese TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de grupos
CREATE TABLE IF NOT EXISTS grupos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  leader_id UUID,
  max_members INTEGER DEFAULT 15,
  ativo BOOLEAN DEFAULT true,
  paroquia_id UUID REFERENCES paroquias(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de usuários (estende auth.users)
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role user_role DEFAULT 'visitante',
  status user_status DEFAULT 'pendente',
  grupo_id UUID REFERENCES grupos(id),
  paroquia_id UUID REFERENCES paroquias(id),
  phone TEXT,
  bio TEXT,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES usuarios(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de membros (para compatibilidade)
CREATE TABLE IF NOT EXISTS membros (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES usuarios(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  role TEXT NOT NULL,
  group_id UUID REFERENCES grupos(id),
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de relacionamento grupo-usuário
CREATE TABLE IF NOT EXISTS grupo_usuarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
  papel TEXT DEFAULT 'membro' CHECK (papel IN ('membro', 'coordenador', 'vice-coordenador')),
  data_entrada TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, grupo_id)
);

-- Tabela de pedidos de oração
CREATE TABLE IF NOT EXISTS oracoes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'Normal' CHECK (priority IN ('Normal', 'Urgente')),
  author_id UUID REFERENCES usuarios(id),
  author_name TEXT NOT NULL,
  grupo_id UUID REFERENCES grupos(id),
  prayer_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de relacionamento usuário-oração (para saber quem está orando)
CREATE TABLE IF NOT EXISTS oracoes_usuario (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  oracao_id UUID REFERENCES oracoes(id) ON DELETE CASCADE,
  tipo TEXT DEFAULT 'orando' CHECK (tipo IN ('orando', 'favorito')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, oracao_id, tipo)
);

-- Tabela de jornadas
CREATE TABLE IF NOT EXISTS jornadas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  total_modules INTEGER DEFAULT 1,
  category TEXT,
  level TEXT DEFAULT 'Iniciante',
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de progresso de jornadas
CREATE TABLE IF NOT EXISTS jornadas_usuario (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES usuarios(id),
  jornada_id UUID REFERENCES jornadas(id),
  etapa_atual INTEGER DEFAULT 1,
  status TEXT DEFAULT 'ativa' CHECK (status IN ('ativa', 'concluida', 'pausada')),
  progresso INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, jornada_id)
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER,
  category TEXT,
  status TEXT DEFAULT 'confirmado',
  organizer_id UUID REFERENCES usuarios(id),
  grupo_id UUID REFERENCES grupos(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs de atividades
CREATE TABLE IF NOT EXISTS logs_atividades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES usuarios(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
DROP TRIGGER IF EXISTS update_membros_updated_at ON membros;
DROP TRIGGER IF EXISTS update_oracoes_updated_at ON oracoes;
DROP TRIGGER IF EXISTS update_jornadas_usuario_updated_at ON jornadas_usuario;
DROP TRIGGER IF EXISTS update_eventos_updated_at ON eventos;
DROP TRIGGER IF EXISTS update_grupos_updated_at ON grupos;
DROP TRIGGER IF EXISTS update_paroquias_updated_at ON paroquias;

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_membros_updated_at BEFORE UPDATE ON membros FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_oracoes_updated_at BEFORE UPDATE ON oracoes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jornadas_usuario_updated_at BEFORE UPDATE ON jornadas_usuario FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_grupos_updated_at BEFORE UPDATE ON grupos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_paroquias_updated_at BEFORE UPDATE ON paroquias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para criar usuário automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, name, email, role, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'visitante',
    'pendente'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar usuário automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para verificar se usuário é admin (sem RLS)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = user_id AND role = 'admin' AND status = 'ativo'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para verificar se usuário é coordenador (sem RLS)
CREATE OR REPLACE FUNCTION public.is_coordenador(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = user_id AND role = 'coordenador' AND status = 'ativo'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Limpar políticas existentes
DROP POLICY IF EXISTS "Usuários podem ver próprio perfil" ON usuarios;
DROP POLICY IF EXISTS "Admins podem ver todos usuários" ON usuarios;
DROP POLICY IF EXISTS "Coordenadores podem ver membros do grupo" ON usuarios;
DROP POLICY IF EXISTS "Todos podem ver membros" ON membros;
DROP POLICY IF EXISTS "Admins e coordenadores podem inserir membros" ON membros;
DROP POLICY IF EXISTS "Admins e coordenadores podem atualizar membros" ON membros;
DROP POLICY IF EXISTS "Admins podem deletar membros" ON membros;
DROP POLICY IF EXISTS "Ver orações públicas" ON oracoes;
DROP POLICY IF EXISTS "Ver orações do próprio grupo" ON oracoes;
DROP POLICY IF EXISTS "Membros podem criar orações" ON oracoes;
DROP POLICY IF EXISTS "Usuários podem ver suas próprias orações" ON oracoes_usuario;
DROP POLICY IF EXISTS "Usuários podem inserir suas próprias orações" ON oracoes_usuario;
DROP POLICY IF EXISTS "Usuários podem deletar suas próprias orações" ON oracoes_usuario;

-- RLS (Row Level Security) Policies
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE membros ENABLE ROW LEVEL SECURITY;
ALTER TABLE oracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE oracoes_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupo_usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas simplificadas para usuarios
CREATE POLICY "usuarios_select_policy" ON usuarios FOR SELECT USING (
  auth.uid() = id OR 
  public.is_admin(auth.uid()) OR
  public.is_coordenador(auth.uid())
);

CREATE POLICY "usuarios_insert_policy" ON usuarios FOR INSERT WITH CHECK (
  auth.uid() = id OR public.is_admin(auth.uid())
);

CREATE POLICY "usuarios_update_policy" ON usuarios FOR UPDATE USING (
  auth.uid() = id OR public.is_admin(auth.uid())
);

-- Políticas para membros (compatibilidade)
CREATE POLICY "membros_select_policy" ON membros FOR SELECT USING (true);

CREATE POLICY "membros_insert_policy" ON membros FOR INSERT WITH CHECK (
  public.is_admin(auth.uid()) OR public.is_coordenador(auth.uid())
);

CREATE POLICY "membros_update_policy" ON membros FOR UPDATE USING (
  public.is_admin(auth.uid()) OR public.is_coordenador(auth.uid())
);

CREATE POLICY "membros_delete_policy" ON membros FOR DELETE USING (
  public.is_admin(auth.uid())
);

-- Políticas para oracoes
CREATE POLICY "oracoes_select_policy" ON oracoes FOR SELECT USING (
  is_public = true OR 
  author_id = auth.uid() OR
  public.is_admin(auth.uid())
);

CREATE POLICY "oracoes_insert_policy" ON oracoes FOR INSERT WITH CHECK (
  author_id = auth.uid()
);

CREATE POLICY "oracoes_update_policy" ON oracoes FOR UPDATE USING (
  author_id = auth.uid() OR public.is_admin(auth.uid())
);

-- Políticas para oracoes_usuario
CREATE POLICY "oracoes_usuario_select_policy" ON oracoes_usuario FOR SELECT USING (
  user_id = auth.uid()
);

CREATE POLICY "oracoes_usuario_insert_policy" ON oracoes_usuario FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

CREATE POLICY "oracoes_usuario_delete_policy" ON oracoes_usuario FOR DELETE USING (
  user_id = auth.uid()
);

-- Políticas para outras tabelas (permissivas por enquanto)
CREATE POLICY "grupos_select_policy" ON grupos FOR SELECT USING (true);
CREATE POLICY "eventos_select_policy" ON eventos FOR SELECT USING (true);
CREATE POLICY "grupo_usuarios_select_policy" ON grupo_usuarios FOR SELECT USING (true);

-- Dados iniciais
INSERT INTO paroquias (id, nome, endereco, diocese) VALUES 
  ('440e8400-e29b-41d4-a716-446655440001', 'Paróquia São José', 'Rua das Flores, 123 - Centro', 'Arquidiocese de São Paulo'),
  ('440e8400-e29b-41d4-a716-446655440002', 'Paróquia Nossa Senhora Aparecida', 'Av. Principal, 456 - Jardim', 'Diocese de Santos')
ON CONFLICT (id) DO NOTHING;

INSERT INTO grupos (id, name, description, paroquia_id) VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'Grupo Caminhada da Fé', 'Grupo focado no crescimento espiritual', '440e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Grupo Luz de Maria', 'Grupo mariano dedicado à oração', '440e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Grupo Pão da Vida', 'Grupo de jovens adultos', '440e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Grupo Esperança', 'Grupo de apoio e acolhimento', '440e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

INSERT INTO jornadas (id, title, description, total_modules, category, level) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Caminho da Conversão', 'Uma jornada de 30 dias para aprofundar sua relação com Cristo', 8, 'Conversão', 'Iniciante'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Discipulado Missionário', 'Formação para líderes e evangelizadores', 12, 'Liderança', 'Avançado'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Vida de Oração', 'Aprofunde sua vida de oração e contemplação', 7, 'Espiritualidade', 'Intermediário')
ON CONFLICT (id) DO NOTHING;
