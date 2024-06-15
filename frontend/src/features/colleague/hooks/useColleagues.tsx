// useProjects.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadInitialColleagues } from "../redux/colleagueActions";
import { RootState, AppDispatch } from "../../../store";

export function useColleagues() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.colleagues
  );

  // Initially load projects
  useEffect(() => {
    if (Object.keys(data).length === 0 && !loading && !error) {
      dispatch(loadInitialColleagues());
    }
  }, []);

  return { colleagues: data, loading, error };
}
