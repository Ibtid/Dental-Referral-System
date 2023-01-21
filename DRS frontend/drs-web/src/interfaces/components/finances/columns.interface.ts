import { Dispatch, SetStateAction } from 'react';

export interface IGetColumnsProps {
  setselectedFinanceId: Dispatch<SetStateAction<number | undefined>>;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
