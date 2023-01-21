// [{ queryPath: ApiPaths.Clinic.GetAll({ page: pageNo, limit: pageSize }) }],
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import ApiPaths from '../../paths/apiPaths';
import { TQueryKey } from '../../types/reactQuery';

const clinicCache = (page: number, limit: number): TQueryKey => {
  return [
    {
      queryPath: ApiPaths.Clinic.GetAll({
        page: page,
        limit: limit,
      }),
    },
  ];
};

export default clinicCache;
