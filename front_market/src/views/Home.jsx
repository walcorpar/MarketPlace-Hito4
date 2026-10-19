import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { PostsContext } from '../context/PostsContext';
import { UserContext } from '../context/UserContext';

export default function Home() {
  const { posts, favorites, postsLoading, postsError, favoritesError, toggleFavorite } = useContext(PostsContext);
  const { token } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');

  const categories = useMemo(
    () => ['Todas', ...new Set(posts.map((post) => post.category).filter(Boolean))],
    [posts],
  );
  const visiblePosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es');
    return posts.filter((post) => {
      const matchesSearch = !query || `${post.title} ${post.description} ${post.vendor_name || ''} ${post.category || ''}`
        .toLocaleLowerCase('es').includes(query);
      return matchesSearch && (category === 'Todas' || post.category === category);
    });
  }, [posts, search, category]);

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-section__content">
          <p className="eyebrow">HECHO A MANO, HECHO CON CARIÑO</p>
          <h1>Pequeños detalles.<br /><em>Grandes momentos.</em></h1>
          <p className="hero-section__text">Descubre joyas, decoración, textiles y otras creaciones únicas hechas a mano por artistas y emprendedores locales.</p>
          <a className="btn btn-hero" href="#catalogo">Descubrir productos <span aria-hidden="true">↓</span></a>
          <div className="hero-section__note"><span>✳</span> Cada pieza cuenta una historia</div>
        </div>
        <div className="hero-section__decoration" aria-hidden="true">
          <div className="hero-vase" />
          <div className="hero-flower">✿</div>
        </div>
      </section>

      <section className="container catalog-section" id="catalogo">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NUESTRO CATÁLOGO</p>
            <h2>Encuentra tu próximo favorito</h2>
            <p className="muted-copy">Creaciones únicas de emprendedores locales.</p>
          </div>
          {token && <Link className="text-link" to="/create-post">Vender un producto <span aria-hidden="true">→</span></Link>}
        </div>

        <div className="catalog-controls">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Busca productos, categorías o vendedores"
              aria-label="Buscar productos"
            />
          </label>
          <label className="filter-field">
            <span className="visually-hidden">Filtrar por categoría o tipo</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((option) => <option key={option} value={option}>{option === 'Todas' ? 'Todas las categorías' : option}</option>)}
            </select>
          </label>
        </div>

        {postsError && <div className="alert alert-danger" role="alert">{postsError}</div>}
        {favoritesError && <div className="alert alert-danger" role="alert">{favoritesError}</div>}
        {postsLoading ? (
          <div className="page-status" role="status">Cargando productos...</div>
        ) : visiblePosts.length ? (
          <div className="product-grid">
            {visiblePosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                canFavorite={Boolean(token)}
                isFavorite={favorites.some((favorite) => Number(favorite.post_id) === Number(post.id))}
                onToggleFavorite={(id) => toggleFavorite(id).catch(() => {})}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">✳</span>
            <h3>{posts.length ? 'No encontramos productos con esa búsqueda' : 'Estamos preparando el catálogo'}</h3>
            <p>{posts.length ? 'Prueba con otro nombre o categoría.' : 'Vuelve pronto para descubrir nuevas creaciones.'}</p>
            {search && <button className="btn btn-soft" type="button" onClick={() => { setSearch(''); setCategory('Todas'); }}>Limpiar búsqueda</button>}
          </div>
        )}
      </section>

      <section className="maker-banner">
        <div className="container maker-banner__inner">
          <div><p className="eyebrow">¿CREAS CON TUS MANOS?</p><h2>Tu talento merece<br />un lugar especial.</h2></div>
          <Link className="btn btn-banner" to={token ? '/create-post' : '/register'}>{token ? 'Publicar un producto' : 'Únete a nuestra comunidad'} <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
