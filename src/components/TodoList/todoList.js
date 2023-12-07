import { memo } from "react";
import { useGetRootTasksQuery } from "@/redux/TasksSlice/tasksSlice";
import { useGetTaskByIdQuery } from "@/redux/TasksSlice/tasksSlice";
import { TodoItem } from "@/components/TodoItem";

export const TodoList = memo(({ parent }) => {
  let response;

  if (parent === "root") {
    response = useGetRootTasksQuery();
  } else {
    response = useGetTaskByIdQuery(parent);
  }

  return (
    !response.isLoading && (
      <ul className="grid grid-flow-row gap-y-3 w-full max-w-xl justify-self-center">
        {response.data.map((todo) => (
          <li key={todo._id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    )
  );
});
