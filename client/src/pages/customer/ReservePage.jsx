import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ax } from "../../utils/axios.util";
import {
  TbToolsKitchen2,
  IoLocation,
  FaRegClock,
  MdOutlineWbSunny,
} from "../../components/common/Icons";
import { setOnLoading } from "../../redux/loadingSlice";
import { setOffLoading } from "../../redux/reserveSlice";
import { convert24to12 } from "../../utils/moment.util";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/common/forms/Button";

export default function ReservePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restaurantData = useSelector((state) => state.reserve);
  let id = location.pathname.split("/");
  id = id[id.length - 2];

  // Table List
  const [tables, setTables] = useState([]);

  // Date
  const [startDate, setStartDate] = useState(new Date());

  const getTables = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.get("/customer/tables", { params });
      if (response.status === 200) setTables(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  useEffect(() => {
    // getTables();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-700 text-white rounded w-full p-5">
        <div>
          <h1 className="text-3xl">{restaurantData?.name}</h1>
          <h3 className="flex items-center gap-2 text-lg">
            <TbToolsKitchen2 />
            {restaurantData?.cuisine}
          </h3>
          <h3 className="flex items-center gap-2 text-lg">
            <IoLocation />
            {restaurantData?.location?.city}, {restaurantData?.location?.state}
          </h3>
        </div>
        <div>
          {restaurantData?.rating > 0 ? (
            <div className="flex justify-center bg-white items-center p-1 rounded shadow-lg">
              <Rating
                name="read-only"
                value={restaurantData?.rating}
                readOnly
              />
            </div>
          ) : (
            <div className="flex gap-1 bg-white items-center justify-center p-1 rounded shadow-lg text-black font-bold font-dinney">
              <MdOutlineWbSunny />
              New
            </div>
          )}
          <div className="mt-2 flex bg-white items-center gap-1 p-2 rounded shadow-lg text-black font-semibold">
            <FaRegClock />
            {convert24to12(restaurantData?.timings?.from)} -{" "}
            {convert24to12(restaurantData?.timings?.to)}
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="flex">
        {/* <div className="flex flex-col border-r h-full p-5">
          <label className="font-dinney">Select Your Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="border border-black text-black text-center py-1.5 rounded"
          />
        </div> */}

        <div className="p-5">
          <h3 className="text-3xl font-dinney">Tables</h3>
          <div className="p-5 flex flex-wrap gap-5">
            <br />
            {tables.map((item, i) => {
              return (
                <button className="" onClick={() => {}} key={i} type="button">
                  {item}
                </button>
              );
            })}
            <button className="" onClick={() => {}} type="button">
              {/* {item} */}ss
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5  bg-gray-700 w-full p-5">
        <Button name={"Confirm"} />
        <Button onClick={() => navigate("/dashboard")} name={"Cancel"} />
      </div>
    </div>
  );
}
