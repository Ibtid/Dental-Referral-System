import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IClinicProfile } from '../../interfaces/controllers/clinic/clinicProfile.interface';
import ApiPaths from '../../paths/apiPaths';

export const useGetClinicProfile = () => {
  const { data } = useReactQuery<IAxiosResponse<IClinicProfile>>([
    { queryPath: ApiPaths.Clinic.Profile },
  ]);

  return { clinicDetails: data };
};
