import { QueryClient, useQueryClient } from 'react-query';
import { initialPageNo } from '../../consts/initialPageDetails';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { ICompany } from '../../interfaces/controllers/company';
import { errorToast, successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import companyCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>,
  data?: IAxiosResponse<ICompany>
) => {
  if (data?.isSuccess) {
    successToast('Successfully Created!');
  } else {
    errorToast('Something Went Wrong!');
  }
  if (setPageNo) {
    setPageNo(initialPageNo);
    queryClient.invalidateQueries(companyCache(initialPageNo, pageSize!));
  }
};

export const usePostCompany = (
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<ICompany>,
    FormData
  >(
    {
      path: ApiPaths.Company.Root(),
    },
    {
      onSuccess: (data) =>
        handleSuccess(queryClient, pageSize, setPageNo, data),
    },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );

  return { mutatePostCompany: mutate, isLoading };
};
