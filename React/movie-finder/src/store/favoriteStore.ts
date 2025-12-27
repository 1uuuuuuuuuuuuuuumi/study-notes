import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface FavoriteStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie: Movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie]
        })),

      removeFavorite: (id: number) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id)
        })),

      isFavorite: (id: number) => {
        const state = get();
        return state.favorites.some((m) => m.id === id);
      }
    }),
    {
      name: 'movie-favorites'
    }
  )
);

export default useFavoriteStore;