import { IEnv, IEnvReturn } from "../interfaces/env";

const useEnv = (): IEnvReturn => {
  const env: IEnv = import.meta.env;
  const { VITE_BASE_URL, VITE_APP_NAME } = env;

  return {
    baseURL: VITE_BASE_URL,
    appName: VITE_APP_NAME,
  };
};
export default useEnv;
