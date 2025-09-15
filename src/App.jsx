import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import { useState } from "react";
import { SearchContext } from "./Contexts/SearchContext";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  return (
    <SearchContext.Provider
      value={[query, setQuery, debouncedQuery, setDebouncedQuery]}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id/:categoryId" element={<Player />} />
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
