import { QueryClient, useQueryClient } from 'react-query';
import { initialPageNo } from '../../consts/initialPageDetails';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { ICompanyUser } from '../../interfaces/controllers/companyUser';
import { IUserCreatePostPayload } from '../../interfaces/controllers/user';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import companyUserCache from '../companyUser/cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  successToast('Successfully Created!');
  if (setPageNo) {
    setPageNo(initialPageNo);
    queryClient.invalidateQueries(companyUserCache(initialPageNo, pageSize!));
  }
};

export const usePostUser = (
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<ICompanyUser>,
    IUserCreatePostPayload
  >(
    {
      path: ApiPaths.User.Root(),
    },
    { onSuccess: () => handleSuccess(queryClient, pageSize, setPageNo) }
  );

  return { mutatePostUser: mutate, isLoading };
};
