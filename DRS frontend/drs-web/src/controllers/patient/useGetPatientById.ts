import { useReactQuery } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import { IPatient } from "../../interfaces/controllers/patient";
import ApiPaths from "../../paths/apiPaths";

export const useGetPatientById = (id: number) => {
  const { data } = useReactQuery<IAxiosResponse<IPatient>>([
    { queryPath: ApiPaths.Patient.ById(id) },
  ]);

  return { patientDetails: data };
};
