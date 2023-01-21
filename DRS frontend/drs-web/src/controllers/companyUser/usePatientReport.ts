import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IPatientReport } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const usePatientReport = () => {
  const { data } = useReactQuery<IAxiosResponse<IPatientReport>>([
    { queryPath: ApiPaths.CompanyUser.patientReport() },
  ]);

  return { patientReport: data };
};
