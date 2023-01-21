import ApiPaths from '../../paths/apiPaths';
import { TQueryKey } from '../../types/reactQuery';

const investigationsCache = (page: number, limit: number): TQueryKey => {
  return [
    {
      queryPath: ApiPaths.Investigation.GetAll({
        page: page,
        limit: limit,
      }),
    },
  ];
};

export default investigationsCache;
