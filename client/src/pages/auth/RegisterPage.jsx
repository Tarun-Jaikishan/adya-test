import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import sidePhoto from "../../assets/restaurant1.jpg";
import Button from "../../components/common/forms/Button";
import TextField from "../../components/common/forms/TextField";
import { signUpValidation } from "../../utils/validators/auth.validator";
import ErrMessage from "../../components/common/forms/ErrMessage";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import axios from "axios";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signUpValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = { ...values, phone_number: String(values.phone_number) };
      dispatch(setOnLoading());
      try {
        const api = import.meta.env.VITE_API_LINK + "/auth/register";
        const response = await axios.post(api, values, {
          withCredentials: true,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/");
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
        <img src={sidePhoto} className="h-full" />
      </div>

      <div className="absolute left-0 top-0 w-1/2 h-full bg-black opacity-65"></div>

      <div className="flex flex-1 justify-center items-center">
        <div>
          <h1 className="text-center font-diney text-5xl">
            Welcome To Dinney,
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-3 px-10 py-7 bg-black rounded shadow-lg space-y-5"
          >
            <div className="flex items-center justify-center gap-3">
              <InputGroup
                title={"Username"}
                handleChange={handleChange}
                name={"username"}
                value={values.username}
                errors={errors.username}
                placeholder={"Enter Username"}
              />
              <InputGroup
                title={"Name"}
                handleChange={handleChange}
                name={"name"}
                value={values.name}
                errors={errors.name}
                placeholder={"Enter Name"}
              />
            </div>
            <InputGroup
              title={"Phone Number"}
              handleChange={handleChange}
              name={"phone_number"}
              value={values.phone_number}
              errors={errors.phone_number}
              placeholder={"Enter Phone Number"}
              inputType={"number"}
            />
            <InputGroup
              title={"Email"}
              handleChange={handleChange}
              name={"email"}
              value={values.email}
              errors={errors.email}
              placeholder={"Enter Email"}
              inputType={"email"}
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
            <InputGroup
              title={"Confirm Password"}
              handleChange={handleChange}
              name={"confirm_password"}
              value={values.confirm_password}
              errors={errors.confirm_password}
              placeholder={"Enter Confirm Password"}
              inputType="password"
            />
            <div>
              <Button type="submit" customStyle="mt-1 w-full" name="Sign In" />
              <p className="mt-1 text-white text-center">
                Already a member?{" "}
                <Link
                  className="font-semibold underline hover:text-slate-300 duration-300"
                  to={"/"}
                >
                  Sign In
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
