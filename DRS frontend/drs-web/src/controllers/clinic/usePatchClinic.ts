import { QueryClient, useQueryClient } from 'react-query';
import { usePatchMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import {
  IClinic,
  IClinicCreatePatchPayload,
} from '../../interfaces/controllers/clinic';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import clinicCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageNo: number,
  pageSize: number
) => {
  successToast('Successfully Updated!');
  queryClient.invalidateQueries(clinicCache(pageNo, pageSize));
};

export const usePatchClinic = (pageNo: number, pageSize: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = usePatchMutation<
    IAxiosResponse<IClinic>,
    IClinicCreatePatchPayload
  >(
    {
      pathFn: (id) => ApiPaths.Clinic.ById(id),
    },
    { onSuccess: () => handleSuccess(queryClient, pageNo, pageSize) }
  );

  return { mutatePatchClinic: mutate, isLoading };
};
