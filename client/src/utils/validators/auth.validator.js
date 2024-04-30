import * as Yup from "yup";

export const signInValidation = Yup.object({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
});

export const signUpValidation = Yup.object({
  username: Yup.string().required("username is required"),
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
  confirm_password: Yup.string()
    .required("confirm password is required")
    .oneOf(
      [Yup.ref("password")],
      "confirm password does not match with password"
    ),
  name: Yup.string().required("name is required").max(50),
  phone_number: Yup.string()
    .required("phone number is required")
    .min(10)
    .max(10),
});
