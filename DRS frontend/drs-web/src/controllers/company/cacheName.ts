import ApiPaths from '../../paths/apiPaths';
import { TQueryKey } from '../../types/reactQuery';

const companyCache = (page: number, limit: number): TQueryKey => {
  return [
    {
      queryPath: ApiPaths.Company.GetAll({
        page,
        limit,
      }),
    },
  ];
};

export default companyCache;
