import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { ICompanyUser } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';
import companyUserCache from './cacheName';

export const useGetCompanyUser = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<ICompanyUser[]>>
  >(
    [
      {
        queryPath: ApiPaths.CompanyUser.GetAll({
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

  return { companyUsers: data, isLoading };
};
