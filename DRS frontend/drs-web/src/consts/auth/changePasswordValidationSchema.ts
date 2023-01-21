import { object, string, ref } from 'yup';

export const changePasswordValidationSchema = object({
  oldPassword: string().required('Required!'),
  newPassword: string().required('Required!'),
  confirmPassword: string().oneOf(
    [ref('newPassword'), null],
    'Passwords must match'
  ),
});
