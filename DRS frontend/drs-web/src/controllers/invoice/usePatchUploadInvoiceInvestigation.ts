import { usePatchMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IInvoiceInvestigationUploadPayload } from '../../interfaces/controllers/invoice/invoiceInvestigationUploadPayload.interface';
import { IInvoiceInvestigationUploadResponse } from '../../interfaces/controllers/invoice/invoiceInvestigationUploadResponse.interface';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';

const handleSuccess = () => {
  successToast('Successfully Updated!');
};

export const usePatchUploadInvoiceInvestigation = () => {
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<IInvoiceInvestigationUploadResponse>,
    IInvoiceInvestigationUploadPayload
  >(
    {
      pathFn: (id) => ApiPaths.Invoice.UploadInvoiceInvestigation(id),
    },
    { onSuccess: () => handleSuccess() },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  return { mutatePatchUploadInvoiceInvestigation: mutate, isLoading };
};
