import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { ICompany } from '../../interfaces/controllers/company';
import ApiPaths from '../../paths/apiPaths';

export const useGetCompany = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<ICompany[]>>
  >(
    [
      {
        queryPath: ApiPaths.Company.GetAll({
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

  return { companies: data, isLoading };
};
