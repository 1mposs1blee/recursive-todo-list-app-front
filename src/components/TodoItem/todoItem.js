import { memo, useCallback, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/TasksSlice/tasksSlice";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { RemoveButton } from "@/components/RemoveButton";

export const TodoItem = memo(function Todo({ todo, index }) {
  const [readOnly, setReadOnly] = useState(true);
  // const [draggable, setDraggable] = useState(false);
  const [isSubTodosShown, setIsSubTodosShown] = useState(false);

  const [deleteTask, deleteTaskResult] = useDeleteTaskMutation();
  const [updateTask, updateTaskResult] = useUpdateTaskMutation();

  const { register, getValues } = useForm({
    defaultValues: {
      desc: todo.title,
    },
  });

  const startEditing = useCallback(() => {
    setReadOnly(false);
  }, []);

  const toggleReadOnlyOnPressEnter = useCallback((event) => {
    if (event.key === "Enter") {
      setReadOnly((previous) => !previous);
    }
  }, []);

  const saveChanges = useCallback(async () => {
    if (todo.title.trim() === getValues("desc").trim()) {
      return;
    }

    await updateTask({ ...todo, title: getValues("desc") });
  }, [getValues, todo, updateTask]);

  const deleteTodo = useCallback(async () => {
    await deleteTask(todo._id);
  }, [todo._id, deleteTask]);

  // const startDragging = useCallback(() => {
  //   dispatch({ type: TodoStoreActions.SET_DRAGGABLE_TODO, payload: todo });
  // }, [dispatch, todo]);

  // const endDragging = useCallback(() => {
  //   dispatch({ type: TodoStoreActions.SET_DRAGGABLE_TODO, payload: null });
  // }, [dispatch]);

  // const dragEnter = useCallback((event) => {
  //   event.preventDefault();
  // }, []);

  // const dragOver = useCallback((event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // }, []);

  // const dragLeave = useCallback((event) => {
  //   event.preventDefault();
  // }, []);

  // const drop = useCallback(
  //   async (event) => {
  //     event.preventDefault();

  //     if (
  //       draggableTodo &&
  //       todo.order !== draggableTodo.order &&
  //       todo.parent === draggableTodo.parent
  //     ) {
  //       const currentTodo = { ...draggableTodo, order: todo.order };
  //       const targetTodo = { ...todo, order: draggableTodo.order };
  //       await put(currentTodo);
  //       await put(targetTodo);
  //       dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: currentTodo });
  //       dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: targetTodo });
  //     }
  //   },

  //   [dispatch, draggableTodo, put, todo]
  // );

  const toggleSubTodos = useCallback(() => {
    setIsSubTodosShown((previous) => !previous);
  }, []);

  return (
    <div
      className={classNames(
        "grid grid-flow-row items-center gap-y-3 rounded-md p-2"
      )}
      // draggable={draggable}
      // onDragStartCapture={startDragging}
      // onDragEndCapture={endDragging}
      // onDragEnterCapture={dragEnter}
      // onDragOverCapture={dragOver}
      // onDragLeaveCapture={dragLeave}
      // onDropCapture={drop}
    >
      <div className="grid grid-flow-col gap-x-2 items-center">
        <div className="justify-self-center w-10">
          <span className="truncate">{todo.subtasks.length || ""}</span>
          <button
            className={classNames("ml-2 transform transition-transform", {
              "rotate-0": !isSubTodosShown,
              "rotate-90": isSubTodosShown,
            })}
            onClick={toggleSubTodos}
          >
            <span>&gt;</span>
          </button>
        </div>

        <input
          className={classNames(
            "p-2 w-full outline-none border border-transparent rounded-md transition-colors bg-gray-100",
            {
              "hover:border-gray-500 focus:border-gray-500": readOnly,
              "border-blue-500": !readOnly,
            }
          )}
          type="text"
          {...register("desc", {
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
          onClick={startEditing}
          onKeyUp={toggleReadOnlyOnPressEnter}
          onBlur={saveChanges}
          readOnly={readOnly}
        />

        <RemoveButton
          click={deleteTodo}
          disabled={deleteTaskResult.isLoading || updateTaskResult.isLoading}
        />

        <Image
          className="cursor-grab"
          // draggable={false}
          // onMouseEnter={() => setDraggable(true)}
          // onMouseLeave={() => setDraggable(false)}
          style={{ width: "15px", height: "15px" }}
          width="15"
          height="15"
          src="/drag.svg"
          alt="drag indicator"
        />
        {(deleteTaskResult.isLoading || updateTaskResult.isLoading) && (
          <p>Loading...</p>
        )}
      </div>

      {isSubTodosShown && (
        <div className="grid grid-flow-row pl-10 gap-y-3">
          <TodoForm parent={todo._id} />
          <TodoList parent={todo._id} />
        </div>
      )}
    </div>
  );
});
