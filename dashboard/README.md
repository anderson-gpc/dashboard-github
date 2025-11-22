# Dashboard Github

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.28-0170FE?style=for-the-badge&logo=ant-design)

**Aplicação web moderna para gerenciamento de redes sociais e automação de tarefas do GitHub**

[Características](#-características) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Estrutura](#-estrutura-do-projeto)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura de Componentes](#-arquitetura-de-componentes)
- [Padrões e Convenções](#-padrões-e-convenções)
- [Desenvolvimento](#-desenvolvimento)
- [Contribuindo](#-contribuindo)

---

## 🎯 Sobre o Projeto

O **Dashboard Github** é uma aplicação web desenvolvida com Next.js que oferece uma interface moderna e intuitiva para gerenciamento de redes sociais do GitHub. A aplicação permite que usuários visualizem e gerenciem seus relacionamentos e analisam issues recebidas.

### Principais Funcionalidades

- **Autenticação OAuth com GitHub**: Login seguro utilizando NextAuth.js
- **Dashboard Interativo**: Visualização de seguidores mútuos, não seguidores e issues
- **Gerenciamento de Tokens**: Sistema seguro para armazenamento e gerenciamento de tokens de acesso pessoal do GitHub

---

## ✨ Características

### 🔐 Autenticação e Segurança
- Autenticação OAuth 2.0 com GitHub
- Armazenamento seguro de tokens com criptografia (bcrypt)
- Gerenciamento de sessão otimizado
- Proteção de rotas privadas

### 📊 Dashboard
- **Seguidores Mútuos**: Visualização de usuários que você segue e que também te seguem
- **Não Seguidores**: Identificação de usuários que você segue mas que não te seguem de volta
- **Issues Recebidas**: Listagem completa de issues atribuídas ao usuário
- **Ações Rápidas**: Remoção de seguidores e visualização de perfis diretamente do dashboard

### 🎨 Interface do Usuário
- Design system baseado em Atomic Design
- Componentes reutilizáveis e modulares
- Animações suaves e transições elegantes
- Feedback visual em tempo real
- Notificações toast para ações do usuário

---

## 🛠 Tecnologias

### Core
- **[Next.js 16.0](https://nextjs.org/)** - Framework React com SSR e App Router
- **[React 19.2](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### UI e Estilização
- **[Ant Design 5.28](https://ant.design/)** - Biblioteca de componentes UI
- **[Framer Motion](https://www.framer.com/motion/)** - Biblioteca de animações
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[antd-style](https://ant-design.github.io/antd-style/)** - Sistema de estilos para Ant Design

### Autenticação e Dados
- **[NextAuth.js 5.0](https://next-auth.js.org/)** - Autenticação completa para Next.js
- **[Prisma 6.19](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[MySQL2](https://github.com/sidorares/node-mysql2)** - Driver MySQL para Node.js
- **[Octokit](https://octokit.github.io/)** - Cliente oficial da API do GitHub

### Utilitários
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Criptografia de senhas e tokens
- **[JOSE](https://github.com/panva/jose)** - Implementação JWT
- **[react-loading-indicators](https://github.com/ahmad-reza619/react-loading-indicators)** - Indicadores de carregamento

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **MySQL** >= 8.0 (ou acesso a um banco de dados MySQL)
- **Git** para controle de versão

### Variáveis de Ambiente

A aplicação requer as seguintes variáveis de ambiente configuradas:

```env
# GitHub OAuth
GITHUB_ID=seu_client_id_do_github
GITHUB_SECRET=seu_client_secret_do_github

# NextAuth
NEXT_SECRET=seu_secret_aleatorio_para_jwt

# Banco de Dados
DATABASE_URL=definir_sua_database_url

# Next.js
NODE_ENV=development

# Encrypt
CRYPT_KEY=sua_cript_key
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd task-automator/frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp env.example .env
# Edite o arquivo .env
```

### 4. Configure o banco de dados

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuração

### Configuração do GitHub OAuth

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Crie uma nova OAuth App
3. Configure a URL de callback: `http://localhost:3000/api/auth/callback/github`
4. Copie o `Client ID` e `Client Secret` para o arquivo `.env.local`

### Configuração do Banco de Dados

1. Crie um banco de dados MySQL
2. Configure a string de conexão no arquivo `.env.local`
3. Execute as migrações: `npx prisma migrate dev`

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Produção
npm run build        # Cria build de produção
npm run start        # Inicia o servidor de produção

# Qualidade de Código
npm run lint         # Executa o linter ESLint
```

---

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── (routes)/          # Agrupamento de rotas
│   │   │   ├── (private)/     # Rotas protegidas
│   │   │   │   └── dashboard/ # Página do dashboard
│   │   │   └── (public)/      # Rotas públicas
│   │   │       └── login/     # Página de login
│   │   ├── api/               # API Routes
│   │   │   └── auth/          # Rotas de autenticação
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Página inicial
│   │
│   ├── components/            # Componentes React
│   │   ├── atoms/             # Componentes atômicos
│   │   │   ├── Button.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── ThreeDot.tsx
│   │   │   └── CenterMessage.tsx
│   │   ├── molecules/         # Moléculas (combinações de atoms)
│   │   │   ├── Network.tsx
│   │   │   ├── IssueCard.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── FormComponent.tsx
│   │   ├── organisms/        # Organismos (combinações complexas)
│   │   │   ├── Appbar.tsx
│   │   │   ├── ButtonsRow.tsx
│   │   │   └── ModalAction.tsx
│   │   └── providers/         # Providers de contexto
│   │       └── SessionProvider.tsx
│   │
│   ├── views/                 # Views/páginas principais
│   │   ├── home/
│   │   │   ├── DashboardPage.tsx
│   │   │   └── DefaultPage.tsx
│   │   └── login/
│   │       └── LoginPage.tsx
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useDashboardData.ts
│   │   ├── useModal.ts
│   │   └── useNotification.ts
│   │
│   ├── actions/               # Server Actions
│   │   ├── database/          # Ações de banco de dados
│   │   └── github/           # Ações da API do GitHub
│   │
│   ├── lib/                   # Bibliotecas e utilitários
│   │   ├── prisma/            # Cliente Prisma
│   │   ├── github/            # Cliente Octokit
│   │   └── brycpt/            # Utilitários de criptografia
│   │
│   ├── assets/                # Assets estáticos
│   │   └── css/               # Estilos globais e módulos
│   │
│   ├── constants/             # Constantes da aplicação
│   ├── interfaces/           # Interfaces TypeScript
│   ├── context.tsx           # Context API
│   └── auth.ts               # Configuração NextAuth
│
├── prisma/                    # Schema e migrações do Prisma
├── public/                    # Arquivos estáticos públicos
├── .gitignore
├── next.config.ts            # Configuração do Next.js
├── tsconfig.json             # Configuração do TypeScript
├── package.json
└── README.md
```

---

## 🏗 Arquitetura de Componentes

A aplicação segue o padrão **Atomic Design**, organizando componentes em três níveis hierárquicos:

### Atoms (Átomos)
Componentes básicos e indivisíveis, sem dependências de outros componentes da aplicação:
- `Button` - Botão customizado com estilos variados
- `Divider` - Divisor de seção
- `ThreeDot` - Indicador de carregamento
- `CenterMessage` - Mensagem centralizada

### Molecules (Moléculas)
Combinações de atoms que formam componentes mais complexos:
- `Network` - Card de usuário com avatar e ações
- `IssueCard` - Card de issue do GitHub
- `Modal` - Modal básico reutilizável
- `FormComponent` - Formulário de token

### Organisms (Organismos)
Combinações complexas de molecules e atoms, geralmente com lógica de negócio:
- `Appbar` - Barra de navegação principal
- `ButtonsRow` - Linha de botões de ação
- `ModalAction` - Modal de configuração de token

### Providers
Componentes que fornecem contexto para a aplicação:
- `SessionProvider` - Provider de autenticação do NextAuth

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

<div align="center">

**Desenvolvido usando Next.js e TypeScript**

[⬆ Voltar ao topo](#task-automator---frontend)

</div>

