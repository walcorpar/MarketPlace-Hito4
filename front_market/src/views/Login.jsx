import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo iniciar sesión. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card__mark" aria-hidden="true">V</div>
        <p className="eyebrow">QUÉ BUENO VERTE DE NUEVO</p>
        <h1>Ingresa a tu cuenta</h1>
        <p className="muted-copy">Continúa descubriendo y compartiendo creaciones únicas.</p>
        {location.state?.message && <div className="alert alert-success" role="status">{location.state.message}</div>}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="login-email">Correo electrónico</label>
          <input className="form-control" id="login-email" type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="tu@correo.com" required />
          <label className="form-label mt-3" htmlFor="login-password">Contraseña</label>
          <input className="form-control" id="login-password" type="password" name="password" autoComplete="current-password" value={form.password} onChange={handleChange} placeholder="Tu contraseña" required />
          <button className="btn btn-submit w-100 mt-4" type="submit" disabled={submitting}>{submitting ? 'Ingresando...' : 'Ingresar'}</button>
        </form>
        <p className="auth-card__bottom">¿Aún no tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </section>
    </main>
  );
}
