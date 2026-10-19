import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { UserContext } from './UserContext';

export const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState('');
  const [favoritesError, setFavoritesError] = useState('');

  const refreshPosts = useCallback(async () => {
    setPostsLoading(true);
    setPostsError('');
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
    } catch (error) {
      const message = error.response?.data?.message || 'No se pudieron cargar las publicaciones.';
      setPostsError(message);
      throw error;
    } finally {
      setPostsLoading(false);
    }
  }, []);

  const refreshFavorites = useCallback(async () => {
    if (!token) {
      setFavorites([]);
      setFavoritesError('');
      return;
    }
    setFavoritesError('');
    try {
      const { data } = await api.get('/favorites');
      setFavorites(data);
    } catch (error) {
      const message = error.response?.data?.message || 'No se pudieron cargar tus favoritos.';
      setFavoritesError(message);
      throw error;
    }
  }, [token]);

  useEffect(() => {
    refreshPosts().catch(() => {});
  }, [refreshPosts]);

  useEffect(() => {
    refreshFavorites().catch(() => {});
  }, [refreshFavorites]);

  const toggleFavorite = useCallback(async (postId) => {
    const isFavorite = favorites.some((favorite) => Number(favorite.post_id) === Number(postId));
    setFavoritesError('');
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${postId}`);
      } else {
        await api.post('/favorites', { post_id: postId });
      }
      await refreshFavorites();
    } catch (error) {
      const message = error.response?.data?.message || 'No se pudo actualizar el favorito.';
      setFavoritesError(message);
      throw error;
    }
  }, [favorites, refreshFavorites]);

  return (
    <PostsContext.Provider value={useMemo(() => ({
      posts,
      setPosts,
      favorites,
      postsLoading,
      postsError,
      favoritesError,
      refreshPosts,
      refreshFavorites,
      toggleFavorite,
    }), [posts, favorites, postsLoading, postsError, favoritesError, refreshPosts, refreshFavorites, toggleFavorite])}>
      {children}
    </PostsContext.Provider>
  );
};
