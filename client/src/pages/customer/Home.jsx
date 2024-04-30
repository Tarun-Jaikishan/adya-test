import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Card from "../../components/common/Card";
import HistoryPage from "./HistoryPage";
import ReservePage from "./ReservePage";
import FindRestaurantPage from "./FindRestaurantPage";

export default function Home() {
  return (
    <div className="px-10">
      <Navbar />
      <Routes>
        <Route index path="/" element={<MainContent />} />
        <Route index path="/history" element={<HistoryPage />} />
        <Route index path="/:id/reserve" element={<ReservePage />} />
        <Route index path="/restaurants" element={<FindRestaurantPage />} />

        {/* Not Found */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-gray-700 text-white rounded w-full p-5">
      <h3 className="text-3xl font-dinney">Top Picks For You,</h3>
      <div className="mt-5 flex flex-wrap gap-10 items-center">
        <Card />
        {/* <Card />
    <Card />
    <Card />
    <Card /> */}
      </div>
    </div>
  );
}
