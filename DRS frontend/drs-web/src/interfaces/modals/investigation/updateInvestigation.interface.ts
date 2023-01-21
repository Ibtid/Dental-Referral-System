import { Dispatch, SetStateAction } from 'react';
import { IInvestigation } from '../../controllers/investigations';

export interface IUpdateInvestigationModalProps {
  pageNo: number;
  pageSize: number;
  selectedInvestigation: IInvestigation;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
