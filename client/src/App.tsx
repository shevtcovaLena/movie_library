import React from "react";
import "./App.css";
import { MainPage, OneMoviePage } from "./pages";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SearchBar } from "./components";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <img src="logo.svg" alt="IMovie library" id="logo" onClick={() => navigate('/')}/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/movie/:id" element={<OneMoviePage />}/>
      </Routes>
    </>
  );
}

export default App;
