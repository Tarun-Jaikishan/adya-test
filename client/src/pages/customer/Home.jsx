import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "../../components/Navbar";
import Card from "../../components/common/Card";
import HistoryPage from "./HistoryPage";
import ReservePage from "./ReservePage";
import FindRestaurantPage from "./FindRestaurantPage";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import { ax } from "../../utils/axios.util";

export default function Home() {
  return (
    <div className="px-10">
      <Navbar />
      <Routes>
        <Route index path="/" element={<MainContent />} />
        <Route index path="/history" element={<HistoryPage />} />
        <Route index path="/:id/reserve/*" element={<ReservePage />} />
        <Route index path="/restaurants" element={<FindRestaurantPage />} />

        {/* Not Found */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

function MainContent() {
  const dispatch = useDispatch();

  const callOnce = useRef(false);

  const getRestaurant = async () => {
    dispatch(setOnLoading());
    try {
      const response = await ax.get("/customer");
      if (response.status === 200) setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  useEffect(() => {
    if (!callOnce.current) {
      callOnce.current = true;
      getRestaurant();
    }
  }, []);

  const [data, setData] = useState([]);
  return (
    <div className="bg-gray-700 text-white rounded w-full p-5">
      <h3 className="text-3xl font-dinney">Top Picks For You,</h3>
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
          />
        ))}
      </div>
    </div>
  );
}
