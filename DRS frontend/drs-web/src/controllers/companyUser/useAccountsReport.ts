import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IAccountsReport } from '../../interfaces/controllers/companyUser';
import ApiPaths from '../../paths/apiPaths';

export const useAccountsReport = () => {
  const { data } = useReactQuery<IAxiosResponse<IAccountsReport>>([
    { queryPath: ApiPaths.CompanyUser.accountsReport() },
  ]);

  return { accountsReport: data };
};
