import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IAppointmentReview } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const useAppointmentReview = () => {
  const { data } = useReactQuery<IAxiosResponse<IAppointmentReview>>([
    { queryPath: ApiPaths.CompanyUser.appointmentReview() },
  ]);

  return { appointmentReview: data };
};
