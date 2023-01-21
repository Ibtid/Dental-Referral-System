import { QueryClient, useQueryClient } from 'react-query';
import { useDeleteMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IDeleteController } from '../../interfaces/common';
import { IPatient } from '../../interfaces/controllers/patient';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import patientCache from './cacheName';

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
    queryClient.invalidateQueries(patientCache(pageNo - 1, pageSize));
  } else {
    queryClient.invalidateQueries(patientCache(pageNo, pageSize));
  }
};

export const useDeletePatient = ({
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
}: IDeleteController) => {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteMutation<
    IAxiosResponse<IPatient>,
    { id: number }
  >(
    {
      pathFn: (id) => ApiPaths.Patient.ById(id),
    },
    {
      onSuccess: () =>
        handleSuccess(queryClient, pageNo, pageSize, totalCount, setPageNo),
    }
  );
  return { mutateDeletePatient: mutate };
};
