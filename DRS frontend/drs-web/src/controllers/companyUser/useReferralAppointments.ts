import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IReferralAppointments } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const useReferralAppointments = () => {
  const { data } = useReactQuery<IAxiosResponse<IReferralAppointments>>([
    { queryPath: ApiPaths.CompanyUser.referralAppointments() },
  ]);

  return { referralAppointments: data };
};
