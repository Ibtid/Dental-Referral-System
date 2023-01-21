import { useReactQuery } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import { IClinic } from "../../interfaces/controllers/clinic";
import ApiPaths from "../../paths/apiPaths";

export const useGetClinicById = (id: number) => {
  const { data } = useReactQuery<IAxiosResponse<IClinic>>([
    { queryPath: ApiPaths.Clinic.ById(id) },
  ]);

  return { clinicDetails: data };
};
