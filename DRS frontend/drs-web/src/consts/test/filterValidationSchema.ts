import { object, string } from "yup";

export const testFilterValidationSchema = object({
  gender: string().required("Required!"),
  status: string().required("Required!"),
});
