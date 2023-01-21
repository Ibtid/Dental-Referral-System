import { QueryClient, useQueryClient } from 'react-query';
import { initialPageNo } from '../../consts/initialPageDetails';
import { usePostMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  IPatient,
  IPatientCreatePatchPayload,
} from '../../interfaces/controllers/patient';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import patientCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  successToast('Successfully Created!');
  if (setPageNo) {
    setPageNo(initialPageNo);
    queryClient.invalidateQueries(patientCache(initialPageNo, pageSize!));
  }
};

export const usePostPatient = (
  pageSize?: number,
  setPageNo?: React.Dispatch<React.SetStateAction<number>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePostMutation<
    IAxiosResponse<IPatient>,
    Omit<IPatientCreatePatchPayload, 'id'>
  >(
    {
      path: ApiPaths.Patient.Root(),
    },
    { onSuccess: () => handleSuccess(queryClient, pageSize, setPageNo) }
  );
  return { mutatePostPatient: mutate, isLoading };
};
