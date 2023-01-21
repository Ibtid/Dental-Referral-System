import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IManageInvoice } from '../../interfaces/controllers/invoice';
import ApiPaths from '../../paths/apiPaths';

export const useGetManageInvoiceData = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IManageInvoice[]>>
  >(
    [
      {
        queryPath: ApiPaths.Invoice.GetManageInvoiceData({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { invoices: data, isLoading };
};
