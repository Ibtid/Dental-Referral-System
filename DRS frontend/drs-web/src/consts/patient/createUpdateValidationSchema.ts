import { number, object, string } from 'yup';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createUpdateValidationSchema = object({
  name: string().required('Required!'),
  address: string().required('Required!'),
  gender: string().required('Required!'),
  age: number()
    .typeError('Must be a number')
    .min(0, 'Min value 0.')
    .required('Required!'),
  contactNumber: string()
    .required('Required!')
    .matches(phoneRegExp, 'Phone number is not valid'),
  email: string().email('Email is not valid'),
});
