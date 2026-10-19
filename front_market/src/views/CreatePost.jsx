import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PostsContext } from '../context/PostsContext';

const initialForm = { title: '', description: '', price: '', category: '', img_url: '' };

export default function CreatePost() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { refreshPosts } = useContext(PostsContext);
  const navigate = useNavigate();

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await api.post('/posts', {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category.trim() || null,
        img_url: form.img_url.trim() || null,
      });
      refreshPosts().catch(() => {});
      navigate(`/posts/${data.post.id}`, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo publicar el producto. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container form-page">
      <Link className="back-link" to="/profile">← Volver a mi espacio</Link>
      <div className="form-panel">
        <p className="eyebrow">COMPARTE TU TALENTO</p>
        <h1>Publica una creación</h1>
        <p className="muted-copy">Cuéntale a la comunidad qué hace especial a tu producto.</p>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="post-title">Nombre del producto</label>
          <input className="form-control" id="post-title" name="title" value={form.title} onChange={handleChange} placeholder="Ej. Vela de lavanda" maxLength="150" required />
          <label className="form-label mt-3" htmlFor="post-description">Descripción</label>
          <textarea className="form-control" id="post-description" name="description" rows="5" value={form.description} onChange={handleChange} placeholder="Materiales, elaboración y detalles de tu producto..." required />
          <div className="form-row">
            <div>
              <label className="form-label mt-3" htmlFor="post-price">Precio (CLP)</label>
              <input className="form-control" id="post-price" type="number" name="price" min="1" step="1" value={form.price} onChange={handleChange} placeholder="7500" required />
            </div>
            <div>
              <label className="form-label mt-3" htmlFor="post-category">Categoría o tipo <span className="optional-label">Opcional</span></label>
              <input className="form-control" id="post-category" name="category" value={form.category} onChange={handleChange} placeholder="Ej. Joyería, decoración, textil..." />
            </div>
          </div>
          <label className="form-label mt-3" htmlFor="post-image">Imagen del producto <span className="optional-label">URL opcional</span></label>
          <input className="form-control" id="post-image" type="url" name="img_url" value={form.img_url} onChange={handleChange} placeholder="https://..." />
          <p className="form-hint">Usa un enlace público a una imagen para que tus clientes puedan verla.</p>
          <button className="btn btn-submit mt-3" type="submit" disabled={submitting}>{submitting ? 'Publicando...' : 'Publicar producto'}</button>
        </form>
      </div>
    </main>
  );
}
