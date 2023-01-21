import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { ITest, ITestFilterData } from '../../interfaces/controllers/test';
import ApiPaths from '../../paths/apiPaths';

export const useGetTests = ({
  pageNo,
  pageSize,
  searchData,
  sortData,
  filterData,
}: ICommonTableQueryHookParams<ITestFilterData>) => {
  const { sortby, order } = sortData!;
  const { gender, status } = filterData!;

  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<ITest[]>>
  >(
    [
      {
        queryPath: ApiPaths.Test.GetAll({
          page: pageNo,
          limit: pageSize,
          search: searchData,
          sortby,
          order,
          gender,
          status,
        }),
        enableAbort: true,
      },
    ],
    { keepPreviousData: true }
  );

  return { tests: data, isLoading };
};
