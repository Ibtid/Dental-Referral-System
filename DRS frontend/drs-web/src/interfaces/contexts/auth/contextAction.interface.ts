import { IClinicDetails, IUserProfile } from '../../controllers/auth';
import { IReducersAction } from '../common';

export interface IAuthContextAction
  extends IReducersAction<
    string | string[] | IUserProfile | IClinicDetails | boolean
  > {}
