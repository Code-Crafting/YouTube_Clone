import { useEffect, useState } from "react";
import { Link } from "react-router";
import { views } from "../../functions";
import PlayListShrimmer from "./Shrimmer/PlaylistShrimmer";

function PlayList({ categoryId }) {
  const [data, setData] = useState(null);

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
    <div className="lg:w-[35%] w-full flex lg:flex-row flex-column flex-wrap lg:justify-start 848px:justify-between justify-center gap-3 lg:overflow-y-scroll no-scrollbar lg:overscroll-auto pb-2">
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
              className="flex lg:items-center items-start gap-4 lg:w-full 848px:w-[250px] 448px:w-[350px] w-full lg:flex-row flex-col"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="lg:w-1/2 w-full 848px:h-[150px] h-[220px] 448px:rounded-sm rounded-none overflow-hidden">
                <img
                  src={url}
                  alt="thumbnails"
                  className="w-full h-full hover:cursor-pointer"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col items-between lg:mt-4 mt-0 gap-1 448px:pl-0 pl-2">
                <h1 className="font-bold">{title}</h1>
                <p className="font-medium tracking-wide">{channelTitle}</p>
                <div className="flex gap-4">
                  <p>{views(viewCount ? viewCount : 0)} views</p>
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
