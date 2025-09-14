import { useEffect, useState } from "react";
import FeedShrimmer from "./Shrimmer/FeedShrimmer";
import { Link } from "react-router";
import { date, views } from "../../functions";

function Feed({ categoryId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
      });
  }, [categoryId]);

  return (
    <div className="bg-gray-100 w-full h-dvh flex flex-wrap pt-24 pb-4 pl-4  gap-4  overflow-y-scroll no-scrollbar overscroll-auto">
      {data.length ? (
        data.map((el, i) => {
          // console.log(el);
          const {
            snippet: {
              channelTitle,
              title,
              publishedAt,
              thumbnails: {
                high: { url },
              },
            },
            statistics: { viewCount },
            id,
          } = el;

          return (
            <Link
              to={`/player/${id}/${el.snippet.categoryId}`}
              className="w-2xs"
              key={id}
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
                <div className="flex gap-4">
                  <p>
                    {views(viewCount)} views &bull; {date(publishedAt)}
                  </p>
                </div>
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

export default Feed;
