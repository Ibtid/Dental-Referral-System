import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IClinicPatientTableData } from '../../interfaces/controllers/clinic';
import ApiPaths from '../../paths/apiPaths';

export const useGetClinicPatientTable = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IClinicPatientTableData[]>>
  >(
    [
      {
        queryPath: ApiPaths.Clinic.PatientTableData({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { clinicPatientTableData: data, isLoading };
};
