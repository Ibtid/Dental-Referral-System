import { Dispatch, SetStateAction } from 'react';
import { IClinic } from '../../controllers/clinic';

export interface IUpdateClinicModalProps {
  pageNo: number;
  pageSize: number;
  selectedClinic: IClinic;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
