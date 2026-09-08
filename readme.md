# LVLUP — Game Bar & Gastro-Lounge Digital Platform

Plataforma full-stack empresarial desarrollada para **LVLUP Game Bar & Lounge**. Integra una aplicación web interactiva de alto rendimiento visual orientada a clientes, catálogo gastronómico dinámico, sistema de promociones en tiempo real y un panel de administración centralizado (CMS) con autenticación basada en tokens JWT y almacenamiento en PostgreSQL.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.2-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.9-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

---

## Modulos del Sistema

### 1. Plataforma Web para Clientes (Frontend SPA)
- **Interfaz Inmersiva:** Estructura visual basada en Dark UI Cyberpunk con tipografía Chakra Petch y transiciones aceleradas por hardware (`framer-motion`).
- **Menu Digital Interactivo:** Filtrado en memoria por categorías (Coctelería de Autor, Hamburguesas Gourmet, Sushi, Snacks y Servicios de Botellas).
- **Tarifario Gaming:** Visualización de estaciones PlayStation 5 y Nintendo Switch con precios por bloques de 30 y 60 minutos.
- **Modulo de Promociones:** Ticker informativo continuo y tarjetas de beneficios semanales calculadas dinámicamente.
- **Optimizacion SEO & OpenGraph:** Integración de metadatos estandarizados, Twitter Cards, Schema.org (JSON-LD para BarOrPub), `robots.txt` y `sitemap.xml`.

### 2. Panel Administrativo Central (CMS / Backoffice)
- **Autenticacion y Control de Acceso:** Acceso protegido mediante JSON Web Tokens (JWT) firmados, almacenamiento en sesión local y verificación en cada recarga de vista.
- **Proteccion contra Fuerza Bruta:** Limitación estricta de peticiones en endpoints de acceso y bloqueo temporal automático de formulario tras intentos fallidos reiterados.
- **Gestion de Carta y Precios:** Creación, edición, alternancia de disponibilidad de stock y marcado de platos destacados.
- **Control de Tarifas Gaming:** Ajuste granular de precios de alquiler por hora y media hora.
- **Actualizacion de Parametros Comerciales:** Modificación directa de canales de contacto, redes sociales y horarios de operación del establecimiento.

---

## Arquitectura del Proyecto

El repositorio implementa una estructura desacoplada con separación de responsabilidades:

```text
LVLUP/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Definicion del modelo relacional en PostgreSQL
│   │   └── seed.ts                # Semilla de datos iniciales del establecimiento
│   └── src/
│       ├── config/                # Configuracion de variables de entorno tipadas
│       ├── core/                  # Middlewares de seguridad, CORS, rate limiting y sanitizacion
│       ├── modules/
│       │   ├── auth/              # Controlador, servicio y repositorio de administradores
│       │   ├── menu/              # Logica de negocio y endpoints del catalogo
│       │   ├── gaming/            # Tarifas y gestion de estaciones
│       │   ├── promos/            # Administracion de promociones vigentes
│       │   ├── business/          # Informacion institucional y horarios
│       │   └── upload/            # Gestion y almacenamiento de archivos estaticos
│       └── index.ts               # Punto de entrada de la API REST
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg            # Isotipo vectorial de la marca
│   │   ├── og-image.png           # Imagen de previsualizacion en redes sociales (1200x630)
│   │   ├── robots.txt             # Politicas de indexacion para motores de busqueda
│   │   └── sitemap.xml            # Mapa del sitio para indexacion
│   └── src/
│       ├── application/           # Contextos globales de React y proveedores de estado
│       ├── domain/                # Tipos e interfaces centrales del dominio
│       ├── infrastructure/        # Clientes HTTP, servicios y datos de respaldo
│       └── presentation/          # Componentes visuales, layouts y vistas principales
│
├── docker-compose.yml             # Orquestacion de servicios (PostgreSQL 16 Alpine)
└── package.json                   # Scripts unificados de gestion del workspace
```

---

## Pila Tecnologica

| Capa | Tecnologia | Funcion |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons | Renderizado reactivo, diseño visual y experiencia de usuario. |
| **Backend** | Node.js, Express 5, TypeScript | API RESTful orientada a servicios con arquitectura modular. |
| **Persistencia** | PostgreSQL 16, Prisma ORM 7 | Base de datos relacional y mapeo de datos con migraciones tipadas. |
| **Seguridad** | Helmet, Express Rate Limit, Bcrypt, JsonWebToken, CORS | Cabeceras HTTP estrictas, cifrado unidireccional y control de accesos. |
| **Contenedores** | Docker, Docker Compose | Entorno de persistencia local estandarizado. |

---

## Instalacion y Ejecucion Local

### Requisitos Previos
- Node.js 20.0 o superior
- Docker Desktop en ejecucion (para la base de datos PostgreSQL)
- Gestor de paquetes npm

### 1. Iniciar la Base de Datos
Desde el directorio raíz del proyecto:

```bash
npm run db:up
```

### 2. Configurar el Backend
```bash
cd backend
npm install
npm run db:setup
```

El comando `db:setup` sincroniza el esquema con PostgreSQL mediante Prisma y ejecuta el script de siembra (`seed.ts`) con el catálogo inicial y el usuario administrador por defecto.

### 3. Iniciar Servicios en Desarrollo
Desde la raíz del proyecto, puedes iniciar ambos entornos de manera independiente:

```bash
# Terminal 1: Servidor API Backend (Puerto 3000)
npm run backend

# Terminal 2: Aplicacion Web Frontend (Puerto 5173)
npm run frontend
```

- **Plataforma Web:** `http://localhost:5173`
- **Panel Administrativo:** `http://localhost:5173/admin`
- **API Health Check:** `http://localhost:3000/api/health`

---

## Variables de Entorno

Archivo de configuracion en `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/lvlup_db?schema=public"
PORT=3000
NODE_ENV=development
JWT_SECRET="clave_secreta_para_firmado_de_tokens_jwt"
```

---

## Politica de Seguridad

- **Cabeceras HTTP:** Implementación de Content Security Policy (CSP), HTTP Strict Transport Security (HSTS) a un año, `X-Content-Type-Options: nosniff` y desactivación de divulgación de tecnología (`hidePoweredBy`).
- **Limites de Trafico:** Rate limiting estricto de 10 peticiones cada 15 minutos en el endpoint `/api/auth/login` y 120 peticiones por minuto en rutas públicas.
- **Manejo de Errores:** En entornos de producción no se exponen trazas internas de la base de datos ni detalles del servidor, retornando únicamente respuestas en formato JSON estandarizado.

---

## Creditos y Propiedad Intelectual

Desarrollado por **GStudio Devs** para **LVLUP Game Bar & Lounge**. Todos los derechos reservados. Prohibida la redistribución no autorizada del código fuente.
