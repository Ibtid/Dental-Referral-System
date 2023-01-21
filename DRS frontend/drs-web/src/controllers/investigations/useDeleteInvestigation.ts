import { QueryClient, useQueryClient } from 'react-query';
import { useDeleteMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IDeleteController } from '../../interfaces/common';
import { IClinic } from '../../interfaces/controllers/clinic';
import { IInvestigation } from '../../interfaces/controllers/investigations';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import investigationsCache from './cacheName';

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
    queryClient.invalidateQueries(investigationsCache(pageNo - 1, pageSize));
  } else {
    queryClient.invalidateQueries(investigationsCache(pageNo, pageSize));
  }
};

export const useDeleteInvestigation = ({
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
}: IDeleteController) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteMutation<
    IAxiosResponse<IInvestigation>,
    { id: number }
  >(
    { pathFn: (id) => ApiPaths.Investigation.ById(id) },
    {
      onSuccess: () =>
        handleSuccess(queryClient, pageNo, pageSize, totalCount, setPageNo),
    }
  );
  return { mutateDeleteInvestigation: mutate };
};
