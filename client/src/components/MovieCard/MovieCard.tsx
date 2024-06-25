import React from "react";
import { Movie } from "../MovieList/MovieList";
import styles from "./MovieCard.module.css";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  return (
    <div className={styles.container} key={movie.id}>
      <div className={styles.imgbox}>
        {movie.poster?.previewUrl || movie.poster?.url ? (
          <img
            src={movie.poster.previewUrl || movie.poster.url}
            alt={movie.name || "No Title"}
          />
        ) : (
          <div className={styles.placeholder}>No Image Available</div>
        )}
      </div>
      <h4>{movie.name || "No Title"}</h4>
      <span>{movie.year}</span>
      {movie.rating.imdb ? (
          <div className={styles.ratingimdb}>
            <img src="./imdb.svg" />
            <p>{movie.rating.imdb}</p>
          </div>
      ) : (
          <div className={styles.ratingkp}>
            <img src="./kp.svg" />
            <p>{movie.rating.kp}</p>
          </div>
      )}
    </div>
  );
}
