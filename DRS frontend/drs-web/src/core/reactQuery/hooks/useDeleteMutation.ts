import { AxiosError, AxiosRequestConfig } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { IPutDelMutationConfig } from '../../../interfaces/reactQuery';
import { usePrivateAxios, usePublicAxios } from '../../axios';

// TODO - need to add aborting option

export const useDeleteMutation = <TResponse, TVariables extends { id: number }>(
  config: IPutDelMutationConfig,
  options?: Omit<
    UseMutationOptions<TResponse, AxiosError, TVariables>,
    'mutationFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { pathFn, isPrivate = true } = config;
  const { publicDelete } = usePublicAxios();
  const { privateDelete } = usePrivateAxios();

  const mutationFn = ({ id }: TVariables) => {
    if (isPrivate) {
      return privateDelete<TResponse>(pathFn(id), axiosRequestConfig);
    }
    return publicDelete<TResponse>(pathFn(id), axiosRequestConfig);
  };

  return useMutation<TResponse, AxiosError, TVariables>(mutationFn, options);
};
