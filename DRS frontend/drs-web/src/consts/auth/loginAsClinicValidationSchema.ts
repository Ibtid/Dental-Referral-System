import { object, string } from 'yup';

export const loginAsClinicValidationSchema = object({
  mobile: string().required('Required!'),
});

export const loginAsClinicCodeValidationSchema = object({
  code: string().required('Required!').length(4),
});
