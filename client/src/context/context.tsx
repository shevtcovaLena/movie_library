
import React from "react";
import { useState, createContext } from "react";
import { IMovie } from "../components/MovieList/MovieList";

export interface IContext {
  movie: IMovie | null;
  setMovie: React.Dispatch<React.SetStateAction<IMovie | null>>;
}

export const ContextAll: React.Context<IContext> = createContext(
  {} as IContext
);

export const MovieContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {

  const [movie, setMovie] = useState<IMovie | null>(null);
 
  const contextValue: IContext = {
    movie,
    setMovie,
  };
  return (
    <ContextAll.Provider value={contextValue}>{children}</ContextAll.Provider>
  );
};

