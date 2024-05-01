import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { ax } from "../../utils/axios.util";
import {
  TbToolsKitchen2,
  IoLocation,
  FaRegClock,
  MdOutlineWbSunny,
  MdDateRange,
} from "../../components/common/Icons";
import { convert24to12 } from "../../utils/moment.util";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import { setCardData } from "../../redux/reserveSlice";

export default function HistoryPage() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const getBookings = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.get("/customer/booking");
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <div className="bg-gray-700 text-white rounded w-full p-5">
        <h3 className="text-3xl font-dinney">Your Bookings,</h3>
        <div className="mt-5">
          {data.map((item, i) => (
            <HistoryCard
              key={i}
              name={item.info.name}
              cuisine={item.info.cuisine_type}
              slot={item?.slots[0]}
              id={item.restaurantId}
              location={item.info.location}
              rating={Math.floor(
                item?.info?.rating?.value / item?.info?.rating?.count
              )}
              timings={item.info.timing}
              date={item.dateOfBooking}
              tableId={item.tableId}
            />
          ))}

          {data.length === 0 && (
            <div className="text-center italic">No Bookings Yet :(</div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryCard({
  name,
  cuisine,
  location,
  slot,
  rating = 1,
  id,
  timings,
  tableId,
  date,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        dispatch(setCardData({ id, name, cuisine, location, timings, rating }));
        navigate(`/dashboard/${id}/reserve`);
      }}
      className="w-full flex justify-between items-center hover:bg-slate-600 p-5 duration-300 rounded"
      type="button"
    >
      <div>
        <h1 className="text-3xl font-semibold text-start">{name}</h1>
        <div className="mt-2 flex gap-5 items-center">
          <h3 className="flex items-center gap-2 text-xl">
            <TbToolsKitchen2 className="bg-white text-black text-2xl w-10 h-10 p-1.5 rounded-full" />
            {cuisine}
          </h3>
          <h3 className="flex items-center gap-2 text-xl">
            <IoLocation className="bg-white text-black text-2xl w-10 h-10 p-1.5 rounded-full" />
            {location?.city}, {location?.state}
          </h3>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-black text-start p-3 bg-white w-fit rounded">
          {tableId}
        </h3>
      </div>

      <div>
        {rating > 0 ? (
          <div className="flex justify-center bg-white items-center p-1 rounded shadow-lg">
            <Rating name="read-only" value={rating} readOnly />
          </div>
        ) : (
          <div className="flex gap-1 bg-white items-center justify-center p-1 rounded shadow-lg text-black font-bold font-dinney">
            <MdOutlineWbSunny />
            New
          </div>
        )}
        <div className="mt-2 flex bg-white items-center gap-1 p-2 rounded shadow-lg text-black font-semibold">
          <FaRegClock /> {convert24to12(slot.split("-")[0])} -{" "}
          {convert24to12(slot.split("-")[1])}
        </div>
        <div className="mt-2 justify-center flex bg-white items-center gap-1 p-2 rounded shadow-lg text-black font-semibold">
          <MdDateRange />
          {moment(date).format("MMM DD, YYYY")}
        </div>
      </div>
    </button>
  );
}
