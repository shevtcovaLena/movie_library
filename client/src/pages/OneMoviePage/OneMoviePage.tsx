import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./OneMoviePage.module.css";
import { IMovie } from "../../components/MovieList/MovieList";
import api from "../../api";

export function OneMoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/v1.4/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.poster}>
          <img
            src={movie.poster?.url}
            alt={movie.name || "Название не доступно"}
          />
        </div>
        <div className={styles.text}>
          <h1>
            {movie.name} ({movie.year})
          </h1>
          <br/>
          <p className="description">{movie.description}</p>
          <br/>
          <div className="ratings">
            <p>
              <strong>Рейтинг:</strong>
            </p>
            <ul>
              <li>KinoPoisk: {movie.rating.kp}</li>
              <li>IMDb: {movie.rating.imdb}</li>
              <li>Film Critics: {movie.rating.filmCritics}</li>
              <li>Russian Film Critics: {movie.rating.russianFilmCritics}</li>
              <li>Await: {movie.rating.await}</li>
            </ul>
          </div>
          <div className="genres">
            <p>
              <strong>Жанры:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
