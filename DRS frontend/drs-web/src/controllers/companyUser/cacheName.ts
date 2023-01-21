import ApiPaths from '../../paths/apiPaths';
import { TQueryKey } from '../../types/reactQuery';

const companyUserCache = (page: number, limit: number): TQueryKey => {
  return [
    {
      queryPath: ApiPaths.CompanyUser.GetAll({
        page: page,
        limit: limit,
      }),
    },
  ];
};
export default companyUserCache;
