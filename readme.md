# 🎮 LVL UP — Bar & Gaming Hub

Plataforma web full-stack para **LVL UP**, un bar & game center con coctelería temática, comida, consolas (PS5, Nintendo Switch), mesas de pool y ping-pong.

---

## 📌 Funcionalidades

### Client Web

- **Status en vivo:** Estado del bar (`Abierto` / `Cerrado` / `% ocupación`).
- **Catálogo de Juegos:** Filtro por consola (PS5, Switch) y mesas (Pool, Ping-Pong).
- **Menú Interactivo:** Comida y tragos con stats (`Potencia`, `Dulzura`, alérgenos).
- **Torneos & Leaderboards:** Calendario de eventos con cuenta regresiva y tabla de campeones.
- **Sistema de Reservas:** Formulario para reservar áreas (PS5, Switch, Pool).

### Panel Admin

- **Gestión de Stock:** Activar/desactivar ítems del menú en tiempo real.
- **Control de Reservas:** Aprobar o rechazar solicitudes.
- **Gestión de Torneos:** Registro de participantes y resultados.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **UI Components:** shadcn/ui (Radix UI)
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma
- **Other:** CORS, dotenv

## 📁 Estructura Propuesta

Para no terminar con un código espagueti inmanejable, vamos a usar una **arquitectura basada en características (Feature-Sliced)** en el frontend y una **arquitectura modular (tipo Clean/Hexagonal)** en el backend.

### Frontend (`frontend/src/`)

```text
frontend/src/
├── app/               # Setup global (rutas, store, providers)
├── components/        # Componentes UI compartidos (shadcn, botones, inputs)
├── features/          # Módulos por dominio de negocio
│   ├── games/         # Todo lo relacionado a juegos/consolas
│   └── reservations/  # Todo lo relacionado a reservas
│       ├── components/# Componentes específicos de esta feature
│       ├── hooks/     # Lógica de negocio (custom hooks)
│       ├── services/  # Llamadas a la API
│       └── types.ts   # Interfaces TypeScript
├── layouts/           # Plantillas principales (Client, Admin)
├── lib/               # Utilidades globales (axios config, cn)
└── assets/            # Imágenes, íconos, css globales
```

### Backend (`backend/src/`)

```text
backend/src/
├── config/            # Variables de entorno y configuración
├── core/              # Errores custom, middlewares globales
├── modules/           # Módulos por dominio
│   ├── menu/
│   └── reservations/
│       ├── controller.ts  # Capa de red (recibe req, envía res)
│       ├── service.ts     # Lógica de negocio pura
│       ├── repository.ts  # Acceso a datos (Prisma)
│       └── router.ts      # Definición de rutas Express
└── index.ts           # Entry point de la aplicación
```
