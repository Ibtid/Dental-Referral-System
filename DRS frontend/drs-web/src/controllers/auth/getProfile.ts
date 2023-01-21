import { useReactQuery } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import { IUserProfile } from "../../interfaces/controllers/auth";
import ApiPaths from "../../paths/apiPaths";

export const getProfile = () => {
  const { data } = useReactQuery<IAxiosResponse<IUserProfile>>([
    { queryPath: ApiPaths.Auth.Profile },
  ]);

  return { userDetails: data };
};
