import { Dispatch, SetStateAction } from 'react';

export interface IPaymentModalProps {
  pageNo: number;
  pageSize: number;
  selectedFinanceId: number;
  showUpdateModal: boolean;
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}
