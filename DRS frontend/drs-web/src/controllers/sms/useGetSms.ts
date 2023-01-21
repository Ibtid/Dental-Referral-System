import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { ISms } from '../../interfaces/controllers/sms';
import ApiPaths from '../../paths/apiPaths';

export const useGetSms = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<ISms[]>>
  >(
    [
      {
        queryPath: ApiPaths.Sms.GetAll({
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

  return { sms: data, isLoading };
};
