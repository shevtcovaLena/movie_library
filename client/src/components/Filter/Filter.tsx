import { MutableRefObject, useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Slider,
  Checkbox,
} from "@mui/material";
import styles from './Filter.module.css'
import api from "../../api";

interface FilterProps {
  onGenresChange: (genres: string[]) => void;
  onRatingChange: (rating: [number, number]) => void;
  onYearChange: (year: [number, number]) => void;
  needDelayRef: MutableRefObject<boolean>;
}

export interface GenreData {
  name: string;
  slug: string;
}

const genreData = [
  {
    name: "аниме",
    slug: "anime",
  },
  {
    name: "биография",
    slug: "biografiya",
  },
  {
    name: "боевик",
    slug: "boevik",
  },
  {
    name: "вестерн",
    slug: "vestern",
  },
  {
    name: "военный",
    slug: "voennyy",
  },
  {
    name: "детектив",
    slug: "detektiv",
  },
  {
    name: "детский",
    slug: "detskiy",
  },
  {
    name: "для взрослых",
    slug: "dlya-vzroslyh",
  },
  {
    name: "документальный",
    slug: "dokumentalnyy",
  },
  {
    name: "драма",
    slug: "drama",
  },
  {
    name: "игра",
    slug: "igra",
  },
  {
    name: "история",
    slug: "istoriya",
  },
  {
    name: "комедия",
    slug: "komediya",
  },
  {
    name: "концерт",
    slug: "koncert",
  },
  {
    name: "короткометражка",
    slug: "korotkometrazhka",
  },
  {
    name: "криминал",
    slug: "kriminal",
  },
  {
    name: "мелодрама",
    slug: "melodrama",
  },
  {
    name: "музыка",
    slug: "muzyka",
  },
  {
    name: "мультфильм",
    slug: "multfilm",
  },
  {
    name: "мюзикл",
    slug: "myuzikl",
  },
  {
    name: "новости",
    slug: "novosti",
  },
  {
    name: "приключения",
    slug: "priklyucheniya",
  },
  {
    name: "реальное ТВ",
    slug: "realnoe-TV",
  },
  {
    name: "семейный",
    slug: "semeynyy",
  },
  {
    name: "спорт",
    slug: "sport",
  },
  {
    name: "ток-шоу",
    slug: "tok-shou",
  },
  {
    name: "триллер",
    slug: "triller",
  },
  {
    name: "ужасы",
    slug: "uzhasy",
  },
  {
    name: "фантастика",
    slug: "fantastika",
  },
  {
    name: "фильм-нуар",
    slug: "film-nuar",
  },
  {
    name: "фэнтези",
    slug: "fentezi",
  },
  {
    name: "церемония",
    slug: "ceremoniya",
  },
];

const genresInit = genreData.map((el) => el.name);

const currentYear = new Date().getFullYear();

const years = [
  { value: 1990, label: "1990" },
  { value: 2000, label: "2000" },
  { value: 2010, label: "2010" },
  { value: 2020, label: "2020" },
  { value: currentYear, label: `${currentYear}` },
];

const ratings = [
  { value: 0, label: "0" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
  { value: 10, label: "10" },
];

export function Filter({
  onGenresChange,
  onRatingChange,
  onYearChange,
  needDelayRef,
}: FilterProps) {
  const [genres, setGenres] = useState<string[]>(genresInit);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<[number, number]>([0, 10]);
  const [selectedYear, setSelectedYear] = useState<[number, number]>([1990, 2030]);

  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     try {
  //       const response = await api.get<GenreData[]>(
  //         "v1/movie/possible-values-by-field",
  //         {
  //           params: { field: "genres.name" },
  //         }
  //       );
  //       setGenres(response.data.map((el) => el.name));
  //     } catch (error) {
  //       console.error("Error fetching genres", error);
  //     }
  //   };
  //   fetchGenres();
  // }, []);

  const handleGenreChange = (event: SelectChangeEvent<string | string[]>) => {
    const selectedGenres = Array.isArray(event.target.value) ? event.target.value : [event.target.value];
    setSelectedGenres(selectedGenres);
    onGenresChange(selectedGenres);
    needDelayRef.current = true;
  };

  const handleRatingChange = (_: Event, newValue: number | number[]) => {
    setSelectedRating(newValue as [number, number]);
    onRatingChange(newValue as [number, number]);
    needDelayRef.current = true;
  };
  
  const handleYearChange = (_: Event, newValue: number | number[]) => {
    setSelectedYear(newValue as [number, number]);
    onYearChange(newValue as [number, number]);
    needDelayRef.current = true;
  };

  return (
    <div className={styles.container}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Жанры</InputLabel>
        <Select
          multiple
          value={selectedGenres}
          onChange={(e) => handleGenreChange(e)}
          renderValue={(selected) => (selected as string[]).join(", ")}
          label="Genres"
        >
          {genres.map((genre, index) => (
            <MenuItem key={index} value={genre}>
              <Checkbox checked={selectedGenres.includes(genre)} />
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <FormLabel>Год</FormLabel>
        <Slider
          value={selectedYear}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={1990}
          max={currentYear}
          step={1}
          marks={years}
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <FormLabel>Рейтинг</FormLabel>
        <Slider
          value={selectedRating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={0}
          max={10}
          step={1}
          marks={ratings}
        />
      </FormControl>
    </div>
  );
}