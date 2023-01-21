import { QueryClient } from "react-query";
import { usePostMutation } from "../../core/reactQuery";
import { ITodo } from "../../interfaces/controllers/todo";
import ApiPaths from "../../paths/apiPaths";
import todoCache from "./cacheName";

const onSuccess = (queryClient: QueryClient) => {
  queryClient.invalidateQueries(todoCache);
};

export const usePostTodo = (queryClient: QueryClient) => {
  const { mutate } = usePostMutation<ITodo, Omit<ITodo, "id">>(
    {
      path: ApiPaths.Todo.GetAll,
    },
    { onSuccess: () => onSuccess(queryClient) }
  );
  return { mutatePostTodo: mutate };
};
