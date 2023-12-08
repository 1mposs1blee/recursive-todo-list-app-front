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

  return response.isLoading ? (
    <p>Loading...</p>
  ) : (
    <ul className="grid grid-flow-row gap-y-3 w-full max-w-xl justify-self-center">
      {parent === "root"
        ? response.data.map((todo, index) => (
            <li key={todo._id}>
              <TodoItem todo={todo} index={index} />
            </li>
          ))
        : response.data.subtasks.map((subtodo, index) => (
            <li key={subtodo._id}>
              <TodoItem todo={subtodo} index={index} />
            </li>
          ))}
    </ul>
  );
});
