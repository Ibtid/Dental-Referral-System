import ApiPaths from '../../paths/apiPaths';
import { TQueryKey } from '../../types/reactQuery';

const financeCache = (page: number, limit: number): TQueryKey => {
  return [
    {
      queryPath: ApiPaths.Invoice.GetFinanceTableData({
        page: page,
        limit: limit,
      }),
    },
  ];
};

export default financeCache;
