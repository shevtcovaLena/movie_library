import React, { useEffect, useState } from "react";
// import api from "../api";
import Select from "@mui/material/Select";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  InputLabel,
  MenuItem,
} from "@mui/material";
import styles from './Filter.module.css'
import api from "../../api";

interface FilterProps {
  onGenreChange: (genre: string) => void;
  onRatingChange: (rating: string) => void;
  onYearChange: (year: string) => void;
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

const years = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2006-2010",
  "2001-2005",
  "1990-2000",
];

export function Filter({
  onGenreChange,
  onRatingChange,
  onYearChange,
}:FilterProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [genres, setGenres] = useState<typeof genresInit>(genresInit);

  useEffect(() => {
      const fetchGenres = async () => {
        try {
    const response = await api.get<GenreData[]>('v1/movie/possible-values-by-field', {
      method: 'GET',
      params: {field: 'genres.name'},
    });
    setGenres(response.data.map((el) => el.name));
    } catch (error) {
      console.error('Error fetching movies', error);
    }
    };
    fetchGenres();
  }, []);

  return (
    <div className={styles.container}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel >Жанр</InputLabel>
        <Select
          style={{ color: "inherit", textTransform: "capitalize" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Жанр"
          onChange={(e) => onGenreChange(e.target.value as string)}
        >
          {genres.map((genre, index) => (
            <MenuItem
              key={index}
              value={genre}
              style={{ textTransform: "capitalize" }}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Год</InputLabel>
        <Select
          style={{ color: "inherit", textTransform: "capitalize" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Год"
          onChange={(e) => onYearChange(e.target.value as string)}
        >
          {years.map((year, index) => (
            <MenuItem
              key={index}
              value={year}
              style={{ textTransform: "capitalize" }}
            >
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <FormLabel id="demo-radio-buttons-group-label">Рейтинг:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={(_, value) => onRatingChange(value)}
          >
            <FormControlLabel value="" control={<Radio />} label="не выбран" />
            <FormControlLabel
              value="6-10"
              control={<Radio />}
              label="больше 6"
            />
            <FormControlLabel
              value="7-10"
              control={<Radio />}
              label="больше 7"
            />
            <FormControlLabel
              value="8-10"
              control={<Radio />}
              label="больше 8"
            />
            <FormControlLabel
              value="9-10"
              control={<Radio />}
              label="больше 9"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
