import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://recursive-todo-list-app-back.onrender.com/api/tasks",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getRootTasks: builder.query({
      query: () => "/roots",
      providesTags: ["Task"],
    }),
    getTaskById: builder.query({
      query: (value) => `/${value}`,
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: (values) => ({
        url: "/",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Task "],
    }),
  }),
});

export const { useGetRootTasksQuery, useAddTaskMutation, useGetTaskByIdQuery } =
  tasksApi;
