import React, { useEffect, useState } from "react";
// import api from "../api";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Radio,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FilterProps {
  onGenreChange: (genre: string) => void;
  onRatingChange: (rating: string) => void;
  onYearChange: (year: string) => void;
}

export interface GenreData {
  name: string;
  slug: string;
}

const ratings = ["не выбран", "выше 6", "выше 7", "выше 8", "выше 9"];
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

const Filter: React.FC<FilterProps> = ({
  onGenreChange,
  onRatingChange,
  onYearChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [genres, setGenres] = useState<typeof genresInit>(genresInit);

  useEffect(() => {
    //   const fetchGenres = async () => {
    //     try {
    // const response = await api.get<GenreData[]>('v1/movie/possible-values-by-field', {
    //   method: 'GET',
    //   params: {field: 'genres.name'},
    // });
    // setGenres(response.data.map((el) => el.name));
    // } catch (error) {
    //   console.error('Error fetching movies', error);
    // }
    // };
    // fetchGenres();
  }, []);

//---------------------------------------------------------
  const [age, setAge] = React.useState("");             //|

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  return (
    <div>
      <div>
        <label>Жанр:</label>
        <select onChange={(e) => onGenreChange(e.target.value)}>
          <option value="">Все</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Год:</label>
        <select onChange={(e) => onYearChange(e.target.value)}>
          <option value="">Все</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            style={{ color: "inherit" }}
          >
            Рейтинг:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={(e, value) => onRatingChange(value)}
          >
            <FormControlLabel value="" control={<Radio />} label="Не выбран" />
            <FormControlLabel
              value="6-10"
              control={<Radio />}
              label="Больше 6"
            />
            <FormControlLabel
              value="7-10"
              control={<Radio />}
              label="Больше 7"
            />
            <FormControlLabel
              value="8-10"
              control={<Radio />}
              label="Больше 8"
            />
            <FormControlLabel
              value="9-10"
              control={<Radio />}
              label="Больше 9"
            />
          </RadioGroup>
        </FormControl>
        {/* <label>Рейтинг:</label>
        {ratings.map((rating) => (
          <label key={rating}>
            <input
              type="radio"
              name="rating"
              value={rating}
              onChange={(e) => onRatingChange(e.target.value)}
            />
            {rating}
          </label>
        ))} */}
      </div>
    </div>
  );
};

export default Filter;

// export function BasicSelect() {


  // return (
    // <Box sx={{ minWidth: 120 }}>
      
    // </Box>
//   );
// }
