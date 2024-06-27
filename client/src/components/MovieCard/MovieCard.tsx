// import React from "react";
import { useContext } from "react";
import { IconButton } from "@mui/material";
import { IMovie } from "../MovieList/MovieList";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ContextAll } from "../../context/context";

interface Props {
  movie: IMovie;
  index: number;
}

export function MovieCard({ movie, index }: Props) {
  const navigate = useNavigate();
  const { favoriteMovies, toggleFavoriteMovie } = useContext(ContextAll);
  const isFavorite = favoriteMovies.includes(movie.id);

  const clickHandler = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className={styles.container} key={movie.id}>
      <div className={styles.imgbox} onClick={clickHandler}>
        {movie?.poster?.previewUrl || movie?.poster?.url ? (
          <img
            loading={index > 10 ? "lazy" : "eager"}
            decoding={index > 10 ? "async" : "sync"}
            src={movie.poster.previewUrl || movie.poster.url}
            alt={movie.name || "No Title"}
          />
        ) : (
          <div className={styles.placeholder}>No Image Available</div>
        )}
      </div>
      <div className={styles.favorite}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => toggleFavoriteMovie(movie.id)}
        >
          <FavoriteIcon
            fontSize="small"
            color={isFavorite ? "primary" : "action"}
          />
        </IconButton>
      </div>
      <h4>{movie.name || "No Title"}</h4>
      <span>{movie.year}</span>
      {movie.rating.imdb ? (
        <div className={styles.ratingimdb}>
          <img src="/imdb.svg" />
          <p>{movie.rating.imdb}</p>
        </div>
      ) : (
        <div className={styles.ratingkp}>
          <img src="/kp.svg" />
          <p>{movie.rating.kp}</p>
        </div>
      )}
    </div>
  );
}
