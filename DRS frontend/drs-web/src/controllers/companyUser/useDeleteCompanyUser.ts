import { QueryClient, useQueryClient } from 'react-query';
import { useDeleteMutation } from '../../core/reactQuery';
import { IAxiosResponse } from '../../interfaces/axios';
import { IDeleteController } from '../../interfaces/common';
import { ICompanyUser } from '../../interfaces/controllers/companyUser';
import { successToast } from '../../libs/toast';
import ApiPaths from '../../paths/apiPaths';
import companyUserCache from './cacheName';

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
    queryClient.invalidateQueries(companyUserCache(pageNo - 1, pageSize));
  } else {
    queryClient.invalidateQueries(companyUserCache(pageNo, pageSize));
  }
};

export const useDeleteCompanyUser = ({
  pageNo,
  pageSize,
  totalCount,
  setPageNo,
}: IDeleteController) => {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteMutation<
    IAxiosResponse<ICompanyUser>,
    { id: number }
  >(
    {
      pathFn: (id) => ApiPaths.CompanyUser.ById(id),
    },
    {
      onSuccess: () =>
        handleSuccess(queryClient, pageNo, pageSize, totalCount, setPageNo),
    }
  );
  return { mutateDeleteCompanyUser: mutate };
};
