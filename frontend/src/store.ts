import { configureStore, combineReducers } from "@reduxjs/toolkit";
import projectsReducer from "./features/project/redux/projectSlice.ts";
import tasksReducer from "@features/task/redux/taskSlice.ts";
import colleaguesReducer from "@features/colleague/redux/colleagueSlice.ts";
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
