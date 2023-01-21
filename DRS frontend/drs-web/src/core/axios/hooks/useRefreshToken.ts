import { IAxiosResponse } from '../../../interfaces/axios';
import { IRefreshResponse } from '../../../interfaces/controllers/auth';
import ApiPaths from '../../../paths/apiPaths';
import { usePublicAxios } from './usePublicAxios';

export const useRefreshToken = () => {
  const { publicGet } = usePublicAxios();
  const refresh = async () => {
    const response = await publicGet<IAxiosResponse<IRefreshResponse>>(
      ApiPaths.Auth.Refresh,
      { withCredentials: true }
    );

    return response;
  };
  return refresh;
};
