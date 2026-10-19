# Marketplace (Vel-Art) — Hito 4: Integración y Despliegue

Este repositorio contiene el proyecto integrador **Marketplace (Vel-Art)** desplegado en producción, incluyendo la aplicación cliente **Frontend** (React + Vite), el servidor **Backend** (Node.js/Express) y la **Base de Datos PostgreSQL** en la nube.

---

## 🚀 Enlaces en Producción

- **Aplicación Cliente (Frontend):** `https://tu-frontend.onrender.com` *(se actualizará al desplegar)*
- **API REST (Backend):** `https://tu-backend.onrender.com` *(se actualizará al desplegar)*

---

## 📋 Descripción del Desafío

El cuarto hito consiste en la integración total y el despliegue a internet de todas las capas de la aplicación:
1. **Despliegue de la Base de Datos PostgreSQL:** Configuración e inicialización de tablas en la nube.
2. **Despliegue de la API Backend:** Configuración del servidor Node.js/Express conectado a la base de datos de producción.
3. **Despliegue de la Aplicación Cliente:** Construcción y publicación del Frontend en React.
4. **Integración End-to-End:** Comunicación fluida entre el cliente y el servidor en producción, garantizando la persistencia de datos y el flujo completo de autenticación JWT.

---

## 🛠️ Tecnologías y Servicios en la Nube

- **Plataforma de Despliegue:** Render.com
- **Base de Datos:** PostgreSQL (Render Cloud Database)
- **Backend Framework:** Node.js, Express, `pg`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`
- **Frontend Framework:** React 18 (Vite), React Router DOM (v6), Context API, Bootstrap 5
- **Cliente HTTP:** Axios (con interceptores para Token JWT)

---

## 📁 Estructura del Proyecto

```text
.
├── back_market/          # Servidor de API REST (Node.js / Express)
│   ├── BD/               # Scripts SQL de estructura e inicialización
│   ├── src/              # Configuración DB, controladores, middlewares y rutas
│   ├── test/             # Pruebas unitarias/integración con Jest y Supertest
│   └── package.json
│
└── front_market/         # Aplicación cliente (React / Vite)
    ├── public/           # Recursos estáticos
    ├── src/
    │   ├── assets/       # Imágenes y recursos gráficos
    │   ├── components/   # Componentes reutilizables (Navbar, Cards, Modales)
    │   ├── context/      # Proveedores de Estado Global (UserContext, PostsContext)
    │   ├── services/     # Configuración de Axios (api.js)
    │   └── views/        # Vistas (Home, Login, Register, Profile, CreatePost, etc.)
    ├── index.html
    └── package.json
```

🌐 Endpoints y Rutas del Sistema
API Backend (Servidor)
POST /login — Autenticación de usuario y entrega de Token JWT.

POST /users — Registro de nuevos usuarios.

GET /posts — Obtener catálogo general de publicaciones.

GET /posts/:id — Detalle de una publicación específica.

GET /users/me — Perfil del usuario (Ruta privada - JWT).

POST /posts — Crear publicación (Ruta privada - JWT).

GET /favorites — Obtener favoritos del usuario (Ruta privada - JWT).

Navegación Frontend (Cliente)
/ o /posts — Catálogo general de velas y publicaciones.

/posts/:id — Vista de detalle del producto.

/login — Formulario de inicio de sesión.

/register — Formulario de registro.

/profile — Perfil del usuario autenticado (Protegida).

/create-post — Formulario de creación de publicación (Protegida).

💻 Instrucciones de Ejecución Local
1. Servidor Backend (back_market)

cd back_market
npm install
npm run dev

2. Cliente Frontend (front_market)
En una nueva terminal:

cd front_market
npm install
npm run dev

Acceder en el navegador a http://localhost:5173.