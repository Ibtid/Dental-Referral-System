import { number, mixed, object, string } from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createUpdateValidationSchema = object({
  name: string().required('Required!'),
  address: string().required('Required!'),
  mobile: string().required('Required!').matches(phoneRegExp, 'Not valid'),
  phone: string()
    .nullable(true)
    .matches(phoneRegExp, 'Not valid')
    .transform((value: string, originalValue: string) =>
      originalValue.trim() === '' ? null : value
    ),
  email: string().required('Required!').email(),
  latitude: number()
    .typeError('Must be a number')
    .nullable(true)
    .transform((value: string, originalValue: string) =>
      originalValue.trim() === '' ? null : value
    ),
  longitude: number()
    .typeError('Must be a number')
    .nullable(true)
    .transform((value: string, originalValue: string) =>
      originalValue.trim() === '' ? null : value
    ),
});
