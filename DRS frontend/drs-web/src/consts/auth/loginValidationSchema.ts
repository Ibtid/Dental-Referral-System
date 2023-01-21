import { object, string } from "yup";

export const loginValidationSchema = object({
  email: string().required("Required!").email(),
  password: string().required("Required!").min(6, "Min 6 Character Needed"),
});
