import { useParams } from "react-router";
import { date, views } from "../../functions";
import { useContext, useEffect, useState } from "react";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import comment from "../assets/messages.png";
import VideoReview from "./VideoReview";
import CommentSec from "./CommentSec";
import PlayList from "./PlayLIst";
import Navbar from "./Navbar";
import SearchedContent from "./SearchedContent";
import { SearchContext } from "../Contexts/SearchContext";

function Player() {
  const { id, categoryId } = useParams();

  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [commentsDetails, setCommentDetails] = useState(null);
  const [commentOn, setCommentOn] = useState(false);

  const [query, setQuery, debouncedQuery, setDebouncedQuery] =
    useContext(SearchContext);

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
      <Navbar
        query={query}
        setQuery={setQuery}
        setDebouncedQuery={setDebouncedQuery}
        isTrue={false}
      />
      <div className="relative">
        <div className="absolute w-full top-0 left-0 448px:pl-8 lg:pr-0 448px:pr-8 px-0 z-0">
          {!query ? (
            <div className="max-w-[1536px] mx-auto h-dvh sm:pt-24 pt-16 flex gap-4 lg:flex-row flex-col">
              <div className="lg:w-[60%] w-full lg:overflow-y-scroll no-scrollbar lg:overscroll-auto">
                <div className="w-full sm:h-[514px] 448px:h-[350px] h-[250px] overflow-hidden 448px:rounded-xl ">
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
                  <div className="flex flex-col items-between mt-4 sm:gap-4 gap-2 448px:px-0 px-2">
                    <h1 className="sm:text-2xl text-lg font-bold">
                      {videoDetails.snippet.title}
                    </h1>
                    <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
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

                <div className="flex 448px:flex-row flex-col 448px:items-center items-start justify-between mt-4 448px:px-0 px-2 448px:gap-0 gap-4">
                  <div className="flex gap-3 items-center">
                    {channelDetails ? (
                      <img
                        src={channelDetails.snippet.thumbnails.high.url}
                        alt="youtuber pic"
                        className="sm:w-[48px] sm:h-[48px] w-[32px] h-[32px] rounded-full "
                      />
                    ) : (
                      <div className="sm:w-[48px] sm:h-[48px] w-[32px] h-[32px] rounded-full bg-gray-500"></div>
                    )}

                    <div>
                      <h1 className="font-bold 448px:text-lg text-sm">
                        {videoDetails ? videoDetails.snippet.channelTitle : ""}
                      </h1>
                      <p className="448px:text-[16px] text-[12px]">
                        {views(
                          channelDetails
                            ? channelDetails.statistics.subscriberCount
                            : 0
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500 text-white h-max sm:px-8 px-4 py-1 rounded-md hover:cursor-pointer sm:text-[16px] text-[12px]">
                    Subscribe
                  </div>
                </div>

                <div className="448px:ml-14 ml-2 mt-4 pb-2 448px:pr-0 pr-2">
                  <div className="">
                    <p className="448px:text-[16px] text-[12px]">
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
          ) : (
            <SearchedContent
              debouncedQuery={debouncedQuery}
              setQuery={setQuery}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Player;
