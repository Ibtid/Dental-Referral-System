import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { ICustomAxiosRequestConfig } from '../../../interfaces/axios';
import UiPaths from '../../../paths/uiPaths';
import { useRefreshToken } from '../hooks/useRefreshToken';

const responseInterceptor = (
  instance: AxiosInstance,
  navigate: NavigateFunction
): number => {
  const refresh = useRefreshToken();

  const responseIntercept = instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const { config, response } = error;
      let prevRequest: ICustomAxiosRequestConfig = config;

      if (response?.status === 401 && !prevRequest.sent) {
        prevRequest.sent = true;
        const response = await refresh();
        if (response.isSuccess) {
          const { access_token } = response.body;

          if (access_token && prevRequest.headers) {
            prevRequest.headers.Authorization = `Bearer ${access_token}`;
          }
          return instance(prevRequest);
        } else {
          navigate(UiPaths.Login);
        }
      }
      return Promise.reject(error);
    }
  );
  return responseIntercept;
};
export default responseInterceptor;
