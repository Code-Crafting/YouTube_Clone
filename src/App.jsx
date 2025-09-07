import { useState } from "react";
import Aside from "./Components/Aside";
import Feed from "./Components/Feed";
import Navbar from "./Components/Navbar";

function App() {
  const [id, setId] = useState(0);
  console.log(id);
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="absolute top-0 left-0 flex pl-8 gap-4 z-0">
          <Aside setId={setId} />
          <Feed categoryId={id} />
        </div>
      </div>
    </>
  );
}

export default App;
