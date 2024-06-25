import React, { useEffect, useState } from 'react';
import api from '../../api';
import Filter from '../Filter';
import Pagination from '../Pagination';
import data from '../../assets/api.json'
import {MovieCard} from '..';
import styles from './MovieList.module.css'

export interface Movie {
  id: string;
  name: string | null;
  description: string | null;
  year: number;
  releaseYears: { start: number; end: number | null }[];
  rating: { kp: number; imdb: number };
  poster?: {
    url: string;
    previewUrl: string;
  };
  genres: { name: string }[];
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreQuery = selectedGenre ? selectedGenre : undefined;
        const ratingQuery = selectedRating ? selectedRating : undefined;
        // switch (selectedRating) {
        //   case 'выше 6':
        //     ratingQuery = '6-10';
        //     break;
        //   case 'выше 7':
        //     ratingQuery = '7-10';
        //     break;
        //   case 'выше 8':
        //     ratingQuery = '8-10';
        //     break;
        //   case 'выше 9':
        //     ratingQuery = '9-10';
        //     break;
        //   default:
        //     ratingQuery = undefined;
        // }

        // const response = await api.get('/v1.4/movie', {
        //   params: {
        //     page,
        //     limit: 50,
        //     'selectFields': ['id', 'name', 'description', 'year', 'releaseYears', 'rating', 'poster', 'genres'],
        //     ...(genreQuery && { 'genres.name': genreQuery }),
        //     ...(ratingQuery && { 'rating.imdb': ratingQuery }),
        //     ...(selectedYear && { year: selectedYear }),
        //     'notNullFields': ['name', 'year', 'rating.imdb', 'poster.url']
        //   },
        // });
        // setMovies(response.data.docs);
        setMovies(data.docs);
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, [page, selectedGenre, selectedRating, selectedYear]);

  return (
    // <div className={styles.mainbox}>
    <>
      <img src='logo.svg'/>
      <Filter 
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
        onYearChange={setSelectedYear}
      />
      <Pagination 
        currentPage={page}
        onPageChange={setPage}
      />
      <div className={styles.mainbox} >
        {movies.map((movie) => (
          <MovieCard movie={movie}/>
        ))}
      </div>
    </>
    // </div>
  );
};

export default MovieList;
