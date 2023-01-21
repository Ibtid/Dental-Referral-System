import { QueryClient } from "react-query";
import { useDeleteMutation } from "../../core/reactQuery";
import ApiPaths from "../../paths/apiPaths";
import todoCache from "./cacheName";

const onSuccess = (queryClient: QueryClient) => {
  queryClient.invalidateQueries(todoCache);
};

export const useDeleteTodo = (queryClient: QueryClient) => {
  const { mutate } = useDeleteMutation(
    {
      pathFn: (id) => ApiPaths.Todo.ById(id),
    },
    { onSuccess: () => onSuccess(queryClient) }
  );
  return { mutateDeleteTodo: mutate };
};
