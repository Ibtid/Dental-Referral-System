import { IAuthContextState } from '../../../interfaces/contexts/auth';

const initialState: IAuthContextState = {
  accessToken: '',
  userProfile: null,
  clinicDetails: null,
  isLoggedIn: false,
  userRole: [],
};

export default initialState;
