import React, { useEffect, useState } from "react";
import api from "../../api";
import data from "../../assets/api.json";
import { MovieCard, Filter } from "..";
import styles from "./MovieList.module.css";
import { Pagination, Skeleton } from "@mui/material";

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

export function MovieList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreQuery = selectedGenre ? selectedGenre : undefined;
        const ratingQuery = selectedRating ? selectedRating : undefined;
       
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
            ...(genreQuery && { "genres.name": genreQuery }),
            ...(ratingQuery && { "rating.imdb": ratingQuery }),
            ...(selectedYear && { year: selectedYear }),
            notNullFields: ["name", "year", "rating.imdb", "poster.url"],
          },
        });
        setMovies(response.data.docs);
        setLoading(false);
        // setMovies(data.docs);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, [page, selectedGenre, selectedRating, selectedYear]);

  return (
    <>
      <div>
        <Filter
          onGenreChange={setSelectedGenre}
          onRatingChange={setSelectedRating}
          onYearChange={setSelectedYear}
        />
      </div>
      <br />

      <Pagination
        sx={{ m: 1 }}
        count={data.pages}
        color="primary"
        onChange={(e, page) => setPage(page)}
        page={page}
      />
      <div className={styles.mainbox}>

{/* =----------------------------------------------------------------------------- */}
        
        {!isLoading && (movies.length !== 0) ? movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}/>
        )) : new Array(50).fill(0).map(() => <Skeleton variant="rectangular" width={210} height={349} sx={{ m: 1}}/>)}
      </div>
      <Pagination
        count={data.pages}
        color="primary"
        onChange={(e, page) => setPage(page)}
        page={page}
      />
    </>
  );
}

// export default MovieList;
