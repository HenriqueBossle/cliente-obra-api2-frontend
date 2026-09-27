🏗️ Cliente Obra — Front-end

Aplicação web desenvolvida em React para gerenciamento de clientes e obras de construção civil.

O projeto possui autenticação de usuários, rotas protegidas, gerenciamento completo de obras, gerenciamento de perfil e geração de documentos em PDF. O front-end se comunica com uma API REST desenvolvida em Laravel, responsável pela autenticação, regras de negócio e persistência dos dados.

🔗 https://cliente-obra-api2-frontend.vercel.app/

🔗 https://github.com/HenriqueBossle/cliente-obra-api2

📌 Sobre o projeto

O Cliente Obra foi desenvolvido como uma aplicação full-stack para praticar e demonstrar conceitos de desenvolvimento web moderno, principalmente:

Desenvolvimento de interfaces com React
Consumo de APIs REST
Autenticação utilizando tokens
Proteção de rotas
CRUD completo
Gerenciamento de estado da aplicação
Integração entre Front-end e Back-end
Geração de documentos PDF
Deploy de aplicações web

A aplicação permite que usuários autenticados cadastrem e gerenciem suas obras, acompanhem informações dos projetos e gerem documentos em PDF.

✨ Funcionalidades
🔐 Autenticação
Cadastro de usuário
Login
Logout
Autenticação através da API
Persistência da sessão
Rotas protegidas
Controle de acesso às páginas autenticadas
👤 Usuário
Visualização do perfil
Atualização de informações do usuário
Gerenciamento dos dados da conta
🏗️ Obras
Cadastro de obras
Listagem de obras
Visualização dos detalhes
Edição de obras
Exclusão de obras
Associação das obras ao usuário autenticado
📄 PDF
Geração de PDF de uma obra
Geração de PDF contendo todas as obras cadastradas
🎨 Interface
Interface responsiva
Componentes reutilizáveis
Navegação utilizando React Router
Ícones utilizando Font Awesome
Formatação de datas
Feedback visual para ações do usuário
🛠️ Tecnologias utilizadas
Front-end
Tecnologia	Utilização
React	Construção da interface
React Router DOM	Roteamento e páginas protegidas
Axios	Comunicação com a API REST
Vite	Ambiente de desenvolvimento e build
JavaScript	Lógica da aplicação
CSS3	Estilização
date-fns	Manipulação e formatação de datas
Font Awesome	Ícones
Back-end

O front-end foi desenvolvido para consumir uma API REST em Laravel, responsável pela autenticação e gerenciamento dos dados.

Principais tecnologias do backend:

PHP
Laravel
Laravel Sanctum
Eloquent ORM
MySQL/PostgreSQL
REST API
🔄 Arquitetura

A aplicação utiliza uma arquitetura separando o front-end da API:

┌─────────────────────────┐
│       React + Vite      │
│                         │
│  Interface / Componentes│
│  React Router           │
│  Axios                  │
└────────────┬────────────┘
             │
             │ HTTP / REST API
             ▼
┌─────────────────────────┐
│       Laravel API       │
│                         │
│ Controllers             │
│ Models / Eloquent       │
│ Authentication / Sanctum│
│ Business Rules          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Database         │
│     PostgreSQL/MySQL    │
└─────────────────────────┘

Essa separação permite que o front-end e o back-end sejam desenvolvidos, testados e hospedados de forma independente.
