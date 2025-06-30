-- Caminho 4D - Setup Completo do Banco de Dados v4
-- Este script cria todas as tabelas na ordem correta e configura RLS

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Limpar dados existentes se necessário (cuidado em produção!)
DROP TABLE IF EXISTS oracoes_usuario CASCADE;
DROP TABLE IF EXISTS pedidos_oracao CASCADE;
DROP TABLE IF EXISTS logs_atividades CASCADE;
DROP TABLE IF EXISTS eventos CASCADE;
DROP TABLE IF EXISTS oracoes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS grupos CASCADE;
DROP TABLE IF EXISTS paroquias CASCADE;
DROP TABLE IF EXISTS membros CASCADE;
DROP TABLE IF EXISTS jornadas CASCADE;

-- Remover funções existentes
DROP FUNCTION IF EXISTS is_admin() CASCADE;
DROP FUNCTION IF EXISTS is_coordenador() CASCADE;
DROP FUNCTION IF EXISTS update_prayer_count() CASCADE;
DROP FUNCTION IF EXISTS update_contador_oracoes() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- 1. Criar tabela de paróquias
CREATE TABLE IF NOT EXISTS paroquias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(255),
    parocho VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela de grupos
CREATE TABLE IF NOT EXISTS grupos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    coordenador_id UUID REFERENCES usuarios(id),
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'membro' CHECK (role IN ('admin', 'coordenador', 'membro')),
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('ativo', 'pendente', 'inativo')),
    data_nascimento DATE,
    endereco TEXT,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Criar tabela de orações/pedidos
CREATE TABLE IF NOT EXISTS pedidos_oracao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'atendido', 'arquivado')),
    categoria VARCHAR(50),
    privacidade VARCHAR(20) DEFAULT 'publico' CHECK (privacidade IN ('publico', 'privado')),
    contador_oracoes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Criar tabela de usuários orando
CREATE TABLE IF NOT EXISTS oracoes_usuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pedido_id UUID REFERENCES pedidos_oracao(id) ON DELETE CASCADE,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    esta_orando BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(pedido_id, usuario_id)
);

-- 6. Criar tabela de membros
CREATE TABLE IF NOT EXISTS membros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    data_nascimento DATE,
    endereco TEXT,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    grupo_id UUID,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Criar tabela de jornadas espirituais
CREATE TABLE IF NOT EXISTS jornadas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    duracao_dias INTEGER DEFAULT 30,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Criar tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE,
    local VARCHAR(255),
    organizador_id UUID REFERENCES usuarios(id),
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'cancelado', 'concluido')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar foreign key para coordenador_id após criar usuarios
ALTER TABLE grupos ADD CONSTRAINT fk_grupos_coordenador 
    FOREIGN KEY (coordenador_id) REFERENCES usuarios(id);

-- Criar funções auxiliares para RLS
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role = 'admin'
    AND status = 'ativo'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_coordenador()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM usuarios 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'coordenador')
    AND status = 'ativo'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para atualizar contador de orações
CREATE OR REPLACE FUNCTION update_contador_oracoes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.esta_orando = true THEN
    UPDATE pedidos_oracao 
    SET contador_oracoes = contador_oracoes + 1 
    WHERE id = NEW.pedido_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.esta_orando = false AND NEW.esta_orando = true THEN
      UPDATE pedidos_oracao 
      SET contador_oracoes = contador_oracoes + 1 
      WHERE id = NEW.pedido_id;
    ELSIF OLD.esta_orando = true AND NEW.esta_orando = false THEN
      UPDATE pedidos_oracao 
      SET contador_oracoes = GREATEST(contador_oracoes - 1, 0) 
      WHERE id = NEW.pedido_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.esta_orando = true THEN
    UPDATE pedidos_oracao 
    SET contador_oracoes = GREATEST(contador_oracoes - 1, 0) 
    WHERE id = OLD.pedido_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_contador_oracoes
  AFTER INSERT OR UPDATE OR DELETE ON oracoes_usuario
  FOR EACH ROW EXECUTE FUNCTION update_contador_oracoes();

-- Trigger para atualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedidos_oracao_updated_at BEFORE UPDATE ON pedidos_oracao
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oracoes_usuario_updated_at BEFORE UPDATE ON oracoes_usuario
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_membros_updated_at BEFORE UPDATE ON membros
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grupos_updated_at BEFORE UPDATE ON grupos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jornadas_updated_at BEFORE UPDATE ON jornadas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_oracao ENABLE ROW LEVEL SECURITY;
ALTER TABLE oracoes_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE membros ENABLE ROW LEVEL SECURITY;
ALTER TABLE grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE jornadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE paroquias ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuarios
CREATE POLICY "Usuários podem ver próprio perfil" ON usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos usuários" ON usuarios
  FOR SELECT USING (is_admin());

CREATE POLICY "Usuários podem atualizar próprio perfil" ON usuarios
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins podem atualizar qualquer usuário" ON usuarios
  FOR UPDATE USING (is_admin());

