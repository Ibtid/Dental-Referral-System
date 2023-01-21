import { usePutMutation } from "../../core/reactQuery";
import { ITodo } from "../../interfaces/controllers/todo";
import ApiPaths from "../../paths/apiPaths";

const onSuccess = () => console.log("I am done");

export const usePutTodo = () => {
  const { mutate } = usePutMutation<ITodo, ITodo>(
    {
      pathFn: (id) => ApiPaths.Todo.ById(id),
    },
    { onSuccess }
  );
  return { mutatePutTodo: mutate };
};
