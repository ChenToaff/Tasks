import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { selectProjectById } from "@features/project/redux/projectSelectors";
import { loadProjectDetails } from "../redux/projectActions";

// Custom hook to use a selected project and ensure its full data is loaded
const useSelectedProject = (projectId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  useEffect(() => {
    if (!project || (project && !project.loaded)) {
      dispatch(loadProjectDetails(projectId));
    }
  }, [dispatch, projectId, project]);

  const isLoading = !(project && project.loaded);

  return {
    project,
    isLoading,
  };
};

export default useSelectedProject;
