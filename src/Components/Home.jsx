import { useState } from "react";
import Aside from "./Aside";
import Feed from "./Feed";

function Home() {
  const [id, setId] = useState(0);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 flex pl-8 gap-4 z-0">
        <Aside setId={setId} />
        <Feed categoryId={id} />
      </div>
    </div>
  );
}

export default Home;
