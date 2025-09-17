import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import upload from "../assets/upload.png";
import notification from "../assets/notification.png";
import more from "../assets/more.png";
import userProfile from "../assets/user_profile.jpg";
import { Link } from "react-router";
import { useEffect } from "react";

function Navbar({
  setHideAsideText,
  setQuery,
  query,
  setDebouncedQuery,
  isTrue,
}) {
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="fixed w-full z-1 bg-white">
      <div className=" flex justify-between items-center sm:py-4 py-3 sm:px-8 px-4 shadow-nav">
        <div className="flex gap-4">
          {isTrue ? (
            <img
              src={menu}
              alt="menu"
              className="w-[20px] h-[16px] hover:cursor-pointer 848px:block hidden"
              onClick={() => setHideAsideText((perv) => (perv ? false : true))}
            />
          ) : (
            <></>
          )}

          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="sm:w-[96px] w-[80px]  hover:cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:w-sm 448px:w-3xs w-[180px] sm:h-[32px] h-[28px] border-gray-600 border rounded-2xl px-4 ">
          <input
            type="text"
            value={query}
            placeholder="Search"
            className="w-full outline-none hover:cursor-pointer text-[12px] 448px:text-[16px]"
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src={search}
            alt="search"
            className="sm:w-[20px] sm:h-[20px] 448px:w-[16px] 448px:h-[16px] w-[12px] h-[12px] hover:cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          <img
            src={upload}
            alt="upload"
            className="w-[25px] h-[25px] hover:cursor-pointer 848px:block hidden"
          />
          <img
            src={more}
            alt="more"
            className="w-[25px] h-[25px] hover:cursor-pointer 848px:block hidden"
          />
          <img
            src={notification}
            alt="notification"
            className="w-[25px] h-[25px] hover:cursor-pointer 848px:block hidden"
          />
          <img
            src={userProfile}
            alt="userProfile"
            className="rounded-full w-[25px] h-[25px]  hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
