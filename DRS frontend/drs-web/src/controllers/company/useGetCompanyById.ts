import { useReactQuery } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { ICompany } from '../../interfaces/controllers/company';
import ApiPaths from '../../paths/apiPaths';

export const useGetCompanyById = (id: number) => {
  const { data } = useReactQuery<IAxiosResponse<ICompany>>([
    { queryPath: ApiPaths.Company.ById(id) },
  ]);

  return { companyDetails: data };
};
