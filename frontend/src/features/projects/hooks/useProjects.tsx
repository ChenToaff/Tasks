// useProjects.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadInitialProjects,
  loadMoreProjects,
} from "../redux/projectsActions";
import { RootState, AppDispatch } from "../../../store";

export function useProjects() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, canLoadMore } = useSelector(
    (state: RootState) => state.projects
  );

  // Initially load projects
  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(loadInitialProjects());
    }
  }, [dispatch, data.length, loading, error]);

  // Function to trigger loading more projects
  const loadMore = () => {
    if (!loading) {
      dispatch(loadMoreProjects());
    }
  };

  return { projects: data, loading, error, loadMore, canLoadMore };
}
