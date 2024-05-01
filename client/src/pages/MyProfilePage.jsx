import { useSelector } from "react-redux";
import moment from "moment";

import user from "../assets/user.png";
import Navbar from "../components/Navbar";
import { IoIosMail, FaPhoneAlt } from "../components/common/Icons";

export default function MyProfilePage() {
  const userInfo = useSelector((state) => state.profile);

  console.log(userInfo);

  return (
    <div className="px-10 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center gap-10">
        <img src={user} alt="User Image" className="w-1/6" />
        <div>
          <h3 className="text-3xl font-semibold">{userInfo.name}</h3>
          <h3 className="italic">{userInfo.username}</h3>
          <div className="mt-10 text-lg space-y-1">
            <div className="flex items-center gap-5">
              <IoIosMail className="text-2xl" />
              {userInfo.email}
            </div>
            <div className="flex items-center gap-5">
              <FaPhoneAlt className="text-xl mr-1" />
              {userInfo.phone_number}
            </div>
            {userInfo.lastLogin && (
              <div className="flex items-center gap-5">
                Last Login:
                <span className="font-semibold">
                  {moment(userInfo.lastLogin).format("MMM DD, YYYY h:mm A")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
