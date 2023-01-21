import { Dispatch, SetStateAction } from 'react';
import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IExportResponse } from '../../interfaces/common';
import ApiPaths from '../../paths/apiPaths';
import { base64toBlobConverter, downloadBlob } from '../../utils/base64ToBlob';

const onSuccess = (data: IAxiosResponse<IExportResponse>) => {
  if (data.isSuccess) {
    const { base64, mimeType } = data.body;
    const blob = base64toBlobConverter(base64, mimeType);
    downloadBlob(blob, 'Invoice_File');
  }
};

export const usePatientReportDownloadFile = (
  id: number,
  setselectedInvestigationId: Dispatch<SetStateAction<number | undefined>>
) => {
  const { isLoading } = useReactQuery<IAxiosResponse<IExportResponse>>(
    [
      {
        queryPath: ApiPaths.Patient.DownloadReport(id),
      },
    ],
    {
      enabled: !!id,
      onSuccess: (data) => onSuccess(data),
      onSettled: () => setselectedInvestigationId(undefined),
    }
  );

  return { isLoadingInvoiceDownload: isLoading };
};
