import { AxiosError, AxiosRequestConfig } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { IPostMutationConfig } from '../../../interfaces/reactQuery';
import { usePrivateAxios, usePublicAxios } from '../../axios';

// TODO - need to add aborting option

export const usePostMutation = <TResponse, TVariables>(
  config: IPostMutationConfig,
  options?: Omit<
    UseMutationOptions<TResponse, AxiosError, TVariables>,
    'mutationFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { path, isPrivate = true } = config;
  const { publicPost } = usePublicAxios();
  const { privatePost } = usePrivateAxios();

  const mutationFn = (variables: TVariables) => {
    if (isPrivate) {
      return privatePost<TResponse, TVariables>(
        path,
        variables,
        axiosRequestConfig
      );
    }
    return publicPost<TResponse, TVariables>(
      path,
      variables,
      axiosRequestConfig
    );
  };

  return useMutation<TResponse, AxiosError, TVariables>(mutationFn, options);
};
