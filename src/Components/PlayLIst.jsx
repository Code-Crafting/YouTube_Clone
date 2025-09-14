import { useEffect, useState } from "react";
import { Link } from "react-router";
import { views } from "../../functions";
import PlayListShrimmer from "./Shrimmer/PlayListShrimmer";

function PlayList({ categoryId }) {
  const [data, setData] = useState(null);

  console.log(data);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&videoCategoryId=${categoryId}&key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.items);
      });
  }, [categoryId]);

  return (
    <div className="w-[35%] flex flex-col gap-3 overflow-y-scroll no-scrollbar overscroll-auto pb-2">
      {data ? (
        data.map((el, i) => {
          // console.log(el);
          const {
            snippet: {
              channelTitle,
              title,
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
              key={id}
              className="flex items-center gap-4"
            >
              <div className="w-1/2 h-[150px] rounded-sm overflow-hidden">
                <img
                  src={url}
                  alt="thumbnails"
                  className="w-full h-full hover:cursor-pointer rounded-sm"
                />
              </div>
              <div className="w-1/2 flex flex-col items-between mt-4 gap-1">
                <h1 className="font-bold">{title}</h1>
                <p className="font-medium tracking-wide">{channelTitle}</p>
                <div className="flex gap-4">
                  <p>{views(viewCount)} views</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <>
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
          <PlayListShrimmer />
        </>
      )}
    </div>
  );
}

export default PlayList;
