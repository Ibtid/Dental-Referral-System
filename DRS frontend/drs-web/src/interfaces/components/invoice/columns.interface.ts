import { Dispatch, SetStateAction } from 'react';

export interface IGetColumnsProps {
  selectedInvestigationId: number;
  selectedInvoiceId: number;
  setselectedInvestigationId: Dispatch<SetStateAction<number | undefined>>;
  setselectedInvoiceId: Dispatch<SetStateAction<number | undefined>>;
  isLoadingInvoiceDownload: boolean;
  isLoadingInvoicePrint: boolean;
}
