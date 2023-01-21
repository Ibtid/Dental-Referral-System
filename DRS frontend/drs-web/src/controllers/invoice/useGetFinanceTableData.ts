import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IFinance } from '../../interfaces/controllers/finance';
import ApiPaths from '../../paths/apiPaths';

export const useGetFinanceTableData = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IFinance[]>>
  >(
    [
      {
        queryPath: ApiPaths.Invoice.GetFinanceTableData({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { finances: data, isLoading };
};
