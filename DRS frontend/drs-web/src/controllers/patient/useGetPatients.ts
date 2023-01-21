import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IPatient } from '../../interfaces/controllers/patient';
import ApiPaths from '../../paths/apiPaths';
import patientCache from './cacheName';

export const useGetPatients = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IPatient[]>>
  >(
    [
      {
        queryPath: ApiPaths.Patient.GetAll({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { patients: data, isLoading };
};
