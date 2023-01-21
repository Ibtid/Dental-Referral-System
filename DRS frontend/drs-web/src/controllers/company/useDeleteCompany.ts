import { QueryClient, useQueryClient } from 'react-query';
import { useDeleteMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IDeleteController } from '../../interfaces/common';
import { ICompany } from '../../interfaces/controllers/company';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import companyCache from './cacheName';

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
    queryClient.invalidateQueries(companyCache(pageNo - 1, pageSize));
  } else {
    queryClient.invalidateQueries(companyCache(pageNo, pageSize));
  }
};

export const useDeleteCompany = ({
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
}: IDeleteController) => {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteMutation<
    IAxiosResponse<ICompany>,
    { id: number }
  >(
    {
      pathFn: (id) => ApiPaths.Company.ById(id),
    },
    {
      onSuccess: () =>
        handleSuccess(queryClient, pageNo, pageSize, totalCount, setPageNo),
    }
  );
  return { mutateDeleteCompany: mutate };
};
