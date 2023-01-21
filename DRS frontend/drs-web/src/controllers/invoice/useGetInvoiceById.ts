import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IInvoice } from '../../interfaces/controllers/invoice';
import ApiPaths from '../../paths/apiPaths';

export const useGetInvoiceById = (id: number) => {
  const { data, refetch, isLoading } = useReactQuery<IAxiosResponse<IInvoice>>([
    { queryPath: ApiPaths.Invoice.ById(id) },
  ]);

  return { refetch, invoiceDetails: data, isLoading };
};
