export interface IResetPasswordPayload {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}
