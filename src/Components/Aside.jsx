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
import { NavLink } from "react-router";

function Aside({ setId, hideAsideText }) {
  const section = [
    { name: "Home", img: home, id: 0 },
    { name: "Gaming", img: gaming, id: 20 },
    { name: "Automobiles", img: automoniles, id: 2 },
    { name: "Sports", img: sports, id: 17 },
    { name: "Entertainment", img: entertainment, id: 24 },
    { name: "Technology", img: technology, id: 28 },
    { name: "Music", img: music, id: 10 },
    { name: "Blogs", img: blogs, id: 22 },
    { name: "News", img: news, id: 25 },
  ];

  const suscribed = [
    { name: "PewDiePie", img: jack },
    { name: "MrBeast", img: simon },
    { name: "Justin Bieber", img: tom },
    { name: "5-Minute Crafts", img: megan },
    { name: "Nas Daily", img: cameron },
  ];

  // const category = [0, 20, 2, 17, 24, 28, 10, 22, 25];

  const active = (e) => {
    // e.target.classList.add("active");
    console.log(e.target.parentElement.id === section[0].id);
  };

  return (
    <div
      className={`w-max h-dvh flex pt-20 pb-4 flex-col gap-4 overflow-y-scroll no-scrollbar overscroll-auto`}
    >
      {section.map((el, i) => (
        <div className="flex gap-4 items-center" key={i} id={el.id}>
          <img
            src={el.img}
            alt="name"
            className="w-[20px] h-[20px] hover:cursor-pointer"
            onClick={(e) => {
              setId(el.id);
              // active(e);
            }}
          />
          {hideAsideText ? (
            ""
          ) : (
            <p
              onClick={() => setId(el.id)}
              className="hover:cursor-pointer text-gray-600"
            >
              {el.name}
            </p>
          )}
        </div>
      ))}
      <hr className="text-gray-600" />

      <p className="text-gray-600 tracking-wide font-medium">
        {hideAsideText ? "" : "SUBSCRIBED"}
      </p>

      <div className="flex flex-col gap-4 justify-center">
        {suscribed.map((el, i) => (
          <div className="flex gap-4 items-center" key={i}>
            <img
              src={el.img}
              alt="name"
              className="w-[24px] h-[24px] rounded-full"
            />
            <p className="hover:cursor-pointer text-gray-600">
              {hideAsideText ? "" : el.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aside;
