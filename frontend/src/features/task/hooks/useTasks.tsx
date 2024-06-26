import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState, AppDispatch } from "../../../store";

import { selectTasksByAssignee } from "@features/task/redux/taskSelectors";
import { loadInitialTasks } from "../redux/taskActions";
// Custom hook to use a selected project and ensure its full data is loaded
const useTasks = (assignee: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) =>
    selectTasksByAssignee(state, assignee)
  );

  // Initially load tasks
  useEffect(() => {
    dispatch(loadInitialTasks());
  }, []);
  return {
    tasks,
  };
};

export default useTasks;
