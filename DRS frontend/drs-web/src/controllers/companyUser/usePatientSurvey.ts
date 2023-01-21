import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IPatientSurvey } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const usePatientSurvey = () => {
  const { data } = useReactQuery<IAxiosResponse<IPatientSurvey[]>>([
    { queryPath: ApiPaths.CompanyUser.patientSurvey() },
  ]);

  return { patientSurvey: data };
};
