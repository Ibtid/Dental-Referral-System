import { useReactQuery } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import { IDoctor } from "../../interfaces/controllers/doctor";
import ApiPaths from "../../paths/apiPaths";

export const useGetDoctorById = (id: number) => {
  const { data } = useReactQuery<IAxiosResponse<IDoctor>>([
    { queryPath: ApiPaths.Doctor.ById(id) },
  ]);

  return { doctorDetails: data };
};
