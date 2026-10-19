import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const initialForm = { name: '', email: '', password: '', city: '', picture: '' };

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api.post('/users', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        city: form.city.trim() || null,
        picture: form.picture.trim() || null,
      });
      navigate('/login', { replace: true, state: { message: 'Tu cuenta fue creada. Ya puedes iniciar sesión.' } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo crear tu cuenta. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <div className="auth-card__mark" aria-hidden="true">V</div>
        <p className="eyebrow">BIENVENIDO A VEL-ART</p>
        <h1>Una comunidad hecha a mano</h1>
        <p className="muted-copy">Crea tu cuenta para descubrir productos o compartir tus propias creaciones.</p>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="register-name">Nombre</label>
          <input className="form-control" id="register-name" name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" maxLength="100" required />
          <label className="form-label mt-3" htmlFor="register-email">Correo electrónico</label>
          <input className="form-control" id="register-email" type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="tu@correo.com" required />
          <label className="form-label mt-3" htmlFor="register-password">Contraseña</label>
          <input className="form-control" id="register-password" type="password" name="password" autoComplete="new-password" value={form.password} onChange={handleChange} placeholder="Elige una contraseña" required />
          <div className="form-row">
            <div>
              <label className="form-label mt-3" htmlFor="register-city">Ciudad <span className="optional-label">Opcional</span></label>
              <input className="form-control" id="register-city" name="city" autoComplete="address-level2" value={form.city} onChange={handleChange} placeholder="Tu ciudad" />
            </div>
            <div>
              <label className="form-label mt-3" htmlFor="register-picture">Foto de perfil <span className="optional-label">URL opcional</span></label>
              <input className="form-control" id="register-picture" type="url" name="picture" value={form.picture} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
          <button className="btn btn-submit w-100 mt-4" type="submit" disabled={submitting}>{submitting ? 'Creando cuenta...' : 'Crear mi cuenta'}</button>
        </form>
        <p className="auth-card__bottom">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
      </section>
    </main>
  );
}
