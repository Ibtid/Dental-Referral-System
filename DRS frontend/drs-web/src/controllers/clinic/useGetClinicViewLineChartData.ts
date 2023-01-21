import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IClinicViewLineChartData } from '../../interfaces/controllers/clinic';
import ApiPaths from '../../paths/apiPaths';

export const useGetClinicViewLineChartData = () => {
  const { data, isLoading } = useReactQuery<IAxiosResponse<any>>(
    [
      {
        queryPath: ApiPaths.Clinic.LineData(),
      },
    ],
    { keepPreviousData: true }
  );

  return { clinicLineChartData: data, isLoading };
};
