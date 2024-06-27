
import React, { useEffect } from "react";
import { useState, createContext } from "react";

export interface IContext {
  favoriteMovies: string[];
  toggleFavoriteMovie: (id: string) => void;
}

export const ContextAll: React.Context<IContext> = createContext(
  {} as IContext
);

export const MovieContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {

  const [favoriteMovies, setFavoriteMovies] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      setFavoriteMovies(JSON.parse(storedFavorites))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const toggleFavoriteMovie = (id: string) => {
    setFavoriteMovies((prevFavorites :string[]) => {
      const isFavorite = prevFavorites.some((fav: string) => fav === id);
      if (isFavorite) {
        return prevFavorites.filter((fav: string) => fav !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };
 
  const contextValue: IContext = {
    favoriteMovies, 
    toggleFavoriteMovie,
  };
  return (
    <ContextAll.Provider value={contextValue}>{children}</ContextAll.Provider>
  );
};

