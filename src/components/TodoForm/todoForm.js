import { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAddTaskMutation } from "@/redux/TasksSlice/tasksSlice";
import classNames from "classnames";

export const TodoForm = memo(function TodoForm({ parent }) {
  const [addTask, result] = useAddTaskMutation();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      title: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const submit = useCallback(
    async ({ title }) => {
      if (parent === "root") {
        await addTask({ title });
      } else {
        await addTask({ parent, title });
      }

      reset();
    },
    [parent, addTask, reset]
  );

  return (
    <form
      className="flex flex-col w-full"
      autoComplete="off"
      onSubmit={handleSubmit(submit)}
    >
      <label className="flex flex-col text-sm text-gray-500">
        <span className="pb-2">What to do?</span>
        <div className="flex">
          <input
            className={classNames(
              "p-2 flex-grow font-medium text-lg text-gray-800 border-2 border-gray-600 hover:border-blue-400 focus:border-blue-400 outline-none rounded-md",
              { "border-red-400": formState.errors.desc }
            )}
            type="text"
            {...register("title", {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
          />
          <button
            disabled={result.isLoading}
            type="submit"
            className="p-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {result.isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
        {formState.errors.title && (
          <p className="text-red-500 text-sm">
            {formState.errors.title.type === "required" &&
              "Todo desc is a required field"}
            {formState.errors.title.type === "minLength" &&
              "Todo desc is too short, must be at least 5 characters long"}
            {formState.errors.title.type === "maxLength" &&
              "Todo desc is too long, must not be longer than 20 characters"}
          </p>
        )}
      </label>
    </form>
  );
});
