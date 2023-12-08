import React from "react";
import { memo } from "react";
import {
  useGetRootTasksQuery,
  useGetTaskByIdQuery,
} from "@/redux/TasksSlice/tasksSlice";
import { TodoItem } from "@/components/TodoItem";

const TodoList = memo(({ parent }) => {
  const rootTasksQuery = useGetRootTasksQuery();
  const taskByIdQuery = useGetTaskByIdQuery(parent);

  const response = parent === "root" ? rootTasksQuery : taskByIdQuery;

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

TodoList.displayName = "TodoList";

export { TodoList };
