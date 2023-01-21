import { object, string } from 'yup';

export const loginAsPatientValidationSchema = object({
  reportId: string().required('Required!'),
  mobileNumber: string().required('Required!'),
});
