import { useSelector } from "react-redux";

import { RootState } from "../../../store";

import { selectTasksByAssignee } from "@features/tasks/redux/tasksSelectors";

// Custom hook to use a selected project and ensure its full data is loaded
const useTasks = (assignee: string) => {
  const tasks = useSelector((state: RootState) =>
    selectTasksByAssignee(state, assignee)
  );
  return {
    tasks,
  };
};

export default useTasks;
