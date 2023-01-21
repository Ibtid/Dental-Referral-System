import { Dispatch, SetStateAction } from 'react';
import { IPatient } from '../../controllers/patient';

export interface IUpdatePatientModalProps {
  pageNo: number;
  pageSize: number;
  selectedPatient: IPatient;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
