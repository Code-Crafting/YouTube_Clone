import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import upload from "../assets/upload.png";
import notification from "../assets/notification.png";
import more from "../assets/more.png";
import userProfile from "../assets/user_profile.jpg";

function Navbar() {
  return (
    <div className="fixed w-full">
      <div className=" flex justify-between items-center py-4 px-8 shadow-nav">
        <div className="flex gap-4">
          <img
            src={menu}
            alt="menu"
            className="w-[20px] h-[16px] hover:cursor-pointer"
          />
          <img
            src={logo}
            alt="logo"
            className="w-[96px] hover:cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 w-sm border-gray-600 border rounded-2xl px-4 h-[32px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none hover:cursor-pointer"
          />
          <img
            src={search}
            alt="search"
            className="w-[20px] h-[20px] hover:cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          <img
            src={upload}
            alt="upload"
            className="w-[25px] h-[25px] hover:cursor-pointer"
          />
          <img
            src={more}
            alt="more"
            className="w-[25px] h-[25px] hover:cursor-pointer"
          />
          <img
            src={notification}
            alt="notification"
            className="w-[25px] h-[25px] hover:cursor-pointer"
          />
          <img
            src={userProfile}
            alt="search"
            className="rounded-full w-[25px] h-[25px] hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
