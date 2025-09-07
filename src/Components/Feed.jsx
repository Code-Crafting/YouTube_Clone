import { useEffect, useState } from "react";
import { apiKey } from "../data";

function Feed({ categoryId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
        console.log(data.items);
      });
  }, [categoryId]);

  const views = (str) => {
    return str.length === 4
      ? str.substr(0, 1) + "K"
      : str.length === 5
      ? str.substr(0, 2) + "K"
      : str.length === 6
      ? str.substr(0, 3) + "K"
      : str.length === 7
      ? str.substr(0, 1) + "M"
      : str.length === 8
      ? str.substr(0, 2) + "M"
      : str.length === 9
      ? str.substr(0, 3) + "M"
      : str;
  };

  const date = (utc) => {
    const d = new Date(utc);
    return d
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .split("/")
      .join("-");
  };

  return (
    <div className="bg-gray-100 w-full h-dvh flex flex-wrap pt-24 pb-4 pl-4  gap-4  overflow-y-scroll no-scrollbar overscroll-auto">
      {data.map((el, i) => {
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
          <div className="w-2xs" key={id}>
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
                <p>{views(viewCount)} views</p>
                <div className="flex items-center">
                  <div className="w-[6px] h-[6px] bg-black rounded-full"></div>
                </div>
                <p>{date(publishedAt)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
