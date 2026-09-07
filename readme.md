# 🎮 LVL UP — Game Bar & Gastro-Lounge Digital Platform

> **Plataforma Full-Stack integral para LVL UP Game Bar**: Web interactiva de alto impacto visual (Cyber-lounge / Dark Crimson), menú digital interactivo con carrito de compras y checkout por WhatsApp, panel de administración CMS en tiempo real para gestión total del negocio sin tocar código.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 📖 Guía Rápida para Principiantes

👉 **Si buscas una guía paso a paso explicada con peras y manzanas para instalar todo en 5 minutos, consulta:**  
**[INSTRUCCIONES_INSTALACION.md](./INSTRUCCIONES_INSTALACION.md)**

---

## ✨ Características Principales

### 🍹 Experiencia Web del Cliente (Frontend)

- **Diseño Cyber-Lounge Dark Crimson & Cyan:** Estética inmersiva de videojuegos con animaciones suaves (`framer-motion`), efectos glow y diseño 100% responsivo.
- **Menú Gastronómico Interactivo con Tabs:** Filtrado por Cócteles de Autor, Burgers Angus 180g, Sushi Rolls Especiales, Snacks & Cervezas.
- **Zona Gaming & Tarifas:** Tarifas actualizadas por 30m / 1h para consolas Next-Gen (PlayStation 5 en 4K HDR, Nintendo Switch Lounge) con catálogo de juegos.
- **Promociones Activas & Happy Hours:** Banners dinámicos con horarios y días específicos (ej. 2x1 en cócteles).
- **Galería Visual & Ubicación:** Horarios de atención en vivo por día, mapa interactivo y redes sociales.
- **Carrito de Compras & Checkout WhatsApp:** Pedidos directos desglosados en USD ($) con notas especiales para la barra y mesa.

### 👑 Panel de Administración CMS en Vivo (`/admin`)

- **Gestión Completa de Menú:** Crear, editar precios, descripciones, categorías, disponibilidad y destacados.
- **Subida y Compresión de Fotos Automática:** Optimización instantánea de imágenes subidas desde PC o móvil.
- **Gestión de Consolas y Videojuegos:** Actualización de precios por tiempo y lista de juegos disponibles.
- **Promociones y Ofertas:** Creación y activación de promociones con fechas y horarios.
- **Información del Negocio:** Configuración de WhatsApp de pedidos, redes sociales y horarios de apertura.
- **Galería del Local:** Carga y administración de fotografías de eventos y ambiente.

---

## 🚀 Inicio Rápido (Quick Start)

### 1. Servidor Backend

```bash
cd backend
npm install
# Crear archivo .env basado en .env.template
npx prisma db push
npm run seed
npm run dev
```

_Servidor activo en: `http://localhost:3000`_

### 2. Aplicación Frontend

```bash
cd frontend
npm install
npm run dev
```

_Web activa en: `http://localhost:5173`_  
_Panel de administración: `http://localhost:5173/admin`_

---

## 🏗️ Arquitectura del Proyecto

```text
LVLUP/
├── backend/                  # Servidor API RESTful con Express & Prisma
│   ├── prisma/
│   │   ├── schema.prisma     # Esquema de base de datos PostgreSQL
│   │   └── seed.ts           # Carga de datos iniciales del catálogo
│   └── src/
│       ├── core/             # Middlewares, seguridad, Prisma Client
│       └── modules/          # Módulos desacoplados
│           ├── auth/         # Autenticación JWT y administración
│           ├── menu/         # Gestión de platos y bebidas
│           ├── gaming/       # Consolas, tarifas y juegos
│           ├── promos/       # Promociones y eventos
│           ├── business/     # Información general, horarios y galería
│           └── upload/       # Subida y optimización de imágenes
│
├── frontend/                 # Aplicación SPA React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── application/      # Contextos y estado global reactivo
│   │   ├── domain/           # Modelos de datos y puertos
│   │   ├── infrastructure/   # Repositorios, clientes API, mock data
│   │   └── presentation/     # Componentes visuales, layouts y páginas
│   │       ├── components/   # Secciones (Hero, Menu, Gaming, Promos, etc.)
│   │       └── pages/        # LandingPage y AdminPortal
│   └── public/               # Favicons y recursos públicos
│
├── INSTRUCCIONES_INSTALACION.md # Guía para novatos y administradores
└── README.md
```

---

## 🔒 Variables de Entorno (`backend/.env`)

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/lvlup_db?schema=public"
PORT=3000
NODE_ENV=development
JWT_SECRET="lvlup_secreto_super_seguro_2026"
```

---

## 📄 Licencia

Desarrollado para **LVL UP Game Bar**. Todos los derechos reservados.
