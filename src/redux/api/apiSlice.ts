import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
export const api = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1"
    }),
    tagTypes: ['user', 'team'],
    endpoints: () => ({})
})


