import * as Yup from "yup";

export const signInValidation = Yup.object({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
});
