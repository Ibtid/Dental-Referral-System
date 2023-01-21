import { object, string } from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createPostValidationSchema = object({
  name: string().required('Required!'),
  shortName: string().required('Required!'),
  address: string().required('Required!'),
  contactNumber: string()
    .required('Required!')
    .matches(phoneRegExp, 'Phone number is not valid'),
  email: string().required('Required!').email(),
  website: string(),
  username: string().required('Required!'),
  password: string().required('Required!'),
  adminEmail: string().required('Required!').email(),
  adminFullName: string().required('Required!'),
  adminPhone: string()
    .required('Required!')
    .matches(phoneRegExp, 'Phone number is not valid'),
});
