function VideoReview({ imgSrc, imgAlt, stats, onClick }) {
  return (
    <div
      className="flex items-center gap-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <img src={imgSrc} alt={imgAlt} className="w-[20px] h-[20px]" />
      <p>{stats}</p>
    </div>
  );
}

export default VideoReview;
