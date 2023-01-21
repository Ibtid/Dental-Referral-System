import { IClinicDetails, IUserProfile } from '../../controllers/auth';

export interface IAuthContextValue {
  accessToken: string;
  userProfile: IUserProfile | null;
  clinicDetails: IClinicDetails | null;
  isLoggedIn: boolean;
  userRole: string[];
  setAccessToken: (value: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  setUserRole: (value: string[]) => void;
  setUserProfile: (value: IUserProfile) => void;
  setClinicDetails: (value: IClinicDetails) => void;
  setLogout: () => void;
}
