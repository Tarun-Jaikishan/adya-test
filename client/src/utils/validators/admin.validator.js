import * as Yup from "yup";

export const restaurantValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  cuisine_type: Yup.string().required("Cuisine type is required"),
  location: Yup.object({
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  }),
  timing: Yup.object().shape({
    from: Yup.number()
      .min(0, "From must be greater than or equal to 0")
      .max(23, "From must be less than or equal to 24")
      .required("From is required"),
    to: Yup.number()
      .min(0, "To must be greater than or equal to 0")
      .max(23, "To must be less than or equal to 24")
      .required("To is required")
      .when("from", (from, schema) => {
        return schema.test({
          test: (to) => {
            return to > from;
          },
          message: "To must be greater than From",
        });
      }),
  }),
});
