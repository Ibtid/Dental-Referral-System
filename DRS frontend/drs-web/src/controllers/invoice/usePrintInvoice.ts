import { Dispatch, SetStateAction } from 'react';
import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IExportResponse } from '../../interfaces/common';
import ApiPaths from '../../paths/apiPaths';
import {
  base64toBlobConverter,
  downloadBlob,
  printBlob,
} from '../../utils/base64ToBlob';

const onSuccess = (data: IAxiosResponse<IExportResponse>) => {
  if (data.isSuccess) {
    const { base64, mimeType } = data.body;

    const blob = base64toBlobConverter(base64, mimeType);
    printBlob(blob);
  }
};

export const usePrintInvoice = (
  id: number,
  setselectedInvoiceId: Dispatch<SetStateAction<number | undefined>>
) => {
  const { isLoading } = useReactQuery<IAxiosResponse<IExportResponse>>(
    [
      {
        queryPath: ApiPaths.Invoice.PrintInvoice(id),
      },
    ],
    {
      enabled: !!id,
      onSuccess: (data) => onSuccess(data),
      onSettled: () => setselectedInvoiceId(undefined),
    }
  );

  return { isLoadingInvoicePrint: isLoading };
};
