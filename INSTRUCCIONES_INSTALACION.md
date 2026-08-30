# 🎮 GUÍA DE INSTALACIÓN Y USO — LVLUP GAME BAR
> **Manual paso a paso para instalar, ejecutar y administrar la plataforma web de LVLUP.**  
> *Diseñado para que cualquier persona pueda ponerlo a funcionar en 5 minutos sin complicaciones.*

---

## 📑 Tabla de Contenidos
1. [Requisitos Previos](#-1-requisitos-previos)
2. [Instalación Rápida Paso a Paso](#-2-instalación-rápida-paso-a-paso)
   - [Paso 1: Clonar el proyecto](#paso-1-clonar-o-descargar-el-proyecto)
   - [Paso 2: Configurar el Servidor (Backend)](#paso-2-configurar-el-servidor-backend)
   - [Paso 3: Configurar la Web (Frontend)](#paso-3-configurar-la-web-frontend)
3. [URLs de Acceso](#-3-urls-de-acceso)
4. [👑 Manual del Panel de Administración (CMS)](#-4-manual-del-panel-de-administración-cms)
   - [Cómo entrar al panel](#cómo-entrar-al-panel)
   - [Gestión de Menú (Comidas, Bebidas y Cócteles)](#1-gestión-de-menú-gastronómico)
   - [Subida de Fotos con Compresión Automática](#2-subida-de-fotos-y-optimización)
   - [Gestión de Zona Gaming & Consolas](#3-gestión-de-zona-gaming)
   - [Gestión de Promociones & Eventos](#4-promociones-y-happy-hours)
   - [Información del Local, Horarios y WhatsApp](#5-información-general-y-contacto)
   - [Galería de Fotos del Local](#6-galería-interactiva)
5. [🛒 Cómo Funciona el Carrito y Pedidos por WhatsApp](#-5-cómo-funciona-el-carrito-y-pedidos-por-whatsapp)
6. [🛠️ Solución de Problemas Frecuentes (FAQ)](#-6-solución-de-problemas-frecuentes)

---

## 💻 1. Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

1. **Node.js (versión 18 o superior):**  
   👉 [Descargar Node.js](https://nodejs.org/) *(Elige la versión recomendada LTS e instálala dando siguiente, siguiente...)*
2. **PostgreSQL:**  
   👉 [Descargar PostgreSQL](https://www.postgresql.org/download/) *(O usa pgAdmin / Docker si ya lo tienes).*  
   *Nota: Necesitas tener una base de datos creada llamada `lvlup_db`.*
3. **Git:** *(Opcional si descargas el ZIP)*  
   👉 [Descargar Git](https://git-scm.com/)

---

## ⚡ 2. Instalación Rápida Paso a Paso

### Paso 1: Clonar o Descargar el Proyecto
Abre tu terminal (PowerShell o Git Bash) y clona el repositorio:
```bash
git clone https://github.com/00Gabriela00/LVLUP.git
cd LVLUP
```

---

### Paso 2: Configurar el Servidor (Backend)

1. Entra a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea el archivo de variables de entorno `.env`:
   - Copia el archivo `.env.template` y nómbralo `.env` (o crea un archivo `.env` en la carpeta `backend/`).
   - Contenido del archivo `.env`:
   ```env
   # Reemplaza USUARIO y CONTRASEÑA con los de tu PostgreSQL local
   DATABASE_URL="postgresql://postgres:admin123@localhost:5432/lvlup_db?schema=public"

   PORT=3000
   NODE_ENV=development
   JWT_SECRET="lvlup_secreto_super_seguro_2026"
   ```

4. Genera la estructura de la base de datos con Prisma:
   ```bash
   npx prisma db push
   ```

5. Carga todo el catálogo inicial (Cócteles de autor, Burgers Angus, Consolas PS5/Switch, Promociones y Horarios):
   ```bash
   npm run seed
   ```

6. Inicia el servidor backend en modo desarrollo:
   ```bash
   npm run dev
   ```
   ✅ *Verás el mensaje: `🚀 Servidor LVL UP escuchando en http://localhost:3000`*

---

### Paso 3: Configurar la Web (Frontend)

1. Abre una **segunda ventana de terminal** y entra a la carpeta `frontend`:
   ```bash
   cd LVLUP/frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación web:
   ```bash
   npm run dev
   ```
   ✅ *Vite te mostrará el enlace local: `http://localhost:5173/`*

---

## 🌐 3. URLs de Acceso

| Módulo | Enlace Local | Descripción |
| :--- | :--- | :--- |
| 🎮 **Web Principal de Clientes** | `http://localhost:5173/` | Landing page moderna con menú, carrito de compras, zona gaming, galería y ubicación. |
| 👑 **Panel de Administración (CMS)** | `http://localhost:5173/admin` | Panel de control para editar precios, fotos, platos, consolas y horarios en tiempo real. |
| ⚙️ **API Backend** | `http://localhost:3000/api/health` | Estado del backend y base de datos. |

---

## 👑 4. Manual del Panel de Administración (CMS)

### Cómo entrar al panel:
1. Abre tu navegador y ve a `http://localhost:5173/admin`  
   *(O haz clic en el botón **"Panel Admin"** en la barra superior o en la barra flotante de la web).*

---

### 1. Gestión de Menú Gastronómico
En la pestaña **"Menú"** puedes gestionar todos los productos del bar:
- ➕ **Crear Nuevo Plato o Bebida:** Haz clic en **"+ Nuevo Ítem"**. Elige la categoría (Coctelería, Burgers, Sushi Rolls, Snacks, Cervezas o Sin Alcohol).
- ✏️ **Editar Precio o Descripción:** Haz clic en el ícono de lápiz en cualquier tarjeta para actualizar precios en dólares ($), ingredientes o recetas.
- ⚡ **Disponibilidad Inmediata:** Si un ingrediente se agotó, desmarca la casilla **"Disponible"** y el producto aparecerá como agotado para los clientes al instante.
- ⭐ **Marcar como Popular:** Activa la estrella para que aparezca en la sección de favoritos destacados en la web.
- 🗑️ **Eliminar:** Si ya no vendes un producto, puedes eliminarlo con un solo clic.

---

### 2. Subida de Fotos y Optimización
El panel cuenta con un **sistema inteligente de compresión de imágenes**:
- Puedes **arrastrar y soltar** cualquier imagen o foto tomada desde el celular (JPG, PNG, WebP).
- El sistema automáticamente la comprime y redimensiona para que cargue ultrarrápido sin perder calidad.
- También puedes pegar una URL de imagen externa si lo prefieres.

---

### 3. Gestión de Zona Gaming
En la pestaña **"Gaming"**:
- 🎮 **Tarifas de Consolas:** Cambia el precio de 30 minutos o 1 hora para PlayStation 5 y Nintendo Switch.
- 🕹️ **Lista de Juegos:** Añade títulos nuevos que compren para el local (ej. *FC 25, Mortal Kombat 1, Mario Kart 8, Super Smash Bros*) o elimina los que ya no estén disponibles.
- 🟢 **Estado de Consolas:** Cambia el estado a *Disponible* o *En Mantenimiento*.

---

### 4. Promociones y Happy Hours
En la pestaña **"Promos"**:
- 🎉 **Crear Ofertas:** Configura promociones como *Happy Hour 2x1 en Cócteles*, *Gamer Pack (1h + Burger + Bebida)*, etc.
- 🗓️ **Días y Horas Activas:** Define qué días de la semana aplica (ej. Lunes a Jueves de 4pm a 7pm).
- 🏷️ **Etiquetas:** Agrega badges llamativos como *"MÁS VENDIDO"* o *"2X1"*.
- 👁️ **Visibilidad:** Activa o desactiva la promo con el interruptor cuando termine la temporada.

---

### 5. Información General y Contacto
En la pestaña **"Información"**:
- 📱 **WhatsApp de Pedidos:** Coloca el número de WhatsApp oficial del negocio con código de país (ej. `+584121234567`). Todos los pedidos del carrito llegarán automáticamente a este número.
- 📍 **Dirección y Ubicación:** Modifica la dirección física y el enlace de Google Maps.
- 📷 **Redes Sociales:** Actualiza el usuario de Instagram y TikTok.
- ⏰ **Horarios por Día:** Configura el horario de apertura y cierre de cada día de la semana (ej. Viernes 4:00 PM - 2:00 AM).

---

### 6. Galería Interactiva
En la pestaña **"Galería"**:
- 📸 Sube fotos de clientes pasándola bien, torneos, tragos preparados y el local.
- Agrega un título a cada foto (ej. *"Torneo de Smash Bros fin de semana"*).
- Las fotos se muestran en un carrusel interactivo en la página principal.

---

## 🛒 5. Cómo Funciona el Carrito y Pedidos por WhatsApp

1. El cliente entra a la web desde su celular o computadora.
2. Navega por el menú interactivo con filtros por categoría (Cócteles, Burgers, Sushi, etc.).
3. Hace clic en **"Agregar al Pedido"**.
4. Se abre el **Carrito de Compras** en el lateral derecho donde puede sumar cantidades, añadir notas especiales (ej. *"sin cebolla"* o *"trago poco dulce"*), seleccionar si está en una mesa del local o es para llevar.
5. Al hacer clic en **"Enviar Pedido por WhatsApp"**, se abre WhatsApp con el mensaje perfectamente formateado y el total en dólares y bolívares listo para que el bar lo prepare.

---

## 🛠️ 6. Solución de Problemas Frecuentes

### ❓ Error de conexión a la base de datos (PostgreSQL)
- **Causa:** El usuario o contraseña en el archivo `.env` no coinciden con tu PostgreSQL.
- **Solución:** Abre `backend/.env` y revisa que `DATABASE_URL` tenga tu contraseña correcta. Por ejemplo:  
  `DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/lvlup_db?schema=public"`

### ❓ "El puerto 3000 o 5173 ya está en uso"
- **Solución:** Cierra otras ventanas de terminal abiertas o cambia el puerto en el archivo `.env` del backend.

### ❓ ¿Cómo restauro los datos de fábrica si borré algo sin querer?
- **Solución:** En la terminal de `backend`, ejecuta:
  ```bash
  npm run seed
  ```
  Esto recargará todos los productos, cócteles, consolas y horarios originales de LVLUP.

---

✨ **¡Listo! Disfruta de la plataforma de LVLUP Game Bar.**  
*Hecho con ❤️ para una experiencia gastronómica y gaming de nivel superior.*
