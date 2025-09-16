import { useEffect, useState } from "react";
import FeedShrimmer from "./Shrimmer/FeedShrimmer";
import { Link } from "react-router";

function SearchedContent({ debouncedQuery, setQuery }) {
  const [data, setData] = useState(null);

  const pickRandomId = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);

    return arr[randomIndex];
  };

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${debouncedQuery}&key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
      });
  }, [debouncedQuery]);

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 448px:pt-24 pt-18">
      {data ? (
        data.map((el, i) => {
          const {
            snippet: {
              channelTitle,
              title,
              thumbnails: {
                high: { url },
              },
            },
            id,
          } = el;

          return (
            <Link
              to={`/player/${el.id.videoId}/${pickRandomId([
                0, 20, 2, 17, 24, 28, 10, 22, 25,
              ])}`}
              key={i}
              className="sm:w-2xs 448px:w-[80%] w-full"
              onClick={() => setQuery("")}
            >
              <div className="448px:h-[200px] h-[300px] overflow-hidden 448px:rounded-sm rounded-none">
                <img
                  src={url}
                  alt="thumbnails"
                  className="w-full h-full hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-between mt-4 gap-1 448px:pl-0 pl-2">
                <h1 className="font-bold">{title}</h1>
                <p className="font-medium tracking-wide">{channelTitle}</p>
                <div className="flex gap-4"></div>
              </div>
            </Link>
          );
        })
      ) : (
        <>
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
          <FeedShrimmer />
        </>
      )}
    </div>
  );
}
export default SearchedContent;
