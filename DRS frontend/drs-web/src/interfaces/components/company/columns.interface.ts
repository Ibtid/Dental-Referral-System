import { Dispatch, SetStateAction } from 'react';
import { ICompany } from '../../controllers/company';

export interface IGetColumnsProps {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setselectedCompany: Dispatch<SetStateAction<ICompany | undefined>>;
  setselectedCompanyId: Dispatch<SetStateAction<number | undefined>>;
}
