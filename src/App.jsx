import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;
