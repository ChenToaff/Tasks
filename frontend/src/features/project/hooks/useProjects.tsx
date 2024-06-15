// useProjects.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadInitialProjects, loadMoreProjects } from "../redux/projectActions";
import { RootState, AppDispatch } from "../../../store";

export function useProjects() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, canLoadMore, initiallyLoaded } = useSelector(
    (state: RootState) => state.projects
  );

  // Initially load projects
  useEffect(() => {
    if (!initiallyLoaded && !loading && !error) {
      console.log({ initiallyLoaded, loading, error });
      dispatch(loadInitialProjects());
    }
  }, [dispatch, data.length, loading, error, initiallyLoaded]);

  // Function to trigger loading more projects
  const loadMore = () => {
    if (!loading) {
      dispatch(loadMoreProjects());
    }
  };

  return { projects: data, loading, error, loadMore, canLoadMore };
}
