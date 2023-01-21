import { Dispatch, SetStateAction } from 'react';
import { ICompanyUser } from '../../controllers/companyUser';

export interface IUpdateCompanyUserModalProps {
  pageNo: number;
  pageSize: number;
  selectedCompanyUser: ICompanyUser;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
