import { QueryClient, useQueryClient } from 'react-query';
import {
  initialPageNo,
  initialPageSize,
} from '../../consts/initialPageDetails';
import { usePatchMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IFinance } from '../../interfaces/controllers/finance';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import financeCache from './financeCacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageNo: number,
  pageSize: number
) => {
  successToast('Success!');
  queryClient.invalidateQueries(financeCache(pageNo, pageSize));
};

export const usePatchFinance = (pageNo: number, pageSize: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<IFinance>,
    { id: number }
  >(
    {
      pathFn: (id) => ApiPaths.Invoice.Payment(id),
    },
    { onSuccess: () => handleSuccess(queryClient, pageNo, pageSize) }
  );
  return { mutatePatchFinance: mutate, isLoading };
};
