import { Dispatch, SetStateAction } from 'react';
import { ICompany } from '../../controllers/company';

export interface IUpdateCompanyModalProps {
  pageNo: number;
  pageSize: number;
  selectedCompany: ICompany;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
