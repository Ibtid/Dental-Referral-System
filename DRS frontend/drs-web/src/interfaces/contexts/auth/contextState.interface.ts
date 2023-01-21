import { IClinicDetails, IUserProfile } from '../../controllers/auth';

export interface IAuthContextState {
  accessToken: string;
  userProfile: IUserProfile | null;
  clinicDetails: IClinicDetails | null;
  isLoggedIn: boolean;
  userRole: string[];
}
