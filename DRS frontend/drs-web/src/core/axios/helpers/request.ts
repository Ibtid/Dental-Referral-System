import { AxiosInstance, AxiosRequestConfig } from "axios";

// IMPORTANT: params are different for reuseability

const request = async <R, D = any>(
  instance: AxiosInstance,
  method: string,
  url: string,
  config?: AxiosRequestConfig,
  data?: D
): Promise<R> => {
  const response = await instance({
    method: method,
    url: url,
    data: data,
    ...config,
  });

  return response.data;
};

export default request;
