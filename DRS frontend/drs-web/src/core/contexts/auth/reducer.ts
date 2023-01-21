import {
  IAuthContextAction,
  IAuthContextState,
} from '../../../interfaces/contexts/auth';
import {
  IClinicDetails,
  IUserProfile,
} from '../../../interfaces/controllers/auth';
import {
  ACCESSTOKEN,
  CLINICDETAILS,
  ISLOGGEDIN,
  USERPROFILE,
  USERROLE,
  LOGOUT,
} from './actions';
import initialState from './initialState';

export default function authReducer(
  state: IAuthContextState,
  action: IAuthContextAction
): IAuthContextState {
  const { type, payload } = action;

  switch (type) {
    case ACCESSTOKEN:
      return {
        ...state,
        accessToken: payload as string,
      };
    case ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: payload as boolean,
      };
    case USERROLE:
      return {
        ...state,
        userRole: payload as string[],
      };
    case USERPROFILE:
      return {
        ...state,
        userProfile: payload as IUserProfile,
      };
    case CLINICDETAILS:
      return {
        ...state,
        clinicDetails: payload as IClinicDetails,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
