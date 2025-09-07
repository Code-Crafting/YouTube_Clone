import automoniles from "../assets/automobiles.png";
import blogs from "../assets/blogs.png";
import entertainment from "../assets/entertainment.png";
import gaming from "../assets/game_icon.png";
import home from "../assets/home.png";
import music from "../assets/music.png";
import technology from "../assets/tech.png";
import sports from "../assets/sports.png";
import news from "../assets/news.png";

import tom from "../assets/tom.png";
import simon from "../assets/simon.png";
import megan from "../assets/megan.png";
import cameron from "../assets/cameron.png";
import jack from "../assets/jack.png";

function Aside() {
  const category = [
    { name: "Home", img: home },
    { name: "Gaming", img: gaming },
    { name: "Automobiles", img: automoniles },
    { name: "Sports", img: sports },
    { name: "Entertainment", img: entertainment },
    { name: "Technology", img: technology },
    { name: "Music", img: music },
    { name: "Blogs", img: blogs },
    { name: "News", img: news },
  ];

  const suscribed = [
    { name: "PewDiePie", img: jack },
    { name: "MrBeast", img: simon },
    { name: "Justin Bieber", img: tom },
    { name: "5-Minute Crafts", img: megan },
    { name: "Nas Daily", img: cameron },
  ];
  return (
    <div className="w-max pt-24 pb-4 px-8 flex justify-center flex-col gap-4">
      {category.map((el, i) => (
        <div className="flex gap-4 items-center" key={i}>
          <img src={el.img} alt="name" className="w-[20px] h-[20px]" />
          <p>{el.name}</p>
        </div>
      ))}
      <hr />

      <p className="text-gray-600 tracking-wide font-medium">SUBSCRIBED</p>

      <div className="flex flex-col gap-4 justify-center">
        {suscribed.map((el, i) => (
          <div className="flex gap-4 items-center" key={i}>
            <img
              src={el.img}
              alt="name"
              className="w-[24px] h-[24px] rounded-full"
            />
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aside;
