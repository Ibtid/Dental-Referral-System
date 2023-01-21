import { AxiosRequestConfig } from "axios";

export interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}
