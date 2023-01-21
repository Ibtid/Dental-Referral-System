import { FC } from "react";
import { useQueryClient } from "react-query";
import {
  useDeleteTodo,
  useGetTodos,
  usePostTodo,
  usePutTodo,
} from "../controllers/todo";
import { IDemoQuery } from "../interfaces/components/demoQuery.interface";
import { DemoQueryModal } from "../modals";

const DemoQuery: FC<IDemoQuery> = ({ value }) => {
  const queryClient = useQueryClient();
  const { todos, refetchTodos } = useGetTodos();
  const { mutatePostTodo } = usePostTodo(queryClient);
  const { mutatePutTodo } = usePutTodo();
  const { mutateDeleteTodo } = useDeleteTodo(queryClient);

  const handlePost = () => {
    mutatePostTodo({ userId: 3, title: "haha", completed: true });
  };

  const handledel = () => {
    mutateDeleteTodo({ id: 201 });
  };

  const handlePut = () => {
    mutatePutTodo({ id: 1, userId: 3, title: "haha", completed: true });
  };

  return (
    <div>
      DemoQuery - {value}
      <button onClick={() => refetchTodos({ cancelRefetch: true })}>
        refetch me
      </button>
      <DemoQueryModal todos={todos!} />
      <h2>{todos?.length}</h2>
      <button onClick={handlePost}>post req</button>
      <button onClick={handlePut}>put req</button>
      <button onClick={handledel}>delt req</button>
    </div>
  );
};

export default DemoQuery;
