import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

import image from "../../assets/restaurant2.jpg";

import {
  TbToolsKitchen2,
  IoLocation,
  FaRegClock,
  MdOutlineWbSunny,
} from "../../components/common/Icons";
import { convert24to12 } from "../../utils/moment.util";
import { setCardData } from "../../redux/reserveSlice";

export default function Card({
  name,
  cuisine,
  location,
  timings,
  rating = 1,
  id,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setCardData({ id, name, cuisine, location, timings, rating }));
        navigate(`/dashboard/${id}/reserve`);
      }}
      className="relative rounded shadow-lg hover:scale-105 duration-300 w-[20rem]"
    >
      <div className="w-[20rem] rounded-t">
        <img src={image} alt="Image" className="rounded-t" />
      </div>
      {rating > 0 ? (
        <div className="!absolute flex top-2 right-2 bg-white items-center p-1 rounded shadow-lg">
          <Rating size="small" name="read-only" value={rating} readOnly />
        </div>
      ) : (
        <div className="!absolute flex gap-1 top-2 right-2 bg-white items-center p-1 rounded shadow-lg text-black font-bold font-dinney">
          <MdOutlineWbSunny />
          New
        </div>
      )}
      <div className="!absolute flex top-[12.5rem] right-2 bg-white items-center gap-1 p-1 rounded shadow-lg text-black text-xs font-semibold">
        <FaRegClock />
        {convert24to12(timings?.from)} - {convert24to12(timings?.to)}
      </div>

      <div className="bg-white text-black p-3 rounded-b">
        <h3 className="text-xl font-semibold text-start">{name}</h3>
        <h5 className="flex items-center gap-2 text-sm text-start">
          <TbToolsKitchen2 />
          {cuisine}
        </h5>
        <h5 className="flex items-center gap-2 text-sm text-start">
          <IoLocation />
          {location?.city}, {location?.state}
        </h5>
      </div>
    </button>
  );
}
