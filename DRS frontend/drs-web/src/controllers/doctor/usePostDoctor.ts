import { usePostMutation } from "../../core/reactQuery";
import { IAxiosResponse } from "../../interfaces/axios";
import {
  IDoctor,
  IDoctorCreatePatchPayload,
} from "../../interfaces/controllers/doctor";
import ApiPaths from "../../paths/apiPaths";

export const usePostDoctor = () => {
  const { mutate } = usePostMutation<
    IAxiosResponse<IDoctor>,
    Omit<IDoctorCreatePatchPayload, "id">
  >({
    path: ApiPaths.Doctor.Root(),
  });
  return { mutatePostDoctor: mutate };
};
