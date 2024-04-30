import Navbar from "../../components/Navbar";
import Card from "../../components/common/Card";

import OptionNav from "../../components/customer/OptionNav";

export default function Home() {
  return (
    <div className="px-10">
      <Navbar />
      <OptionNav />
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
    </div>
  );
}
