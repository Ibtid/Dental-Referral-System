import { Dispatch, SetStateAction } from 'react';
import { ICompanyUser } from '../../controllers/companyUser';

export interface IGetColumnsProps {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setselectedCompanyUser: Dispatch<SetStateAction<ICompanyUser | undefined>>;
  setselectedCompanyUserId: Dispatch<SetStateAction<number | undefined>>;
}
