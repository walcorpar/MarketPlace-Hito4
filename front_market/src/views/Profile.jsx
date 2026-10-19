import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { PostsContext } from '../context/PostsContext';
import { UserContext } from '../context/UserContext';

export default function Profile() {
  const { user, authError } = useContext(UserContext);
  const { posts, favorites, postsError, favoritesError, toggleFavorite } = useContext(PostsContext);
  const [section, setSection] = useState('publicaciones');

  const myPosts = posts.filter((post) => String(post.vendor_id) === String(user?.id));
  const favoritePosts = favorites.map((favorite) => ({
    ...favorite,
    id: favorite.post_id,
  }));
  const shownPosts = section === 'publicaciones' ? myPosts : favoritePosts;

  return (
    <main className="container profile-page">
      <section className="profile-header">
        <div className="profile-avatar">{(user?.name || 'V').charAt(0).toLocaleUpperCase('es')}</div>
        <div className="profile-header__info">
          <p className="eyebrow">TU ESPACIO VEL-ART</p>
          <h1>{user?.name || 'Mi perfil'}</h1>
          <p>{user?.email}</p>
          {user?.city && <span className="profile-city">⌖ {user.city}</span>}
        </div>
        <div className="profile-stats">
          <div><strong>{myPosts.length}</strong><span>Publicaciones</span></div>
          <div><strong>{favorites.length}</strong><span>Favoritos</span></div>
        </div>
      </section>

      {authError && <div className="alert alert-warning" role="alert">{authError}</div>}
      {postsError && <div className="alert alert-danger" role="alert">{postsError}</div>}
      {favoritesError && <div className="alert alert-danger" role="alert">{favoritesError}</div>}

      <section className="profile-content">
        <div className="profile-tabs" role="tablist" aria-label="Secciones del perfil">
          <button className={section === 'publicaciones' ? 'is-active' : ''} type="button" role="tab" aria-selected={section === 'publicaciones'} onClick={() => setSection('publicaciones')}>Mis publicaciones</button>
          <button className={section === 'favoritos' ? 'is-active' : ''} type="button" role="tab" aria-selected={section === 'favoritos'} onClick={() => setSection('favoritos')}>Mis favoritos</button>
        </div>
        {shownPosts.length ? (
          <div className="product-grid">
            {shownPosts.map((post) => (
              <PostCard
                key={`${section}-${post.id}`}
                post={post}
                canFavorite={section === 'favoritos'}
                isFavorite={section === 'favoritos'}
                onToggleFavorite={(id) => toggleFavorite(id).catch(() => {})}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">{section === 'favoritos' ? '♡' : '✳'}</span>
            <h2>{section === 'favoritos' ? 'Aún no guardas favoritos' : 'Aún no tienes publicaciones'}</h2>
            <p>{section === 'favoritos' ? 'Guarda los productos que te gusten y aparecerán aquí.' : 'Comparte tu primera creación con la comunidad.'}</p>
            {section === 'favoritos'
              ? <Link className="btn btn-soft" to="/">Explorar productos</Link>
              : <Link className="btn btn-submit" to="/create-post">Crear publicación</Link>}
          </div>
        )}
      </section>
    </main>
  );
}
