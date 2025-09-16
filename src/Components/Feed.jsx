import { useEffect, useState } from "react";
import FeedShrimmer from "./Shrimmer/FeedShrimmer";
import { Link } from "react-router";
import { date, views } from "../../functions";

function Feed({ categoryId }) {
  const [data, setData] = useState(null);

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
    <>
      {data ? (
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
              className="848px:w-2xs 496px:w-[240px] w-[90%]"
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
                <h1 className="font-bold 448px:text-[16px] text-[14px]">
                  {title}
                </h1>
                <p className="font-medium tracking-wide 448px:text-[16px] text-[14px]">
                  {channelTitle}
                </p>
                <div className="flex gap-4">
                  <p className="448px:text-[16px] text-[14px]">
                    {views(viewCount ? viewCount : 0)} views &bull;{" "}
                    {date(publishedAt)}
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
    </>
  );
}

export default Feed;
