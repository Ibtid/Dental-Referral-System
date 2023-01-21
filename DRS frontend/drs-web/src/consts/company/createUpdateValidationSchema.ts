import { object, string } from 'yup';

export const createUpdateValidationSchema = object({
  name: string().required('Required!'),
  shortName: string().required('Required!'),
  address: string().required('Required!'),
  contactNumber: string().required('Required!'),
  email: string().required('Required!').email(),
  website: string(),
  status: string(),
});
