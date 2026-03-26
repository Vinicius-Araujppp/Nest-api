# 🛒 E-commerce API - NestJS + Prisma + MongoDB

API REST completa para sistema de E-commerce desenvolvida com **NestJS**, **Prisma ORM** e **MongoDB**, focada em boas práticas de arquitetura backend e pronta para portfólio profissional.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[JWT](https://jwt.io/)** - Autenticação via JSON Web Token
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[Swagger](https://swagger.io/)** - Documentação automática da API
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de DTOs

## ✨ Funcionalidades

### 🔐 Autenticação
- ✅ Registro de usuários com validação
- ✅ Login com JWT
- ✅ Proteção de rotas com Guards
- ✅ Decorators customizados (@Public, @CurrentUser)

### 👥 Usuários
- ✅ CRUD completo de usuários
- ✅ Hash de senhas com Bcrypt
- ✅ Validação de email único

### 📦 Produtos
- ✅ CRUD completo de produtos
- ✅ Controle de estoque
- ✅ Listagem pública de produtos

### 🛍️ Pedidos
- ✅ Criação de pedidos com múltiplos itens
- ✅ Validação de estoque automática
- ✅ Cálculo automático do total
- ✅ Atualização de estoque em transação
- ✅ Histórico de pedidos por usuário

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/ecommerce"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# Server
PORT=3000

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3001"
```

## 🚀 Executar

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação Swagger

Acesse a documentação interativa da API em:

**http://localhost:3000/api/docs**

## 🔌 Endpoints Principais

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /auth/me` - Dados do usuário autenticado

### Produtos
- `GET /products` - Listar produtos (público)
- `POST /products` - Criar produto (autenticado)

### Pedidos
- `POST /orders` - Criar pedido (autenticado)
- `GET /orders` - Listar seus pedidos (autenticado)

## 🏗️ Arquitetura

```
src/
├── auth/              # Autenticação JWT
├── users/             # Gerenciamento de usuários
├── products/          # Gerenciamento de produtos
├── orders/            # Gerenciamento de pedidos
└── prisma/            # Database service
```

## 📝 Licença

MIT
