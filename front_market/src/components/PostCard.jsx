import { Link } from 'react-router-dom';

const formatPrice = (price) => new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
}).format(Number(price) || 0);

export default function PostCard({ post, isFavorite = false, onToggleFavorite, canFavorite = false }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80';

  return (
    <article className="product-card">
      <Link className="product-card__image-link" to={`/posts/${post.id}`}>
        <img
          className="product-card__image"
          src={post.img_url || fallbackImage}
          alt={post.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{post.category || 'Artesanía local'}</span>
          {canFavorite && (
            <button
              className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
              type="button"
              onClick={() => onToggleFavorite(post.id)}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          )}
        </div>
        <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
        <p className="product-card__description">{post.description}</p>
        <p className="product-card__vendor">{post.vendor_name || 'Vendedor'}{post.vendor_city ? ` · ${post.vendor_city}` : ''}</p>
        <div className="product-card__footer">
          <strong>{formatPrice(post.price)}</strong>
          <Link className="text-link" to={`/posts/${post.id}`}>Ver producto <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
