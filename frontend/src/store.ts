import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/redux/projectsReducer.ts";
import tasksReducer from "@features/tasks/redux/tasksReducer.ts";

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    // people: peopleReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
