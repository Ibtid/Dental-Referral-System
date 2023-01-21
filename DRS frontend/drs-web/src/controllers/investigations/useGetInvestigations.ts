import { initialPageNo } from '../../consts/initialPageDetails';
import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IInvestigation } from '../../interfaces/controllers/investigations';
import ApiPaths from '../../paths/apiPaths';
import investigationsCache from './cacheName';

export const useGetInvestigations = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IInvestigation[]>>
  >(
    [
      {
        queryPath: ApiPaths.Investigation.GetAll({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { investigations: data, isLoading };
};
