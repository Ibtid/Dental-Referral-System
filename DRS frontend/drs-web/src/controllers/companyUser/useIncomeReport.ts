import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IIncomeReport } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const useIncomeReport = () => {
  const { data } = useReactQuery<IAxiosResponse<IIncomeReport>>([
    { queryPath: ApiPaths.CompanyUser.incomeReport() },
  ]);

  return { incomeReport: data };
};
