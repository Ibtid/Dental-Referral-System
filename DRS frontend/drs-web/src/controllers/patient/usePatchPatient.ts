import { QueryClient, useQueryClient } from 'react-query';
import { usePatchMutation } from '../../core/reactQuery';
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
  pageNo: number,
  pageSize: number
) => {
  successToast('Successfully Updated!');
  queryClient.invalidateQueries(patientCache(pageNo, pageSize));
};

export const usePatchPatient = (pageNo: number, pageSize: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<IPatient>,
    IPatientCreatePatchPayload
  >(
    {
      pathFn: (id) => ApiPaths.Patient.ById(id),
    },
    { onSuccess: () => handleSuccess(queryClient, pageNo, pageSize) }
  );
  return { mutatePatchPatient: mutate, isLoading };
};
