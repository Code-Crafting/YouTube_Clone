function VideoReview({ imgSrc, imgAlt, stats, onClick }) {
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className="sm:w-[20px] sm:h-[20px] w-[15px] h-[15px]"
      />
      <p className="text-[14px] sm:text-[16px]">{stats}</p>
    </div>
  );
}

export default VideoReview;
