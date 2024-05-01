import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { ax } from "../../utils/axios.util";

import Card from "../../components/common/Card";
import TextField from "../../components/common/forms/TextField";
import Button from "../../components/common/forms/Button";
import Select from "../../components/common/forms/Select";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";

export default function FindRestaurantPage() {
  const dispatch = useDispatch();

  const callOnce = useRef(false);

  const initialSearchState = {
    name: "",
    cuisine_type: "",
    state: "",
    city: "",
  };

  const [searchForm, setSearchForm] = useState(initialSearchState);
  const [data, setData] = useState([]);

  // For City and State Drop Down
  const [selectList, setSelectList] = useState([]);

  const handleChange = (e) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRestaurant();
  };

  const getRestaurant = async (findAll = false) => {
    dispatch(setOnLoading());
    try {
      const response = await ax.get("/common/restaurant", {
        params: !findAll ? searchForm : null,
      });
      if (response.status === 200) setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

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

  // Set All Restaurants
  useEffect(() => {
    if (!callOnce.current) {
      callOnce.current = true;
      getRestaurant();
      getSelectionList();
    }
  }, []);

  return (
    <div className="bg-gray-700 text-white rounded w-full p-5">
      <div className="flex justify-between">
        <h3 className="text-3xl font-dinney">Find Restaurants</h3>
        <form onSubmit={handleSubmit} className="flex gap-5 items-center">
          <TextField
            name={"name"}
            value={searchForm.name}
            onChange={handleChange}
            placeholder="Enter Restaurant Name"
          />
          <TextField
            name={"cuisine_type"}
            value={searchForm.cuisine_type}
            onChange={handleChange}
            placeholder="Enter Cuisine Type"
          />

          <Select
            name={"state"}
            onChange={handleChange}
            value={searchForm.state}
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

          <Select
            name={"city"}
            onChange={handleChange}
            value={searchForm.city}
            disabled={!searchForm.state}
          >
            <option className="font-bold" value="">
              Select City
            </option>
            {selectList.map((item) => {
              if (item.name === searchForm.state) {
                return item.cities.map((innerItem, i) => (
                  <option key={i} value={innerItem}>
                    {innerItem}
                  </option>
                ));
              }
            })}
          </Select>

          <Button type="submit" name={"Search"} />
          <Button
            onClick={() => {
              setSearchForm(initialSearchState);
              getRestaurant(true);
            }}
            type="reset"
            name={"Reset"}
          />
        </form>
      </div>
      <div className="mt-5 flex flex-wrap gap-10 items-center">
        {data.map((item, i) => (
          <Card
            name={item.name}
            cuisine={item.cuisine_type}
            timings={item.timing}
            id={item._id}
            location={item.location}
            rating={Math.floor(item.rating.value / item.rating.count)}
            key={i}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
