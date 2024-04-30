import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

// Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ax } from "../../utils/axios.util";
import {
  TbToolsKitchen2,
  IoLocation,
  FaRegClock,
  MdOutlineWbSunny,
} from "../../components/common/Icons";
import { setOnLoading, setOffLoading } from "../../redux/loadingSlice";
import { convert24to12 } from "../../utils/moment.util";

import Button from "../../components/common/forms/Button";
import {
  removeSlot,
  resetData,
  setDate,
  setSlot,
  setTable,
} from "../../redux/reserveSlice";
import { toast } from "react-toastify";
import DialogBox from "../../components/common/DialogBox";

export default function ReservePage() {
  const callOnce = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restaurantData = useSelector((state) => state.reserve);

  // Table List
  const [tables, setTables] = useState([]);

  // Slots List
  const [slots, setSlots] = useState([]);

  // Page Track
  const [page, setPage] = useState(0);

  // State For Dialog Box
  const [openDialog, setOpenDialog] = useState(false);

  // State For Ratung
  const [value, setValue] = useState(0);

  // Fetch Tables of a Restaurant
  const getTables = async () => {
    dispatch(setOnLoading());
    try {
      let id = location.pathname.split("/");
      id = id[id.length - 2];
      const response = await ax.get("/customer/tables", { params: { id } });
      if (response.status === 200) setTables(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  // Fetch Slots of a Restaurant with TableId
  const getSlots = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.post("/customer/slots", {
        id: restaurantData?.restaurantId,
        dateOfBooking: restaurantData?.dateOfBooking
          ? restaurantData?.dateOfBooking
          : moment(new Date()).format("YYYY-MM-DD"),
        tableId: restaurantData?.tableId,
      });
      if (response.status === 200) {
        if (!restaurantData?.dateOfBooking)
          dispatch(setDate(moment(new Date()).format("YYYY-MM-DD")));
        setSlots(response.data.data);
        setPage(1);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  // Place Reservation
  const reserveSlot = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.post("/customer/booking", {
        restaurantId: restaurantData?.restaurantId,
        slots: restaurantData?.slots,
        tableId: restaurantData?.tableId,
        dateOfBooking: restaurantData?.dateOfBooking,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setOpenDialog(true);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  // Rating API
  const rating = async (value) => {
    dispatch(setOnLoading());
    try {
      const response = await ax.put("/customer/rating", {
        id: restaurantData?.restaurantId,
        rating: value,
      });
      if (response.status === 200) {
        setOpenDialog(false);
        toast.success(response.data.message);
        dispatch(resetData());
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  // To Fetch Tables of a Restaurant
  useEffect(() => {
    if (!callOnce.current) {
      callOnce.current = true;
      getTables();
    }
  }, []);

  // To Track Date Of Booking Change
  useEffect(() => {
    if (page === 1) getSlots();
  }, [restaurantData?.dateOfBooking]);

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
        {/* For Slots */}
        {page === 1 && (
          <div className="flex flex-col border-r h-full p-5">
            <label className="font-dinney">Select Your Date</label>
            <DatePicker
              selected={restaurantData?.dateOfBooking}
              onChange={(date) => {
                dispatch(setDate(moment(date).format("YYYY-MM-DD")));
              }}
              dateFormat="dd/MM/yyyy"
              className="border border-black text-black text-center py-1.5 rounded"
            />
          </div>
        )}

        {/* For Tables */}
        {page === 0 && (
          <div className="p-5">
            <h3 className="text-3xl font-dinney">Tables</h3>
            <div className="py-5 flex flex-wrap gap-7">
              {tables.map((item, i) => {
                return (
                  <button
                    className={`${
                      restaurantData?.tableId === item
                        ? "bg-black !text-white"
                        : ""
                    } px-5 py-3 border-2 border-black  text-black rounded font-semibold hover:bg-black hover:text-white duration-300`}
                    onClick={() => dispatch(setTable(item))}
                    key={i}
                    type="button"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* For Slots */}
        {page === 1 && (
          <div className="p-5">
            <h3 className="text-3xl font-dinney">Slots</h3>
            <div className="py-5 flex flex-wrap gap-7">
              {slots.map((item, i) => {
                return (
                  <button
                    className={`${
                      restaurantData?.slots[0] === item
                        ? "bg-black !text-white"
                        : ""
                    } px-5 py-3 border-2 border-black  text-black rounded font-semibold hover:bg-black hover:text-white duration-300`}
                    onClick={() => dispatch(setSlot(item))}
                    key={i}
                    type="button"
                  >
                    {convert24to12(item.split("-")[0])} -{" "}
                    {convert24to12(item.split("-")[1])}
                  </button>
                );
              })}

              {slots.length === 0 && <div>No Slots Available :(</div>}
            </div>
          </div>
        )}
      </div>

      {/* For Tables */}
      {page === 0 && (
        <div className="flex justify-end gap-5  bg-gray-700 w-full p-5">
          <Button
            onClick={getSlots}
            disabled={!restaurantData?.tableId}
            name={"Next"}
          />
          <Button onClick={() => navigate("/dashboard")} name={"Cancel"} />
        </div>
      )}

      {/* For Slots */}
      {page === 1 && (
        <div className="flex justify-end gap-5  bg-gray-700 w-full p-5">
          <Button
            disabled={!restaurantData?.slots[0]}
            onClick={reserveSlot}
            name={"Confirm"}
          />
          <Button
            onClick={() => {
              dispatch(removeSlot());
              setPage(0);
            }}
            name={"Back"}
          />
        </div>
      )}

      {/* DialogBox For Rating */}
      <DialogBox
        open={openDialog}
        doNotClose={true}
        setOpen={setOpenDialog}
        title={"Please Provide Rating !"}
        ownCancelFunction={() => {
          setOpenDialog(false);
        }}
      >
        <div className="flex justify-center">
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              rating(Number(newValue));
            }}
          />
        </div>
      </DialogBox>
    </div>
  );
}
