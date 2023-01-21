import { array, object, string } from 'yup';

export const createUpdateValidationSchema = object({
  fullName: string().required('Required!'),
  userName: string().required('Required!'),
  phone: string().required('Required!'),
  email: string().required('Required!'),
  //role validation required
  role: array().required("You can't leave this blank.").nullable(),
});
