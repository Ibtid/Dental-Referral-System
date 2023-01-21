import { useReactQuery } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import { IDoctor } from "../../interfaces/controllers/doctor";
import ApiPaths from "../../paths/apiPaths";

export const useGetDoctors = () => {
  const { data } = useReactQuery<IAxiosResponse<IDoctor[]>>([
    { queryPath: ApiPaths.Doctor.Root() },
  ]);

  return { doctors: data };
};
