import { number, object } from 'yup';

export const createUpdateValidationSchema = object({
  amount: number()
    .typeError('you must specify a number')
    .min(1, 'Min value 1.')
    .required('Required'),
});
