import { MovieCard } from "../../components";
import { useEffect, useState } from "react";
import api from "../../api";
import styles from "./SearchPage.module.css";
import { Pagination, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

export interface IMovie {
  id: string;
  name: string | null;
  description: string | null;
  year: number;
  releaseYears: { start: number; end: number | null }[];
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  poster?: {
    url: string;
    previewUrl: string;
  };
  genres: { name: string }[];
}

export function SearchPage() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);

  const { searchQuery } = useParams<{ searchQuery: string }>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/v1.4/movie/search", {
          params: {
            page,
            limit: 50,
            selectFields: [
              "id",
              "name",
              "description",
              "year",
              "releaseYears",
              "rating",
              "poster",
              "genres",
            ],
            query: searchQuery,
          },
        });
        setMovies(response.data.docs);
        setPageCount(response.data.pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, [page, searchQuery]);

  return (
    <div className={styles.container}>
      <Pagination
        sx={{ m: 1 }}
        count={pageCount}
        color="primary"
        onChange={(_, page) => setPage(page)}
        page={page}
      />
      <div className={styles.mainbox}>
        {!isLoading &&
          movies.length !== 0 &&
          movies.map((movie, index) => <MovieCard movie={movie} key={movie.id} index={index}/>)}
        {isLoading &&
          movies.length !== 0 &&
          new Array(50)
            .fill(0)
            .map(() => (
              <Skeleton
                variant="rectangular"
                width={210}
                height={349}
                sx={{ m: 1 }}
              />
            ))}
        {movies.length === 0 && (
          <div>
            <p>Результаты отсутствуют. Попробуйте изменить запрос.</p>
          </div>
        )}
      </div>
      <Pagination
        sx={{ m: 1 }}
        count={pageCount}
        color="primary"
        onChange={(_, page) => setPage(page)}
        page={page}
      />
    </div>
  );
}
