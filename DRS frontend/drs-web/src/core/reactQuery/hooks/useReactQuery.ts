import { AxiosError, AxiosRequestConfig } from 'axios';
import { QueryFunctionContext, useQuery, UseQueryOptions } from 'react-query';
import { TQueryKey } from '../../../types/reactQuery';
import { usePrivateAxios, usePublicAxios } from '../../axios';

export const useReactQuery = <TResponse>(
  queryKey: TQueryKey,
  options?: Omit<
    UseQueryOptions<TResponse, AxiosError, TResponse, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { publicGet } = usePublicAxios();
  const { privateGet } = usePrivateAxios();

  const queryFn = ({ queryKey, signal }: QueryFunctionContext<TQueryKey>) => {
    const [{ queryPath, enableAbort, isPrivate = true }] = queryKey;

    if (isPrivate) {
      return privateGet<TResponse>(queryPath, {
        signal: enableAbort ? signal : undefined,
        ...axiosRequestConfig,
      });
    }

    return publicGet<TResponse>(queryPath, {
      signal: enableAbort ? signal : undefined,
      ...axiosRequestConfig,
    });
  };

  return useQuery<TResponse, AxiosError, TResponse, TQueryKey>(
    queryKey,
    queryFn,
    options
  );
};
