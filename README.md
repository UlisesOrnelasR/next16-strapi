# 🚀 next16-strapi

App fullstack con **Next.js 16** (frontend) y **Strapi** (backend).  
Incluye autenticación básica, protección de rutas con un archivo `proxy.ts`, UI con **shadcn/ui + TailwindCSS** y validaciones con **Zod**.

> ⚠️ **Estado actual:**
>
> - Solo está implementado el **registro de usuario** mediante una **Server Action**.
> - **Falta implementar la función de login** y completar el flujo de autenticación (login/logout).

---

## 🧱 Stack Tecnológico

- ⚛️ **Next.js 16** (App Router)
- 🧩 **Strapi** como CMS / API
- 🟦 **TypeScript**
- 🎨 **TailwindCSS**
- 🧱 **shadcn/ui**
- ✅ **Zod** para validaciones
- 🛠️ **Next.js Server Actions** (auth, registro, cookies, redirect)
- 🌐 Fetch hacia Strapi desde helpers en `lib/strapi`
- 🧱 Archivo **`proxy.ts`** en la raíz para proteger rutas

---

## ✨ Características principales

- 👤 **Registro de usuario** contra la API de Strapi usando una **Server Action** (`registerUserAction`):

  - Valida datos del formulario con **Zod** (`SignupFormSchema`).
  - Maneja errores de validación y de Strapi.
  - Crea una cookie `jwt` **HttpOnly** y redirige al `/dashboard`.

- 🧪 **Validaciones con Zod**:

  - Validación de campos del formulario en el servidor.
  - Devuelve errores estructurados para mostrarlos en el UI.

- 🔐 **Rutas protegidas con `proxy.ts`**:

  - Archivo en la raíz del proyecto que actúa como una especie de _middleware_.
  - Protege rutas como `/dashboard` comprobando:
    - Si existe un **JWT** en las cookies.
    - Si el usuario es válido en Strapi (`/api/users/me`).
  - Si no está autenticado, redirige a `/signin`.

- 🌍 **Comunicación con Strapi via `fetch`**:

  - Helpers centralizados en `lib/strapi.ts`:
    - `getStrapiData` para hacer fetch genérico.
    - `getHomePage` con configuración de caché (`"use cache"` y `cacheLife`).
    - `registerUserService` para registrar usuarios en `/api/auth/local/register`.

- 🎛️ **UI base con shadcn/ui + TailwindCSS**:
  - Componentes reutilizables y estilado consistente.

---

## 🛣️ Pendiente por hacer (Roadmap)

- 🔑 **Agregar login**:

  - Crear Server Action de login.
  - Guardar JWT y datos necesarios en cookies.
  - Manejar errores de credenciales.

- 🚪 **Agregar logout**:

  - Limpiar cookie `jwt`.
  - Redirigir al usuario a la página pública (por ejemplo, `/` o `/signin`).

- 🖥️ **Elaborar la landing page**:

  - Construir la landing principal usando **Strapi CMS** para administrar el contenido (secciones, hero, texto, etc.).
  - Consumir ese contenido desde Next.js usando los helpers de `lib/strapi.ts`.

- 📊 **Agregar funcionalidades al dashboard**:
  - Mostrar información acorde a lo que se ofrezca en la landing page.
  - Ejemplo: si la landing ofrece un servicio X, el dashboard mostraría estadísticas, configuraciones o acciones relacionadas con ese servicio.

---

## 📁 Estructura general del proyecto

```bash
next16-strapi/
├── frontend/         # App de Next.js 16
│   ├── app/          # Rutas, pages, layouts
│   ├── lib/          # Helpers, como lib/strapi.ts
│   ├── validations/  # Schemas de Zod
│   └── proxy.ts      # Middleware/proxy para proteger rutas
└── backend/          # API/CMS con Strapi
```
