import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const requestInterceptor = (
  instance: AxiosInstance,
  accessToken: string
): number => {
  const requestIntercept = instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  return requestIntercept;
};
export default requestInterceptor;
