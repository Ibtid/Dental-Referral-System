import { Dispatch, SetStateAction } from 'react';
import { IInvestigation } from '../../controllers/investigations';

export interface IGetColumnsProps {
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setselectedInvestigation: Dispatch<
    SetStateAction<IInvestigation | undefined>
  >;
  setselectedInvestigationId: Dispatch<SetStateAction<number | undefined>>;
}
