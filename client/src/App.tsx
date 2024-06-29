import "./App.css";
import { MainPage, OneMoviePage, FavoritePage, SearchPage } from "./pages";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SearchBar } from "./components";
import { Button } from "@mui/material";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="logo-box">
          <a onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="IMovie library" id="logo" />
          </a>
          <Button variant="outlined" onClick={() => navigate("/favorites")}>
            Избранное
          </Button>
        </div>
        <SearchBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<OneMoviePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/search/:searchQuery" element={<SearchPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
