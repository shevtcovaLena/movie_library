// import React from "react";
import { MovieList } from "../../components";

export function FavoritePage() {
  return (
    <>
      <MovieList favorites={true}/>
    </>
  );
}