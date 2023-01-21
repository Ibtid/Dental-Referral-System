import { QueryClient, useQueryClient } from 'react-query';
import { useDeleteMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IDeleteController } from '../../interfaces/common';
import { IClinic } from '../../interfaces/controllers/clinic';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import clinicCache from './cacheName';

const handleSuccess = (
  queryClient: QueryClient,
  pageNo: number,
  pageSize: number,
  totalCount: number,
  setPageNo: React.Dispatch<React.SetStateAction<number>>
) => {
  successToast('Successfully Deleted!');

  const mod: number = totalCount % pageSize;
  if (mod === 1 && pageNo !== 1) {
    setPageNo(pageNo - 1);
    queryClient.invalidateQueries(clinicCache(pageNo - 1, pageSize));
  } else {
    queryClient.invalidateQueries(clinicCache(pageNo, pageSize));
  }
};

export const useDeleteClinic = ({
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
}: IDeleteController) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteMutation<IAxiosResponse<IClinic>, { id: number }>(
    { pathFn: (id) => ApiPaths.Clinic.ById(id) },
    {
      onSuccess: () =>
        handleSuccess(queryClient, pageNo, pageSize, totalCount, setPageNo),
    }
  );
  return { mutateDeleteClinic: mutate };
};
