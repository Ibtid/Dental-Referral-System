import { Dispatch, SetStateAction } from 'react';
import { IClinic } from '../../controllers/clinic';

export interface IGetColumnsProps {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setselectedClinic: Dispatch<SetStateAction<IClinic | undefined>>;
  setselectedClinicId: Dispatch<SetStateAction<number | undefined>>;
}
