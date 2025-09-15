import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import { useState } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id/:categoryId" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;
