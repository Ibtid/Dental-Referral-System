import { AxiosError, AxiosRequestConfig } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { IPutDelMutationConfig } from '../../../interfaces/reactQuery';
import { usePrivateAxios, usePublicAxios } from '../../axios';

// TODO - need to add aborting option

export const usePatchMutation = <TResponse, TVariables extends { id: number }>(
  config: IPutDelMutationConfig,
  options?: Omit<
    UseMutationOptions<TResponse, AxiosError, TVariables>,
    'mutationFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { pathFn, isPrivate = true } = config;
  const { publicPatch } = usePublicAxios();
  const { privatePatch } = usePrivateAxios();

  const mutationFn = ({ id, ...rest }: TVariables) => {
    if (isPrivate) {
      return privatePatch<TResponse, Omit<TVariables, 'id'>>(
        pathFn(id),
        rest,
        axiosRequestConfig
      );
    }
    return publicPatch<TResponse, Omit<TVariables, 'id'>>(
      pathFn(id),
      rest,
      axiosRequestConfig
    );
  };

  return useMutation<TResponse, AxiosError, TVariables>(mutationFn, options);
};
