import { QueryClient, useQueryClient } from 'react-query';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';

import {
  IInvoiceCreatePostPayload,
  IPostInvoiceResponse,
} from '../../interfaces/controllers/invoice';
import ApiPaths from '../../paths/apiPaths';

export const usePostInvoice = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setBase64: React.Dispatch<React.SetStateAction<string>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<IPostInvoiceResponse>,
    IInvoiceCreatePostPayload
  >(
    {
      path: ApiPaths.Invoice.Root(),
    },
    {
      onSuccess: (response) => {
        setBase64(response.body.print);
        setShowModal(true);
      },
    }
  );

  return { mutatePostInvoice: mutate, isLoading };
};
