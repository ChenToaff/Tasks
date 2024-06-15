import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import IUser from "@interfaces/IUser";

const useColleagueById = (id?: string): IUser | null => {
  return useSelector((state: RootState) =>
    id ? state.colleagues.data[id] : null
  );
};

export default useColleagueById;
