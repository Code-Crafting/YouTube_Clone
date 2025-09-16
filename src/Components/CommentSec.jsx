import { views } from "../../functions";
import dislike from "../assets/dislike.png";
import like from "../assets/like.png";

function CommentSec({ videoDetails, commentsDetails }) {
  return (
    <>
      <hr className="my-2 text-gray-600 rounded-md" />
      <h1 className="448px:text-[16px] text-[14px]">
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
                  className="448px:w-[32px] w-[26px] rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-medium 448px:text-[16px] text-[14px]">
                    {el.snippet.topLevelComment.snippet.authorDisplayName}
                  </h1>
                  <p className="448px:text-[16px] text-[14px]">
                    {el.snippet.topLevelComment.snippet.textOriginal}
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={like}
                        alt="like"
                        className="w-[16px] h-[16px]"
                      />
                      <p className="448px:text-[16px] text-[12px]">
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
