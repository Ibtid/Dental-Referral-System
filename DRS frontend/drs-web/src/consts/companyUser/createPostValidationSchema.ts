import { array, object, string } from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createPostValidationSchema = object({
  fullName: string().required('Required!'),
  userName: string().required('Required!'),
  phone: string().matches(phoneRegExp, 'Phone number is not valid'),
  email: string().required('Required!'),
  password: string()
    .required('Required!')
    .min(6, 'Your password is too short.'),
  confirmPassword: string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ),
  //role validation required
  role: array()
    .min(1, "You can't leave this blank.")
    .required("You can't leave this blank.")
    .nullable(),
});
