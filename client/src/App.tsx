// import React from "react";
import "./App.css";
import { MainPage, OneMoviePage } from "./pages";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SearchBar } from "./components";
import { Button } from "@mui/material";
import { FavoritePage } from "./pages/FavoritesPage/FavoritesPage";
import { SearchPage } from "./pages/SearchPage/SearchPage";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="logo-box">
        <img src="logo.svg" alt="IMovie library" id="logo" onClick={() => navigate('/')}/>
        <Button variant="outlined" onClick={() => navigate('/favorites')}>Избранное</Button>
        </div>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/movie/:id" element={<OneMoviePage />}/>
        <Route path="/favorites" element={<FavoritePage />}/>
        <Route path="/search/:searchQuery" element={<SearchPage />}/>
      </Routes>
    </>
  );
}

export default App;
