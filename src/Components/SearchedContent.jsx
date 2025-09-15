import { useEffect, useState } from "react";
import FeedShrimmer from "./Shrimmer/FeedShrimmer";
import { Link } from "react-router";

function SearchedContent({ debouncedQuery, setQuery }) {
  const [data, setData] = useState(null);

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
    <>
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
              to={`/player/${el.id.videoId}/${0}`}
              className="w-2xs"
              key={i}
              onClick={() => setQuery("")}
            >
              <div className="h-[200px] overflow-hidden rounded-sm">
                <img
                  src={url}
                  alt="thumbnails"
                  className="w-full h-full hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-between mt-4 gap-1">
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
    </>
  );
}
export default SearchedContent;
