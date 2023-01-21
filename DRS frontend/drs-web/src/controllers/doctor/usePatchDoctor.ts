import { usePatchMutation } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import {
  IDoctor,
  IDoctorCreatePatchPayload,
} from "../../interfaces/controllers/doctor";
import ApiPaths from "../../paths/apiPaths";

export const usePatchDoctor = () => {
  const { mutate } = usePatchMutation<
    IAxiosResponse<IDoctor>,
    IDoctorCreatePatchPayload
  >({
    pathFn: (id) => ApiPaths.Doctor.ById(id),
  });
  return { mutatePatchDoctor: mutate };
};
