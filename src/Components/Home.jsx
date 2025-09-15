import { useState } from "react";
import Aside from "./Aside";
import Feed from "./Feed";
import Navbar from "./Navbar";
import SearchedContent from "./SearchedContent";

function Home() {
  const [id, setId] = useState(0);
  const [hideAsideText, setHideAsideText] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // console.log(debouncedQuery);

  return (
    <>
      <Navbar
        setHideAsideText={setHideAsideText}
        query={query}
        setQuery={setQuery}
        setDebouncedQuery={setDebouncedQuery}
      />
      <div className="relative">
        <div className="absolute top-0 left-0 flex pl-8 gap-4 z-0">
          <Aside setId={setId} hideAsideText={hideAsideText} />
          {!query ? (
            <Feed categoryId={id} />
          ) : (
            <SearchedContent debouncedQuery={debouncedQuery} />
          )}
          {/* <Feed categoryId={id} /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
