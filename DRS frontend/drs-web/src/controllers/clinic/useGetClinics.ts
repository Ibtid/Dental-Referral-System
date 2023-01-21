import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IClinic } from '../../interfaces/controllers/clinic';
import ApiPaths from '../../paths/apiPaths';

export const useGetClinics = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IClinic[]>>
  >(
    [
      {
        queryPath: ApiPaths.Clinic.GetAll({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { clinics: data, isLoading };
};
