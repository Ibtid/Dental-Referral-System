import { AxiosInstance, AxiosRequestConfig } from "axios";
import request from "./request";

const axiosRequests = (instance: AxiosInstance) => {
  return {
    getRequest: <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
      request<R>(instance, "get", url, config),
    postRequest: <R, D>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig
    ): Promise<R> => request<R, D>(instance, "post", url, config, data),
    putRequest: <R, D>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig
    ): Promise<R> => request<R, D>(instance, "put", url, config, data),
    patchRequest: <R, D>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig
    ): Promise<R> => request<R, D>(instance, "patch", url, config, data),
    deleteRequest: <R>(url: string, config?: AxiosRequestConfig): Promise<R> =>
      request<R>(instance, "delete", url, config),
  };
};

export default axiosRequests;
