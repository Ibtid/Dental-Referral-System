import { QueryClient, useQueryClient } from 'react-query';
import { usePatchMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  IInvestigation,
  IInvestigationCreatePatchPayload,
} from '../../interfaces/controllers/investigations';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import investigationsCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageNo: number,
  pageSize: number
) => {
  successToast('Successfully Updated!');
  queryClient.invalidateQueries(investigationsCache(pageNo, pageSize));
};

export const usePatchInvestigation = (pageNo: number, pageSize: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<IInvestigation>,
    IInvestigationCreatePatchPayload
  >(
    {
      pathFn: (id) => ApiPaths.Investigation.ById(id),
    },
    { onSuccess: () => handleSuccess(queryClient, pageNo, pageSize) }
  );

  return { mutatePatchInvestigation: mutate, isLoading };
};
