import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaUserCircle, FaSignOutAlt, FaLock } from "../components/common/Icons";
import { ax } from "../utils/axios.util";

export default function Navbar() {
  const userInfo = useSelector((state) => state.profile);

  const navbarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    try {
      await ax.put("/auth/logout");
      Cookie.remove("access_token");
      Cookie.remove("refresh_token");

      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="flex justify-between items-center py-5">
      <h1 className="font-dinney text-3xl">Dinney</h1>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-5">
          <Link className="font-semibold" to={"/dashboard"}>
            Home
          </Link>
          <Link to={"/dashboard/restaurants"}>Find Restaurants</Link>
          <Link to={"/dashboard/history"}>My Bookings</Link>
          <p className="font-dinney">
            Welcome, <span className="font-semibold">{userInfo.name}</span>
          </p>
        </div>
        <div ref={navbarRef} className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaUserCircle
              size={38}
              className={`${
                menuOpen ? "text-slate-500" : "text-slate-400"
              } hover:text-slate-500 duration-300 shadow-md rounded-full `}
            />
          </button>

          <div
            className={` absolute ${
              menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } duration-300  bg-white border right-0 z-10 w-[13rem] shadow-lg font-semibold rounded`}
          >
            {/* <button
              // onClick={() => {
              //   setOpenFP(true);
              // }}
              className="flex items-center gap-3 text-blue-600 hover:bg-gray-200 duration-300 px-5 py-3 w-full"
            >
              <FaLock />
              Change Password
            </button> */}

            <button
              onClick={logout}
              className="flex items-center gap-3 text-red-600 hover:bg-gray-200 duration-300 px-5 py-3 w-full"
            >
              <FaSignOutAlt />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
