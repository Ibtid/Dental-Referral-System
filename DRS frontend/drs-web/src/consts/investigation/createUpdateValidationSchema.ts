import { number, object, string } from 'yup';

export const createUpdateValidationSchema = object({
  name: string().required('Required!'),
  category: string().required('Required!'),
  description: string().required('Required!'),
  referenceValue: string(),
  cost: number()
    .typeError('you must specify a number')
    .min(0, 'Min value 0.')
    .required('Required'),
  comission: number()
    .typeError('you must specify a number')
    .min(0, 'Min value 0.')
    .required('Required'),
});
