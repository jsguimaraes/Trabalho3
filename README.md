# Sistema de Controle de Acesso - Trabalho III

## Descrição

Sistema de controle de acesso desenvolvido com NestJS, Prisma e SQLite para gerenciar permissões de acesso a módulos fixos. O sistema implementa regras de negócio robustas, estrutura de banco de dados otimizada e funcionalidades completas de backend.

## Funcionalidades Implementadas

### ✅ Módulos Fixos
- **Gestão de Usuários**: Acessível apenas por superusuário e administradores
- **Módulo de Perfil**: Todos os usuários podem acessar e editar seu próprio perfil
- **Módulo Financeiro**: Acessível por superusuário, administradores e usuários com permissão explícita
- **Módulo de Relatórios**: Acessível por superusuário, administradores e usuários com permissão explícita
- **Módulo de Produtos**: Acessível por superusuário, administradores e usuários com permissão explícita

### ✅ Controle de Usuários e Permissões
- **Superusuário** criado automaticamente (hardcoded)
- **Administradores** podem criar usuários comuns e configurar permissões
- **Usuários comuns** acessam apenas módulos com permissão explícita
- **Logs de acesso** registrados para todas as rotas

### ✅ Banco de Dados
- **Estrutura otimizada** com Prisma ORM
- **Tabelas**: Usuario, Modulo, Permissao, Acesso
- **Relacionamentos** bem definidos
- **SQLite** como banco local

### ✅ Funcionalidades Específicas
- **Autenticação JWT** com criptografia bcrypt
- **Middleware de permissões** em tempo real
- **Endpoints para gestão** de permissões
- **Logs detalhados** de acesso

## Tecnologias Utilizadas

- **Backend**: NestJS
- **ORM**: Prisma
- **Banco de Dados**: SQLite
- **Autenticação**: JWT
- **Criptografia**: bcrypt
- **Linguagem**: TypeScript

## Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Trabalho3
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
npx prisma migrate dev
```

4. **Inicie o servidor**
```bash
npm run start:dev
```

## Superusuário Padrão

Ao iniciar a aplicação, um superusuário é criado automaticamente:

- **Email**: admin@sistema.com
- **Senha**: admin123
- **Papel**: superusuario

## Estrutura do Projeto

```
src/
├── auth/                 # Autenticação JWT
├── users/               # Gestão de usuários
├── permissions/         # Controle de permissões
├── perfil/             # Módulo de perfil
├── financeiro/         # Módulo financeiro
├── relatorios/         # Módulo de relatórios
├── produtos/           # Módulo de produtos
├── guards/             # Guards de autenticação e permissões
└── prisma.service.ts   # Serviço do Prisma
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

### Módulos e Permissões

- **Gestão de Usuários** (`/usuarios`): Superusuário, Administrador
- **Módulo de Perfil** (`/perfil`): Próprio usuário
- **Módulo Financeiro** (`/financeiro`): Superusuário, Administrador, Usuários com permissão
- **Módulo de Relatórios** (`/relatorios`): Superusuário, Administrador, Usuários com permissão
- **Módulo de Produtos** (`/produtos`): Superusuário, Administrador, Usuários com permissão

## Endpoints Principais

### Autenticação
- `POST /auth/login` - Login de usuário

### Usuários
- `POST /usuarios` - Criar usuário
- `POST /usuarios/administrador` - Criar administrador
- `POST /usuarios/usuario` - Criar usuário comum
- `GET /usuarios` - Listar usuários
- `GET /usuarios/:id` - Buscar usuário
- `PATCH /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário

### Permissões
- `POST /permissions/conceder` - Conceder permissão
- `POST /permissions/revogar` - Revogar permissão
- `GET /permissions/usuario/:id` - Listar permissões de usuário
- `GET /permissions/modulos` - Listar módulos
- `GET /permissions/usuarios` - Listar usuários com permissões

### Módulos
- `GET /perfil` - Acessar perfil
- `PUT /perfil` - Atualizar perfil
- `GET /financeiro` - Acessar módulo financeiro
- `GET /relatorios` - Acessar módulo de relatórios
- `GET /produtos` - Acessar módulo de produtos

## Testes

Use o arquivo `testes.http` para testar todas as funcionalidades da API.

### Exemplo de Teste

1. **Login do superusuário**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@sistema.com", "senha": "admin123"}'
```

2. **Criar usuário comum**
```bash
curl -X POST http://localhost:3000/usuarios/usuario \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "email": "joao@exemplo.com", "senha": "senha123"}'
```

## Logs de Acesso

Todas as tentativas de acesso são registradas no banco de dados com:
- Usuário que tentou acessar
- Módulo acessado
- Rota específica
- Se o acesso foi permitido ou negado
- Data e hora
- IP e User-Agent

## Documentação Completa

Consulte o arquivo `API_DOCUMENTATION.md` para documentação detalhada de todos os endpoints e regras de negócio.

## Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod

# Testes
npm run test

# Migrations
npx prisma migrate dev

# Studio do Prisma
npx prisma studio
```

## Contribuição

Este projeto foi desenvolvido como parte do Trabalho III da disciplina de Web II, implementando todos os requisitos solicitados pelo professor.
