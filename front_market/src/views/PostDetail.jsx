import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';
import { PostsContext } from '../context/PostsContext';
import { UserContext } from '../context/UserContext';

const formatPrice = (price) => new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
}).format(Number(price) || 0);

export default function PostDetail() {
  const { id } = useParams();
  const { posts, favorites, favoritesError, toggleFavorite } = useContext(PostsContext);
  const { token } = useContext(UserContext);
  const [post, setPost] = useState(() => posts.find((item) => String(item.id) === id) || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState('');
  const fallbackImage = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=85';

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    api.get(`/posts/${id}`)
      .then(({ data }) => { if (active) setPost(data); })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || 'No se pudo cargar este producto.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const isFavorite = favorites.some((favorite) => Number(favorite.post_id) === Number(id));

  return (
    <main className="container detail-page">
      <Link className="back-link" to="/">← Volver al catálogo</Link>
      {loading && <div className="page-status" role="status">Cargando producto...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && post && (
        <article className="detail-card">
          <div className="detail-card__image-wrap">
            <img src={post.img_url || fallbackImage} alt={post.title} onError={(event) => { event.currentTarget.src = fallbackImage; }} />
          </div>
          <div className="detail-card__content">
            <p className="eyebrow">{post.category || 'CREACIÓN ARTESANAL'}</p>
            <h1>{post.title}</h1>
            <p className="detail-price">{formatPrice(post.price)}</p>
            <div className="detail-divider" />
            <h2>Sobre esta creación</h2>
            <p className="detail-description">{post.description}</p>
            <div className="seller-box">
              <span className="seller-avatar" aria-hidden="true">{(post.vendor_name || 'V').charAt(0).toLocaleUpperCase('es')}</span>
              <div><strong>{post.vendor_name || 'Vendedor'}</strong><span>{post.vendor_city || 'Emprendedor local'}</span></div>
            </div>
            {favoritesError && <div className="alert alert-danger mt-3" role="alert">{favoritesError}</div>}
            {token ? (
              <button className="btn btn-submit detail-favorite" type="button" onClick={() => toggleFavorite(post.id).catch(() => {})}>
                {isFavorite ? '♥  Quitar de favoritos' : '♡  Guardar en favoritos'}
              </button>
            ) : (
              <Link className="btn btn-submit detail-favorite" to="/login" state={{ from: { pathname: `/posts/${id}` } }}>Ingresa para guardar este producto</Link>
            )}
          </div>
        </article>
      )}
    </main>
  );
}
