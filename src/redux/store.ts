import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import userListSliceReducer from "./features/Team/teamSlice";

const store = configureStore({
  reducer: {
    userList: userListSliceReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
