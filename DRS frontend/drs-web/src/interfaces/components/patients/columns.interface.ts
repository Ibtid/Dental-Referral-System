import { Dispatch, SetStateAction } from 'react';
import { IPatient } from '../../controllers/patient';

export interface IGetColumnsProps {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setselectedPatient: Dispatch<SetStateAction<IPatient | undefined>>;
  setselectedPatientId: Dispatch<SetStateAction<number | undefined>>;
}
