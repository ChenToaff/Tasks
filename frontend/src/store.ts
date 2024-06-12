import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/redux/projectsSlice.ts";
import tasksReducer from "@features/tasks/redux/tasksSlice.ts";
import colleaguesReducer from "@features/colleagues/redux/colleaguesSlice.ts";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    // users: usersReducer,
    tasks: tasksReducer,
    colleagues: colleaguesReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
