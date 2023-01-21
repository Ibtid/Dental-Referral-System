import { date, number, object, string } from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formatDate = (): string => {
  return `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
};

export const createPostValidationSchema = object({
  mobileNumber: string()
    .required('Required!')
    .matches(phoneRegExp, 'Phone number is not valid'),
  discount: number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot be more than 100%')
    .required('Required!')
    .typeError('You must specify a number'),
  paid: number()
    .min(0, 'Value cannot be negative')
    .required('Required!')
    .typeError('You must specify a number'),
  paymentMethod: string().required('Required!'),
  paymentDescription: string().required('Required!'),
  deliveryTime: date()
    .required('Required!')
    .typeError('please enter a valid date')
    .min(formatDate(), 'Date is too early'),
});
