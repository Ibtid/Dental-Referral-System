import { QueryClient, useQueryClient } from 'react-query';
import { usePatchMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  ICompany,
  ICompanyCreatePatchPayload,
} from '../../interfaces/controllers/company';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import companyCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageNo: number,
  pageSize: number
) => {
  successToast('Successfully Updated!');
  queryClient.invalidateQueries(companyCache(pageNo, pageSize));
};

export const usePatchCompany = (pageNo: number, pageSize: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<ICompany>,
    ICompanyCreatePatchPayload
  >(
    {
      pathFn: (id) => ApiPaths.Company.ById(id),
    },
    { onSuccess: () => handleSuccess(queryClient, pageNo, pageSize) }
  );

  return { mutatePatchCompany: mutate, isLoading };
};
