import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import { ax } from "../../utils/axios.util";
import { restaurantValidation } from "../../utils/validators/admin.validator";
import {
  TbToolsKitchen2,
  IoLocation,
  FaRegClock,
  MdOutlineWbSunny,
  MdDelete,
} from "../../components/common/Icons";
import { convert24to12 } from "../../utils/moment.util";
import TextField from "../../components/common/forms/TextField";
import ErrMessage from "../../components/common/forms/ErrMessage";
import Select from "../../components/common/forms/Select";
import Button from "../../components/common/forms/Button";

export default function Home() {
  const callOnce = useRef(false);
  const dispatch = useDispatch();

  // For City and State Drop Down
  const [selectList, setSelectList] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // Function To Get State and Cities List
  const getSelectionList = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.get("/common/location");
      if (response.status === 200) setSelectList(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  const getRestaurants = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.get("/admin");
      if (response.status === 200) setRestaurants(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  useEffect(() => {
    if (!callOnce.current) {
      callOnce.current = true;
      getSelectionList();
      getRestaurants();
    }
  }, []);

  const initialValues = {
    name: "",
    cuisine_type: "",
    location: {
      city: "",
      state: "",
    },
    timing: {
      from: "",
      to: "",
    },
  };

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    validationSchema: restaurantValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(setOnLoading());
      try {
        const response = await ax.post("/admin", values);
        if (response.status === 200) {
          toast.success(response.data.message);
          getRestaurants();
          resetForm();
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
      dispatch(setOffLoading());
    },
  });

  return (
    <div className="px-10">
      <Navbar />

      <div className="flex bg-slate-700">
        <div className="w-[40%] p-5 border-r-4 border-white text-white">
          <h1 className="font-semibold text-3xl font-dinney">
            Add New Restaurant
          </h1>
          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            <TextGroup
              title={"Restaurant Name"}
              handleChange={handleChange}
              name={"name"}
              value={values.name}
              errors={errors.name}
              placeholder={"Enter Restaurant Name"}
            />
            <TextGroup
              title={"Cusine Type"}
              handleChange={handleChange}
              name={"cuisine_type"}
              value={values.cuisine_type}
              errors={errors.cuisine_type}
              placeholder={"Enter Cusine Type"}
            />

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-white font-semibold">State</label>
                <Select
                  name={"state"}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "location.state", value: e.target.value },
                    })
                  }
                  value={values.location.state}
                >
                  <option className="font-bold" value="">
                    Select State
                  </option>
                  {selectList.map((item, i) => {
                    return (
                      <option key={i} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>

                {errors.location?.state && (
                  <ErrMessage
                    customStyle="mt-1"
                    value={errors.location?.state}
                  />
                )}
              </div>

              <div className="flex-1">
                <label className="text-white font-semibold">City</label>
                <Select
                  name={"city"}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "location.city", value: e.target.value },
                    })
                  }
                  value={values.location.city}
                  disabled={!values.location.state}
                >
                  <option className="font-bold" value="">
                    Select City
                  </option>
                  {selectList.map((item) => {
                    if (item.name === values.location.state) {
                      return item.cities.map((innerItem, i) => (
                        <option key={i} value={innerItem}>
                          {innerItem}
                        </option>
                      ));
                    }
                  })}
                </Select>

                {errors.location?.city && (
                  <ErrMessage
                    customStyle="mt-1"
                    value={errors.location?.city}
                  />
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <TextGroup
                title={"From"}
                handleChange={(e) =>
                  handleChange({
                    target: { name: "timing.from", value: e.target.value },
                  })
                }
                name={"from"}
                value={values.timing.from}
                errors={errors.timing?.from}
                placeholder={"Enter From Time in 24 Hr"}
                inputType="number"
              />
              <TextGroup
                title={"To"}
                handleChange={(e) =>
                  handleChange({
                    target: { name: "timing.to", value: e.target.value },
                  })
                }
                name={"to"}
                value={values.timing.to}
                errors={errors.timing?.to}
                placeholder={"Enter To Time in 24 Hr"}
                inputType="number"
              />
            </div>

            <div className="flex justify-center items-center">
              <Button type="submit" name={"Add"} />
            </div>
          </form>
        </div>

        <div className="flex-1 p-5">
          <h1 className="font-semibold text-3xl font-dinney text-center text-white">
            Active Restaurants
          </h1>
          <div className="">
            {restaurants.map((item, i) => {
              return (
                <RestaurantList
                  key={i}
                  name={item.name}
                  cuisine={item.cuisine_type}
                  location={item.location}
                  rating={Math.floor(item.rating.value / item.rating.count)}
                  timing={item.timing}
                  id={item._id}
                  setList={setRestaurants}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantList({
  name,
  cuisine,
  location,
  timing,
  rating = 1,
  id,
  setList,
}) {
  const dispatch = useDispatch();

  const deleteRestaurant = async (id) => {
    dispatch(setOnLoading());
    try {
      const response = await ax.delete("/admin", { params: { id } });
      if (response.status === 200) {
        setList((list) => {
          const filterList = list.filter((item) => item._id !== id);
          return filterList;
        });
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  return (
    <div className="w-full flex justify-between items-center hover:bg-slate-600 p-5 duration-300 rounded">
      <div className="text-white">
        <h1 className="text-2xl font-semibold text-start">{name}</h1>
        <div className="mt-2 flex gap-5 items-center">
          <h3 className="flex items-center gap-2 text-lg">
            <TbToolsKitchen2 className="bg-white text-black text-xl w-8 h-8 p-1.5 rounded-full" />
            {cuisine}
          </h3>
          <h3 className="flex items-center gap-2 text-lg">
            <IoLocation className="bg-white text-black text-xl w-8 h-8 p-1.5 rounded-full" />
            {location?.city}, {location?.state}
          </h3>
        </div>
      </div>

      <div className="flex gap-5 items-center">
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
            <FaRegClock /> {convert24to12(timing.from)} -{" "}
            {convert24to12(timing.to)}
          </div>
        </div>
        <button
          className="bg-red-600 p-1 text-white rounded hover:bg-red-800 duration-300"
          type="button"
          onClick={() => deleteRestaurant(id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

// For Forms
function TextGroup({
  title,
  handleChange,
  name,
  value,
  errors,
  placeholder,
  inputType = "",
}) {
  return (
    <div className="flex flex-col flex-1">
      <label className="text-white font-semibold">{title}</label>
      <TextField
        onChange={handleChange}
        name={name}
        value={value}
        placeholder={placeholder}
        type={inputType}
      />
      {errors && <ErrMessage customStyle="mt-1" value={errors} />}
    </div>
  );
}
