import ApiPaths from '../../paths/apiPaths';
import { TQueryKey } from '../../types/reactQuery';

const patientCache = (page: number, limit: number): TQueryKey => {
  return [
    {
      queryPath: ApiPaths.Patient.GetAll({
        page,
        limit,
      }),
    },
  ];
};

export default patientCache;
