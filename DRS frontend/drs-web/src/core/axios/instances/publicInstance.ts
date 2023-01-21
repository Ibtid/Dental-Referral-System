import axios, { AxiosInstance } from "axios";
import useEnv from "../../../hooks/useEnv";

const { baseURL } = useEnv();

export const axiosPublicInstance: AxiosInstance = axios.create({
  baseURL,
});
