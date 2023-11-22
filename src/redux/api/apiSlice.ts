import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://state-managment-server.vercel.app/api/v1"
  }),
  tagTypes: ["user", "team"],
  endpoints: () => ({})
});
