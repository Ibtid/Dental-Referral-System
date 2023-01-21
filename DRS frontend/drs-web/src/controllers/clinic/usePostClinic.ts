import { QueryClient, useQueryClient } from 'react-query';
import { initialPageNo } from '../../consts/initialPageDetails';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  IClinic,
  IClinicCreatePostPayload,
} from '../../interfaces/controllers/clinic';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import clinicCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  successToast('Successfully Created!');
  if (setPageNo) {
    setPageNo(initialPageNo);
    queryClient.invalidateQueries(clinicCache(initialPageNo, pageSize!));
  }
};

export const usePostClinic = (
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<IClinic>,
    Omit<IClinicCreatePostPayload, 'id'>
  >(
    {
      path: ApiPaths.Clinic.Root(),
    },
    { onSuccess: () => handleSuccess(queryClient, pageSize, setPageNo) }
  );
  return { mutatePostClinic: mutate, isLoading };
};
