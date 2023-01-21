import { Dispatch } from 'react';
import { IAuthContextAction } from '../../../interfaces/contexts/auth';
import {
  IClinicDetails,
  IUserProfile,
} from '../../../interfaces/controllers/auth';
import {
  ACCESSTOKEN,
  CLINICDETAILS,
  ISLOGGEDIN,
  LOGOUT,
  USERPROFILE,
  USERROLE,
} from './actions';

const createActions = (dispatch: Dispatch<IAuthContextAction>) => ({
  setAccessToken: (value: string) =>
    dispatch({ type: ACCESSTOKEN, payload: value }),
  setIsLoggedIn: (value: boolean) =>
    dispatch({ type: ISLOGGEDIN, payload: value }),
  setUserRole: (value: string[]) =>
    dispatch({ type: USERROLE, payload: value }),
  setUserProfile: (value: IUserProfile) =>
    dispatch({ type: USERPROFILE, payload: value }),
  setClinicDetails: (value: IClinicDetails) =>
    dispatch({ type: CLINICDETAILS, payload: value }),
  setLogout: () => dispatch({ type: LOGOUT }),
});

export default createActions;
