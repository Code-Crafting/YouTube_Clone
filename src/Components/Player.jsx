import { useParams } from "react-router";
import { date, views } from "../../functions";
import { useEffect, useState } from "react";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import user from "../assets/user_profile.jpg";
import comment from "../assets/comment.svg";
import { formatDistance, subDays } from "date-fns";
import VideoReview from "./VideoReview";
import CommentSec from "./CommentSec";
import PlayList from "./PlayLIst";
import Navbar from "./Navbar";

function Player() {
  const { id, categoryId } = useParams();

  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [commentsDetails, setCommentDetails] = useState(null);
  const [commentOn, setCommentOn] = useState(false);

  useEffect(() => {
    // getting video details
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setVideoDetails(res.items[0]);
      });

    // getting comment details
    fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2C%20replies&maxResults=50&videoId=${id}&key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setCommentDetails(res.items);
      });
  }, [id]);

  // getting channel details
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
    <>
      <Navbar />
      <div className="relative">
        <div className="absolute w-full top-0 left-0 pl-8 z-0">
          <div className="max-w-[1536px] mx-auto h-dvh pt-24 flex gap-4 ">
            <div className="w-[60%] overflow-y-scroll no-scrollbar overscroll-auto">
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
                <div className="flex flex-col items-between mt-4 gap-4">
                  <h1 className="text-2xl font-bold">
                    {videoDetails.snippet.title}
                  </h1>
                  <div className="flex items-center justify-between gap-4">
                    <p>
                      {views(videoDetails.statistics.viewCount)} views &bull;{" "}
                      {date(videoDetails.snippet.publishedAt)}
                    </p>

                    <div className="flex gap-4">
                      <VideoReview
                        imgSrc={like}
                        imgAlt="like"
                        stats={views(videoDetails.statistics.likeCount)}
                      />
                      <VideoReview
                        imgSrc={dislike}
                        imgAlt="dislike"
                        stats="0"
                      />
                      <VideoReview
                        imgSrc={comment}
                        imgAlt="comment"
                        stats={views(
                          videoDetails
                            ? videoDetails.statistics.commentCount
                            : 0
                        )}
                        onClick={() =>
                          setCommentOn((prev) => (prev ? false : true))
                        }
                      />
                      <VideoReview
                        imgSrc={share}
                        imgAlt="share"
                        stats="Share"
                      />

                      <VideoReview imgSrc={save} imgAlt="save" stats="Save" />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <hr className="mt-4 rounded-md text-gray-600" />

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-3 items-center">
                  {channelDetails ? (
                    <img
                      src={channelDetails.snippet.thumbnails.high.url}
                      alt="youtuber pic"
                      className="w-[48px] h-[48px] rounded-full "
                    />
                  ) : (
                    <div className="w-[48px] h-[48px] rounded-full bg-gray-500"></div>
                  )}

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

              <div className="ml-14 mt-4 pb-2">
                <div className="">
                  <p>
                    {videoDetails
                      ? videoDetails.snippet.description.slice(0, 250) + "..."
                      : ""}
                  </p>

                  {commentOn ? (
                    <CommentSec
                      videoDetails={videoDetails}
                      commentsDetails={commentsDetails}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <PlayList categoryId={categoryId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
