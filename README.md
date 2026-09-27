```text
# 🏗️ Cliente Obra — Front-end

Aplicação web desenvolvida em **React** para gerenciamento de clientes e obras de construção civil.

O projeto possui autenticação de usuários, rotas protegidas, gerenciamento completo de obras, gerenciamento de perfil e geração de documentos em PDF. O front-end se comunica com uma API REST desenvolvida em **Laravel**, responsável pela autenticação, regras de negócio e persistência dos dados.

🔗 **Deploy:** https://cliente-obra-api2-frontend.vercel.app/
🔗 **Repositório do back-end:** https://github.com/HenriqueBossle/cliente-obra-api2

---

## 📌 Sobre o projeto

O **Cliente Obra** foi desenvolvido como uma aplicação full-stack para praticar e demonstrar conceitos de desenvolvimento web moderno, principalmente:

- Desenvolvimento de interfaces com React
- Consumo de APIs REST
- Autenticação utilizando tokens
- Proteção de rotas
- CRUD completo
- Gerenciamento de estado da aplicação
- Integração entre front-end e back-end
- Geração de documentos PDF
- Deploy de aplicações web

A aplicação permite que usuários autenticados cadastrem e gerenciem suas obras, acompanhem informações dos projetos e gerem documentos em PDF.

---

## ✨ Funcionalidades

### 🔐 Autenticação

- Cadastro de usuário
- Login e logout
- Autenticação via token pela API
- Persistência da sessão
- Rotas protegidas e controle de acesso

### 👤 Usuário

- Visualização do perfil
- Atualização de informações da conta
- Gerenciamento dos dados do usuário

### 🏗️ Obras

- Cadastro, listagem, edição e exclusão de obras
- Visualização de detalhes
- Obras associadas ao usuário autenticado

### 📄 PDF

- Geração de PDF de uma obra individual
- Geração de PDF com todas as obras cadastradas

### 🎨 Interface

- Layout responsivo
- Componentes reutilizáveis
- Navegação com React Router
- Ícones com Font Awesome
- Formatação de datas
- Feedback visual nas ações do usuário

---

## 🛠️ Tecnologias

### Front-end

| Tecnologia | Utilização |
| --- | --- |
| React | Construção da interface |
| React Router DOM | Roteamento e rotas protegidas |
| Axios | Comunicação com a API REST |
| Vite | Ambiente de desenvolvimento e build |
| JavaScript | Lógica da aplicação |
| CSS3 | Estilização |
| date-fns | Manipulação e formatação de datas |
| Font Awesome | Ícones |

### Back-end

O front-end consome uma API REST em Laravel, responsável pela autenticação e gerenciamento dos dados:

- PHP
- Laravel
- Laravel Sanctum
- Eloquent ORM
- MySQL/PostgreSQL
- REST API

---

## 🔄 Arquitetura

A aplicação utiliza uma arquitetura separando o front-end da API:

```text
┌─────────────────────────┐
│       React + Vite      │
│                         │
│  Interface / Componentes│
│  React Router           │
│  Axios                  │
└────────────┬────────────┘
             │
             │  HTTP / REST API
             ▼
┌─────────────────────────┐
│       Laravel API       │
│                         │
│  Controllers            │
│  Models / Eloquent      │
│  Authentication/Sanctum │
│  Business Rules         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Database         │
│     PostgreSQL/MySQL    │
└─────────────────────────┘
```

Essa separação permite que o front-end e o back-end sejam desenvolvidos, testados e hospedados de forma independente.

---

## 👨‍💻 Autor

Desenvolvido por [Henrique Bossle](https://github.com/HenriqueBossle)
``
