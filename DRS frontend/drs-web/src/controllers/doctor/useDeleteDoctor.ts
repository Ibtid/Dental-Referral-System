import { useDeleteMutation } from "../../core/reactQuery";
import ApiPaths from "../../paths/apiPaths";

export const useDeleteDoctor = () => {
  const { mutate } = useDeleteMutation({
    pathFn: (id) => ApiPaths.Doctor.ById(id),
  });
  return { mutateDeleteDoctor: mutate };
};
