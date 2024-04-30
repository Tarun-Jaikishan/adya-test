import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "./../components/common/Icons";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center text-blue-500">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-5 text-xl font-semibold">Oops Page Not Found!</p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 mt-3 bg-blue-800 text-white px-5 py-2 rounded hover:bg-blue-900 duration-300"
          >
            <IoIosArrowBack />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
