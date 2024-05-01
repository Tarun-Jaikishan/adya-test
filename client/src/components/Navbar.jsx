import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaLock,
  FaHome,
  FaSearch,
  FaHistory,
} from "../components/common/Icons";
import { ax } from "../utils/axios.util";
import { removeProfile } from "../redux/profileSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(removeProfile());
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
        {userInfo.role === "admin" && (
          <Link className="font-semibold flex items-center gap-2" to={"/admin"}>
            <FaHome /> Home
          </Link>
        )}
        {userInfo.role === "customer" && (
          <div className="flex items-center gap-5">
            <Link
              className="font-semibold flex items-center gap-2"
              to={"/dashboard"}
            >
              <FaHome /> Home
            </Link>
            <Link
              className="flex items-center gap-2"
              to={"/dashboard/restaurants"}
            >
              <FaSearch />
              Find Restaurants
            </Link>
            <Link className="flex items-center gap-2" to={"/dashboard/history"}>
              <FaHistory />
              My Bookings
            </Link>
            <p className="font-dinney">
              Welcome, <span className="font-semibold">{userInfo.name}</span>
            </p>
          </div>
        )}
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
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 text-slate-600 hover:bg-gray-200 duration-300 px-5 py-3 w-full"
            >
              <FaUserCircle />
              My Profile
            </button>
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