-- Políticas RLS para pedidos_oracao
CREATE POLICY "Todos podem ver pedidos públicos" ON pedidos_oracao
  FOR SELECT USING (privacidade = 'publico' OR usuario_id = auth.uid());

CREATE POLICY "Usuários podem criar pedidos" ON pedidos_oracao
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem editar próprios pedidos" ON pedidos_oracao
  FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Coordenadores podem ver todos pedidos" ON pedidos_oracao
  FOR SELECT USING (is_coordenador());

-- Políticas RLS para oracoes_usuario
CREATE POLICY "Usuários podem ver próprias orações" ON oracoes_usuario
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem inserir próprias orações" ON oracoes_usuario
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar próprias orações" ON oracoes_usuario
  FOR UPDATE USING (auth.uid() = usuario_id);

-- Políticas RLS para membros
CREATE POLICY "Coordenadores podem gerenciar membros" ON membros
  FOR ALL USING (is_coordenador());

-- Políticas RLS para grupos
CREATE POLICY "Todos podem ver grupos ativos" ON grupos
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Coordenadores podem gerenciar grupos" ON grupos
  FOR ALL USING (is_coordenador());

-- Políticas RLS para jornadas
CREATE POLICY "Todos podem ver jornadas ativas" ON jornadas
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Coordenadores podem gerenciar jornadas" ON jornadas
  FOR ALL USING (is_coordenador());

-- Políticas RLS para eventos
CREATE POLICY "Todos podem ver eventos ativos" ON eventos
  FOR SELECT USING (status = 'ativo');

CREATE POLICY "Coordenadores podem gerenciar eventos" ON eventos
  FOR ALL USING (is_coordenador());

-- Políticas para paroquias
DROP POLICY IF EXISTS "Todos podem ver paróquias" ON paroquias;
DROP POLICY IF EXISTS "Admins podem gerenciar paróquias" ON paroquias;

CREATE POLICY "Todos podem ver paróquias" ON paroquias
  FOR SELECT USING (true);

CREATE POLICY "Admins podem gerenciar paróquias" ON paroquias
  FOR ALL USING (is_admin());

-- Inserir dados de exemplo
INSERT INTO paroquias (id, nome, endereco, telefone, email, parocho) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Paróquia São José', 'Rua das Flores, 123', '(11) 1234-5678', 'contato@saojose.com.br', 'Padre João Silva'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Paróquia Nossa Senhora', 'Av. Principal, 456', '(11) 8765-4321', 'info@nossasenhora.com.br', 'Padre Maria Santos')
ON CONFLICT (id) DO NOTHING;

INSERT INTO usuarios (id, nome, email, role, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Admin Sistema', 'admin@caminho4d.com', 'admin', 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Coordenador Teste', 'coord@caminho4d.com', 'coordenador', 'ativo'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Membro Teste', 'membro@caminho4d.com', 'membro', 'ativo')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pedidos_oracao (titulo, descricao, usuario_id, categoria) VALUES
  ('Pela paz mundial', 'Oremos pela paz em todos os países do mundo', '550e8400-e29b-41d4-a716-446655440001', 'Mundo'),
  ('Pelos doentes', 'Por todos que estão enfrentando doenças', '550e8400-e29b-41d4-a716-446655440002', 'Saúde'),
  ('Pelas famílias', 'Pela união e harmonia das famílias', '550e8400-e29b-41d4-a716-446655440001', 'Família');

INSERT INTO grupos (nome, descricao, coordenador_id) VALUES
  ('Grupo de Oração', 'Grupo semanal de oração e partilha', '550e8400-e29b-41d4-a716-446655440001'),
  ('Jovens na Fé', 'Grupo para jovens católicos', '550e8400-e29b-41d4-a716-446655440001');

INSERT INTO jornadas (titulo, descricao, duracao_dias) VALUES
  ('Caminho de Santiago', 'Jornada espiritual inspirada no Caminho de Santiago', 40),
  ('Quaresma 2024', 'Preparação espiritual para a Páscoa', 40);

INSERT INTO membros (id, nome, email, telefone, grupo_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440040', 'João Pereira', 'joao@caminho4d.com', '(11) 9876-5432', '550e8400-e29b-41d4-a716-446655440010'),
  ('550e8400-e29b-41d4-a716-446655440041', 'Ana Oliveira', 'ana@caminho4d.com', '(11) 9876-5433', '550e8400-e29b-41d4-a716-446655440010');

INSERT INTO eventos (id, titulo, descricao, data_inicio, local, organizador_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440050', 'Encontro de Oração', 'Encontro mensal de oração do grupo', '2024-02-15 19:00:00', 'Salão Paroquial', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440051', 'Retiro Espiritual', 'Retiro de fim de semana para aprofundamento', '2024-02-20 08:00:00', 'Casa de Retiro', '550e8400-e29b-41d4-a716-446655440000');

COMMIT;
