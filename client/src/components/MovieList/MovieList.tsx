import { useContext, useEffect, useState, useCallback, useRef } from "react";
import api from "../../api";
import { MovieCard, Filter } from "..";
import styles from "./MovieList.module.css";
import { Pagination, Skeleton } from "@mui/material";
import { ContextAll } from "../../context/context";
import { debounce } from "lodash";

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

export function MovieList({ favorites }: { favorites?: boolean }) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<[number, number]>([
    0, 10,
  ]);
  const [selectedYear, setSelectedYear] = useState<[number, number]>([
    1990, 2030,
  ]);
  const [filters, setFilters] = useState({
    genres: [] as string[],
    rating: [0, 10] as [number, number],
    year: [1990, 2030] as [number, number],
  });
  const [isLoading, setLoading] = useState<boolean>(true);
  const { favoriteMovies } = useContext(ContextAll);
  const needDelayRef = useRef<boolean>(false);

  const debouncedSetFilters = useCallback(debounce(setFilters, 3000), []);

  const fetchMovies = useCallback(async () => {
    console.log("запрос", needDelayRef.current);
    setLoading(true);
    try {
      const response = await api.get("/v1.4/movie", {
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
          ...(favorites && { id: favoriteMovies }),
          ...(selectedGenres.length > 0 && { "genres.name": selectedGenres }),
          ...(selectedRating && {
            "rating.imdb": `${selectedRating[0]}-${selectedRating[1]}`,
          }),
          ...(selectedYear && {
            year: `${selectedYear[0]}-${selectedYear[1]}`,
          }),
          notNullFields: ["name", "year", "rating.imdb", "poster.url"],
        },
      });
      setMovies(response.data.docs);
      setPageCount(response.data.pages);
    } catch (error) {
      console.error("Error fetching movies", error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedGenres, selectedRating, selectedYear]);

  useEffect(() => {
    if (needDelayRef.current) {
      debouncedSetFilters({
        genres: selectedGenres,
        rating: selectedRating,
        year: selectedYear,
      });
    }
  }, [selectedGenres, selectedRating, selectedYear]);

  useEffect(() => {
    if (favorites && !favoriteMovies.length) {
      setMovies([]);
      setLoading(false);
    } else {
      fetchMovies();
    }
  }, [filters, page]);

  return (
    <>
      <div>
        <Filter
          onGenresChange={setSelectedGenres}
          onRatingChange={setSelectedRating}
          onYearChange={setSelectedYear}
          needDelayRef={needDelayRef}
        />
      </div>
      <br />

      <Pagination
        sx={{ m: 1 }}
        count={pageCount}
        color="primary"
        onChange={(_, page) => {
          needDelayRef.current = false;
          setPage(page);
        }}
        page={page}
      />
      <div className={styles.mainbox}>
        {!isLoading &&
          movies.length !== 0 &&
          movies.map((movie, index) => (
            <MovieCard movie={movie} key={movie.id} index={index} />
          ))}
        {!isLoading && movies.length === 0 && (
          <div>
            <p>Результаты отсутствуют. Попробуйте изменить запрос.</p>
          </div>
        )}
        {isLoading &&
          new Array(10)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={210}
                height={349}
                sx={{ m: 1 }}
              />
            ))}
      </div>
      <Pagination
        sx={{ m: 1 }}
        count={pageCount}
        color="primary"
        onChange={(_, page) => {
          needDelayRef.current = false;
          setPage(page);
        }}
        page={page}
      />
    </>
  );
}
