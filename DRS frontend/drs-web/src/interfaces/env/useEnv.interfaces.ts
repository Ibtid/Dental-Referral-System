export interface IEnv extends ImportMetaEnv {
  VITE_BASE_URL?: string;
  VITE_APP_NAME?: string;
}

export interface IEnvReturn {
  baseURL?: string;
  appName?: string;
}
