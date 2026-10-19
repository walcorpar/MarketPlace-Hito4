import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import { PostsProvider } from './context/PostsContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';
import PostDetail from './views/PostDetail';
import CreatePost from './views/CreatePost';
import './styles.css';

function NavigationBar() {
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark site-navbar">
      <div className="container">
        <Link className="navbar-brand brand-mark" to="/" aria-label="Vel-Art, inicio">
          <span className="brand-mark__icon">V</span>
          <span>vel-art<small>MARKETPLACE ARTESANAL</small></span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Abrir navegación">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className="nav-link" to="/" end>Explorar</NavLink>
          {token ? (
            <>
              <NavLink className="nav-link" to="/profile">Mi espacio</NavLink>
              <Link className="btn btn-nav-primary" to="/create-post">+ Publicar</Link>
              <button onClick={handleLogout} className="btn btn-nav-outline">Cerrar sesión</button>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">Ingresar</NavLink>
              <Link className="btn btn-nav-primary" to="/register">Crear cuenta</Link>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <UserProvider>
      <PostsProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
            </Route>
            <Route path="*" element={<main className="container page-status"><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></main>} />
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </UserProvider>
  );
}

export default App;
