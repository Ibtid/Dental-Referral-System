import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IClinicCardData } from '../../interfaces/controllers/clinic';
import ApiPaths from '../../paths/apiPaths';

export const useGetClinicCardData = () => {
  const { data, isLoading } = useReactQuery<IAxiosResponse<IClinicCardData>>(
    [
      {
        queryPath: ApiPaths.Clinic.CardsData(),
      },
    ],
    { keepPreviousData: true }
  );

  return { clinicCardData: data, isLoading };
};
