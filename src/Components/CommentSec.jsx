import { views } from "../../functions";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";

function CommentSec({ videoDetails, commentsDetails }) {
  return (
    <>
      <hr className="my-2 text-gray-600 rounded-md" />
      <h1>
        {views(videoDetails ? videoDetails.statistics.commentCount : 0)}
        <span className="ml-2">Commments</span>
      </h1>

      {commentsDetails
        ? commentsDetails.map((el, i) => {
            return (
              <div className="flex items-start my-4 gap-4" key={i}>
                <img
                  src={
                    el.snippet.topLevelComment.snippet.authorProfileImageUrl ??
                    user
                  }
                  alt="user"
                  className="w-[32px] rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-medium">
                    {el.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    {/* <span className="pl-2 font-normal">
                                {formatDistance(
                                  subDays(
                                    new Date(),
                                    el.snippet.topLevelComment.snippet.publishedAt.getDate()
                                  ),
                                  el.snippet.topLevelComment.snippet
                                    .publishedAt,
                                  { addSuffix: true }
                                )}
                              </span> */}
                  </h1>
                  <p>{el.snippet.topLevelComment.snippet.textOriginal}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={like}
                        alt="like"
                        className="w-[16px] h-[16px]"
                      />
                      <p>
                        {views(el.snippet.topLevelComment.snippet.likeCount)}
                      </p>
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
            );
          })
        : ""}
    </>
  );
}

export default CommentSec;
