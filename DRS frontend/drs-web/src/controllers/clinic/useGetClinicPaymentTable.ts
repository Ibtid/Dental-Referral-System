import { useReactQuery } from '../../core/reactQuery';
import {
  IAxiosResponse,
  IAxiosResponseWithPagination,
} from '../../interfaces/axios';
import { ICommonTableQueryHookParams } from '../../interfaces/common';
import { IClinicPaymentTableData } from '../../interfaces/controllers/clinic';
import ApiPaths from '../../paths/apiPaths';

export const useGetClinicPaymentTable = ({
  pageNo,
  pageSize,
  searchData,
}: ICommonTableQueryHookParams) => {
  const { data, isLoading } = useReactQuery<
    IAxiosResponse<IAxiosResponseWithPagination<IClinicPaymentTableData[]>>
  >(
    [
      {
        queryPath: ApiPaths.Clinic.PaymentTableData({
          page: pageNo,
          limit: pageSize,
          search: searchData,
        }),
      },
    ],
    { keepPreviousData: true }
  );

  return { clinicPaymentTableData: data, isLoading };
};
