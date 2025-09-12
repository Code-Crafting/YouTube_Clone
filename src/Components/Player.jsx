import { useParams } from "react-router";
import { date, views } from "../../functions";
import { useEffect, useState } from "react";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import jack from "../assets/jack.png";
import user from "../assets/user_profile.jpg";

function Player() {
  const { id } = useParams();

  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);

  // console.log(videoDetails.snippet.channelId);

  // getting video details
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setVideoDetails(res.items[0]);
      });
  }, []);

  useEffect(() => {
    if (videoDetails) {
      fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
          videoDetails.snippet.channelId
        }&key=${import.meta.env.VITE_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          setChannelDetails(res.items[0]);
        });
    }
  }, [videoDetails]);

  return (
    <div className="relative">
      <div className="absolute w-full top-0 left-0 pl-8 z-0">
        <div className="max-w-[1536px] mx-auto h-dvh pt-24 flex gap-4 overflow-y-scroll no-scrollbar overscroll-auto">
          <div className="w-[70%]">
            <div className="w-full h-[514px] overflow-hidden rounded-xl ">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {videoDetails ? (
              <div className="flex flex-col items-between mt-4 gap-4 w-[80%]">
                <h1 className="text-2xl font-bold">
                  {videoDetails.snippet.title}
                </h1>
                <div className="flex items-center justify-between gap-4">
                  <p>
                    {views(videoDetails.statistics.viewCount)} views &bull;{" "}
                    {date(videoDetails.snippet.publishedAt)}
                  </p>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={like}
                        alt="like"
                        className="w-[20px] h-[20px]"
                      />
                      <p>{views(videoDetails.statistics.likeCount)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={dislike}
                        alt="dislike"
                        className="w-[20px] h-[20px]"
                      />
                      {/* <p></p> */}
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={share}
                        alt="share"
                        className="w-[20px] h-[20px]"
                      />
                      <p>Share</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={save}
                        alt="save"
                        className="w-[20px] h-[20px]"
                      />
                      <p>Save</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <hr className="mt-4 rounded-md text-gray-600" />

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-3 items-center">
                <img
                  src={jack}
                  alt="youtuber pic"
                  className="w-[48px] h-[48px] rounded-full "
                />
                <div>
                  <h1 className="font-bold text-lg">
                    {videoDetails ? videoDetails.snippet.channelTitle : ""}
                  </h1>
                  <p>
                    {views(
                      channelDetails
                        ? channelDetails.statistics.subscriberCount
                        : 0
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-red-500 text-white h-max px-8 py-1 rounded-md hover:cursor-pointer">
                Subscribe
              </div>
            </div>

            <div className="ml-14 mt-4">
              <div className="">
                <p>
                  {videoDetails
                    ? videoDetails.snippet.description.slice(0, 250)
                    : ""}
                </p>
                <hr className="my-2 text-gray-600 rounded-md" />
                <h1>
                  {views(
                    videoDetails ? videoDetails.statistics.commentCount : 0
                  )}{" "}
                  Commments
                </h1>
                <div className="flex items-start mt-4 gap-4">
                  <img
                    src={user}
                    alt="user"
                    className="w-[32px] rounded-full"
                  />
                  <div>
                    <h1>Name</h1>
                    <p>Comments.....</p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={like}
                          alt="like"
                          className="w-[16px] h-[16px]"
                        />
                        <p></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={dislike}
                          alt="dislike"
                          className="w-[16px] h-[16px]"
                        />
                        {/* <p></p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[25%] border"></div>
        </div>
      </div>
    </div>
  );
}

export default Player;
