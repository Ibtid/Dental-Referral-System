import { useReactQuery } from "../../core/reactQuery";
import { ITodo } from "../../interfaces/controllers/todo";
import todoCache from "./cacheName";

export const useGetTodos = () => {
  const { data, refetch } = useReactQuery<ITodo[]>(todoCache);

  return { todos: data, refetchTodos: refetch };
};
