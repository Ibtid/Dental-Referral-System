import { QueryClient, useQueryClient } from 'react-query';
import { usePatchMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { ICompanyUser } from '../../interfaces/controllers/companyUser';
import { IUserCreatePatchPayload } from '../../interfaces/controllers/user';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import companyUserCache from '../companyUser/cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageNo: number,
  pageSize: number
) => {
  successToast('Successfully Updated!');
  queryClient.invalidateQueries(companyUserCache(pageNo, pageSize));
};

export const usePatchUser = (pageNo: number, pageSize: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<ICompanyUser>,
    IUserCreatePatchPayload
  >(
    {
      pathFn: (id) => ApiPaths.User.ById(id),
    },
    { onSuccess: () => handleSuccess(queryClient, pageNo, pageSize) }
  );

  return { mutatePatchUser: mutate, isLoading };
};
