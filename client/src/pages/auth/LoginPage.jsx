import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { ax } from "../../utils/axios.util";

import sidePhoto from "../../assets/restaurant1.jpg";
import Button from "../../components/common/forms/Button";
import TextField from "../../components/common/forms/TextField";
import { signInValidation } from "../../utils/validators/auth.validator";
import ErrMessage from "../../components/common/forms/ErrMessage";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import { setProfile } from "../../redux/profileSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signInValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(setOnLoading());
      try {
        const api = import.meta.env.VITE_API_LINK + "/auth/login";
        const response = await axios.post(api, values, {
          withCredentials: true,
        });
        if (response.status === 200) {
          // make it seperate function later
          const response = await ax.get("/auth");
          dispatch(setProfile(response.data.data));
          if (response.data.data.role === "admin") navigate("/admin");
          else navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
      dispatch(setOffLoading());
    },
  });

  return (
    <div className="relative flex flex-1 min-h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <img src={sidePhoto} className="h-full" alt="Image" />
      </div>

      <div className="absolute left-0 top-0 w-1/2 h-full bg-black opacity-65"></div>

      <div className="flex flex-1 justify-center items-center">
        <div>
          <h1 className="text-center font-dinney text-5xl">
            Welcome To Dinney,
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-3 px-10 p-14  bg-black rounded shadow-lg space-y-5"
          >
            <InputGroup
              title={"Username"}
              handleChange={handleChange}
              name={"username"}
              value={values.username}
              errors={errors.username}
              placeholder={"Enter Username"}
            />
            <InputGroup
              title={"Password"}
              handleChange={handleChange}
              name={"password"}
              value={values.password}
              errors={errors.password}
              placeholder={"Enter Password"}
              inputType="password"
            />

            <div>
              <Button type="submit" customStyle="mt-1 w-full" name="Sign In" />
              <p className="mt-1 text-white text-center">
                No account?{" "}
                <Link
                  className="font-semibold underline hover:text-slate-300 duration-300"
                  to={"/register"}
                >
                  Sign Up Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputGroup({
  title,
  handleChange,
  name,
  value,
  errors,
  placeholder,
  inputType = "",
}) {
  return (
    <div className="flex flex-col">
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
