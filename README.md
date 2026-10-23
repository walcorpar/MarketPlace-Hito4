# MarketPlace - Hito 4

Proyecto full-stack de una plataforma e-commerce de velas artesanales desarrollada con **Node.js, Express, PostgreSQL** en el backend y **React con Vite** en el frontend.

---

## 🚀 Enlaces del Proyecto Desplegado

- **Frontend (Sitio Web):** [https://front-market.onrender.com/](https://front-market.onrender.com/)
- **Backend (API REST):** [https://back-market-38t1.onrender.com/](https://back-market-38t1.onrender.com/)
- **Base de Datos:** PostgreSQL en Render (`marketplace_t7aq`)

---

## 📁 Estructura del Proyecto

```text
.
├── back_market/             # API Backend (Node.js + Express)
│   ├── BD/                  # Scripts SQL de estructura y carga de datos
│   │   ├── schema.sql       # Creación de tablas y relaciones
│   │   └── seed.sql         # Datos de prueba
│   ├── src/
│   │   ├── config/          # Conexión a la BD (pg Pool con SSL)
│   │   ├── controllers/     # Controladores (auth, posts, favs)
│   │   ├── middlewares/     # Middlewares de autenticación (JWT)
│   │   ├── routes/          # Rutas de la API REST
│   │   └── app.js           # Servidor principal de Express
│   ├── .env_ejemplo         # Plantilla de variables de entorno
│   └── package.json
│
├── front_market/            # Cliente Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # Tarjetas y componentes reutilizables
│   │   ├── context/         # Contextos de React (UserContext, PostsContext)
│   │   ├── services/        # Cliente API (Axios / Fetch)
│   │   ├── views/           # Páginas (Home, Login, Register, Profile, etc.)
│   │   ├── App.jsx          # Rutas del cliente con React Router
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

🛠️ Tecnologías Utilizadas
Backend: Node.js, Express, PostgreSQL (pg), JSON Web Token (jsonwebtoken), Bcryptjs, CORS, Dotenv.

Frontend: React, Vite, React Router DOM, Context API.

Despliegue e Infraestructura: Render (Web Service, Static Site y Managed PostgreSQL).

`Backend (back_market/.env)`
PORT=3000
DATABASE_URL=postgresql://usuario:password@host.oregon-postgres.render.com/marketplace_db
JWT_SECRET=tu_clave_secreta_aqui

`Frontend (front_market/.env)`
VITE_API_URL=[https://back-market-38t1.onrender.com](https://back-market-38t1.onrender.com)

⚙️ Ejecución en Entorno Local
Clonar el repositorio:

```Bash
git clone [https://github.com/walcorpar/MarketPlace-Hito4.git](https://github.com/walcorpar/MarketPlace-Hito4.git)
cd MarketPlace-Hito4
```

Backend:
```Bash
cd back_market
npm install
npm run dev  # O npm start
```

Frontend:
```Bash
cd ../front_market
npm install
npm run dev
```
