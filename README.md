# 🛒 E-commerce Engine API
> Robust Backend de E-commerce construído com a arquitetura modular do NestJS, Prisma ORM e persistência em MongoDB.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Esta API foi desenvolvida seguindo os princípios de **Clean Code** e **SOLID**, focando em escalabilidade e segurança para operações críticas de checkout e gestão de produtos.

---

## 🎯 Diferenciais Técnicos

Diferente de CRUDS básicos, este projeto implementa padrões de nível produção:

* **Pattern-based Architecture:** Estrutura modular para facilitar a manutenção e testes unitários.
* **Data Integrity:** Uso de transações para garantir que a redução de estoque e a criação do pedido ocorram de forma atômica.
* **Security First:** Implementação de `Passport Strategy` com JWT, Hasheamento `Bcrypt` e sanitização de inputs via `class-validator`.
* **API Documentation:** Documentação viva via **Swagger (OpenAPI 3.0)**, permitindo testes de endpoints diretamente pelo browser.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Papel |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v18+) | Ambiente de execução |
| **Framework** | NestJS | Estrutura modular e injeção de dependência |
| **Database** | MongoDB | Persistência de dados NoSQL |
| **ORM** | Prisma | Modelagem de dados e Type Safety |
| **Auth** | JWT + Passport | Autenticação e autorização |
| **Docs** | Swagger | Especificação e interface da API |

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js instalado
- Instância do MongoDB (Local ou Atlas)

### 1. Instalação
```bash
git clone [https://github.com/seu-usuario/ecommerce-api.git](https://github.com/seu-usuario/ecommerce-api.git)
cd ecommerce-api
npm install
