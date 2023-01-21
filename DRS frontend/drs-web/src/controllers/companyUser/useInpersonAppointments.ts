import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IInpersonAppointments } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const useInpersonAppointments = () => {
  const { data } = useReactQuery<IAxiosResponse<IInpersonAppointments>>([
    { queryPath: ApiPaths.CompanyUser.inpersonAppointments() },
  ]);

  return { inpersonAppointments: data };
};
