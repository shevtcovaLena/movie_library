import { useContext, useState } from "react";
import { IconButton, Skeleton } from "@mui/material";
import LazyLoad from "react-lazyload"
import { IMovie } from "../MovieList/MovieList";
import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ContextAll } from "../../context/context";

interface Props {
  movie: IMovie;
  index: number;
}

export function MovieCard({ movie }: Props) {
  const navigate = useNavigate();
  const { favoriteMovies, toggleFavoriteMovie } = useContext(ContextAll);
  const isFavorite = favoriteMovies.includes(movie.id);
  const [isLoaded, setIsLoaded] = useState(false);

  const clickHandler = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className={styles.container} key={movie.id}>
      <div className={styles.imgbox} onClick={clickHandler}>
        {movie?.poster?.previewUrl || movie?.poster?.url ? (
          <LazyLoad height={300} offset={200} once>
            {!isLoaded && <Skeleton variant="rectangular" width="100%" height={300} />}
            <img
              src={movie.poster.previewUrl || movie.poster.url}
              alt={movie.name || "No Title"}
              onLoad={() => setIsLoaded(true)}
              style={isLoaded ? {} : { display: 'none' }}
            />
          </LazyLoad>
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
          <img src="/imdb.svg" alt="IMDB Rating" />
          <p>{movie.rating.imdb}</p>
        </div>
      ) : (
        <div className={styles.ratingkp}>
          <img src="/kp.svg" alt="KP Rating" />
          <p>{movie.rating.kp}</p>
        </div>
      )}
    </div>
  );
}
