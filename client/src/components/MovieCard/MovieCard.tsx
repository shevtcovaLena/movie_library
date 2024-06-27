// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext } from "react";
import { IMovie } from "../MovieList/MovieList";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: IMovie;
}

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className={styles.container} key={movie.id}>
      <div className={styles.imgbox} onClick={clickHandler}>
        {movie?.poster?.previewUrl || movie?.poster?.url ? (
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
