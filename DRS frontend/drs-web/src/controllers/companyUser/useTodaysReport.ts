import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { ITodaysReport } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const useTodaysReport = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<ITodaysReport[]>>
  >(
    [
      {
        queryPath: ApiPaths.CompanyUser.todaysReport({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    {
      keepPreviousData: true,
    }
  );

  return { todaysReport: data, isLoading: isLoading };
};
