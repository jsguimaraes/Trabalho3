# Documentação da API - Sistema de Controle de Acesso

## Visão Geral

Este sistema implementa um controle de acesso robusto com módulos fixos, permissões personalizadas e logs de acesso. O sistema utiliza NestJS, Prisma e SQLite.

## Autenticação

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@sistema.com",
  "senha": "admin123"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Usuários

### Criar Usuário (Superusuário/Administrador)
```
POST /usuarios
Authorization: Bearer <token>

{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senha123",
  "papel": "usuario"
}
```

### Criar Administrador (Apenas Superusuário)
```
POST /usuarios/administrador
Authorization: Bearer <token>

{
  "nome": "Admin Silva",
  "email": "admin@exemplo.com",
  "senha": "senha123"
}
```

### Criar Usuário Comum (Superusuário/Administrador)
```
POST /usuarios/usuario
Authorization: Bearer <token>

{
  "nome": "Usuário Comum",
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

### Listar Usuários (Superusuário/Administrador)
```
GET /usuarios
Authorization: Bearer <token>
```

### Buscar Usuário
```
GET /usuarios/:id
Authorization: Bearer <token>
```

### Atualizar Usuário
```
PATCH /usuarios/:id
Authorization: Bearer <token>

{
  "nome": "Novo Nome",
  "email": "novo@email.com"
}
```

### Deletar Usuário (Apenas Superusuário)
```
DELETE /usuarios/:id
Authorization: Bearer <token>
```

## Permissões

### Conceder Permissão (Superusuário/Administrador)
```
POST /permissions/conceder
Authorization: Bearer <token>

{
  "usuarioId": 2,
  "moduloId": 3
}
```

### Revogar Permissão (Superusuário/Administrador)
```
POST /permissions/revogar
Authorization: Bearer <token>

{
  "usuarioId": 2,
  "moduloId": 3
}
```

### Listar Permissões de Usuário
```
GET /permissions/usuario/:id
Authorization: Bearer <token>
```

### Listar Todos os Módulos
```
GET /permissions/modulos
Authorization: Bearer <token>
```

### Listar Usuários com Permissões
```
GET /permissions/usuarios
Authorization: Bearer <token>
```

## Módulos

### Perfil (Acesso Próprio)
```
GET /perfil
Authorization: Bearer <token>
```

### Atualizar Perfil
```
PUT /perfil
Authorization: Bearer <token>

{
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "senha": "novaSenha123"
}
```

### Ver Permissões do Perfil
```
GET /perfil/permissoes
Authorization: Bearer <token>
```

### Financeiro (Superusuário/Administrador/Usuários com Permissão)
```
GET /financeiro
Authorization: Bearer <token>
```

### Criar Transação Financeira
```
POST /financeiro/transacao
Authorization: Bearer <token>

{
  "valor": 1000.00,
  "tipo": "receita",
  "descricao": "Venda de produto"
}
```

### Relatório Financeiro
```
GET /financeiro/relatorio
Authorization: Bearer <token>
```

### Relatórios (Superusuário/Administrador/Usuários com Permissão)
```
GET /relatorios
Authorization: Bearer <token>
```

### Gerar Relatório
```
POST /relatorios/gerar
Authorization: Bearer <token>

{
  "tipo": "vendas",
  "periodo": "2024-01"
}
```

### Relatório de Vendas
```
GET /relatorios/vendas
Authorization: Bearer <token>
```

### Produtos (Superusuário/Administrador/Usuários com Permissão)
```
GET /produtos
Authorization: Bearer <token>
```

### Criar Produto
```
POST /produtos
Authorization: Bearer <token>

{
  "nome": "Produto Novo",
  "preco": 150.00,
  "estoque": 100,
  "categoria": "Eletrônicos"
}
```

### Atualizar Produto
```
PUT /produtos/:id
Authorization: Bearer <token>

{
  "nome": "Produto Atualizado",
  "preco": 200.00,
  "estoque": 75,
  "categoria": "Informática"
}
```

### Deletar Produto
```
DELETE /produtos/:id
Authorization: Bearer <token>
```

### Categorias de Produtos
```
GET /produtos/categorias
Authorization: Bearer <token>
```

## Regras de Negócio

### Hierarquia de Usuários

1. **Superusuário**
   - Acesso total a todos os módulos
   - Pode criar administradores e usuários
   - Pode deletar usuários
   - Pode conceder/revogar permissões

2. **Administrador**
   - Acesso a todos os módulos exceto gestão de usuários
   - Pode criar usuários comuns
   - Pode conceder/revogar permissões
   - Não pode deletar usuários

3. **Usuário Comum**
   - Acesso apenas ao módulo de perfil (próprio)
   - Acesso a outros módulos apenas com permissão explícita
   - Pode editar seu próprio perfil

### Módulos Fixos

1. **Gestão de Usuários** (`/usuarios`)
   - Acesso: Superusuário, Administrador

2. **Módulo de Perfil** (`/perfil`)
   - Acesso: Próprio usuário

3. **Módulo Financeiro** (`/financeiro`)
   - Acesso: Superusuário, Administrador, Usuários com permissão

4. **Módulo de Relatórios** (`/relatorios`)
   - Acesso: Superusuário, Administrador, Usuários com permissão

5. **Módulo de Produtos** (`/produtos`)
   - Acesso: Superusuário, Administrador, Usuários com permissão

### Logs de Acesso

Todas as tentativas de acesso são registradas no banco de dados com:
- Usuário que tentou acessar
- Módulo acessado
- Rota específica
- Se o acesso foi permitido ou negado
- Data e hora
- IP e User-Agent

### Superusuário Padrão

Ao iniciar a aplicação, um superusuário é criado automaticamente:
- **Email:** admin@sistema.com
- **Senha:** admin123
- **Papel:** superusuario

## Códigos de Erro

### 401 - Não Autorizado
```
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 - Acesso Negado
```
{
  "statusCode": 403,
  "message": "SEM PERMISSÃO PARA ACESSAR O MÓDULO FINANCEIRO"
}
```

### 404 - Não Encontrado
```
{
  "statusCode": 404,
  "message": "Usuário não encontrado"
}
```

## Estrutura do Banco de Dados

### Tabelas

1. **Usuario**
   - id, nome, email, senha, papel, avatar, createdAt, updatedAt

2. **Modulo**
   - id, nome, descricao, ativo

3. **Permissao**
   - id, usuarioId, moduloId, ativo, createdAt

4. **Acesso**
   - id, usuarioId, modulo, rota, permitido, data, ip, userAgent

### Relacionamentos

- Usuario → Permissao (1:N)
- Modulo → Permissao (1:N)
- Usuario → Acesso (1:N)

## Tecnologias Utilizadas

- **Backend:** NestJS
- **ORM:** Prisma
- **Banco de Dados:** SQLite
- **Autenticação:** JWT
- **Criptografia:** bcrypt
- **Linguagem:** TypeScript 