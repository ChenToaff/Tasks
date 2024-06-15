import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects/redux/projectsSlice.ts";
import tasksReducer from "@features/tasks/redux/tasksSlice.ts";
import colleaguesReducer from "@features/colleagues/redux/colleaguesSlice.ts";
import authReducer from "@features/auth/redux/authSlice.ts";

const appReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  colleagues: colleaguesReducer,
  auth: authReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "auth/logout/pending") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
