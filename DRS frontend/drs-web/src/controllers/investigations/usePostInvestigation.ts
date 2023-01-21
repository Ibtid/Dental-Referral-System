import { QueryClient, useQueryClient } from 'react-query';
import { initialPageNo } from '../../consts/initialPageDetails';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  IInvestigation,
  IInvestigationCreatePostPayload,
} from '../../interfaces/controllers/investigations';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import investigationsCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  successToast('Successfully Created!');
  if (setPageNo) {
    setPageNo(initialPageNo);
    queryClient.invalidateQueries(
      investigationsCache(initialPageNo, pageSize!)
    );
  }
};

export const usePostInvestigation = (
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<IInvestigation>,
    Omit<IInvestigationCreatePostPayload, 'id'>
  >(
    {
      path: ApiPaths.Investigation.Root(),
    },
    { onSuccess: () => handleSuccess(queryClient, pageSize, setPageNo) }
  );
  return { mutatePostInvestigation: mutate, isLoading };
};
