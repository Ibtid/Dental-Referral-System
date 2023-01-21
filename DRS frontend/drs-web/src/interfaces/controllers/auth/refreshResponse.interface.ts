import { IClinicDetails } from './loginAsClinicResponse.interface';
import { IUserProfile } from './userProfile.interface';

export interface IRefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user_profile?: IUserProfile;
  clinicDetails?: IClinicDetails;
}
