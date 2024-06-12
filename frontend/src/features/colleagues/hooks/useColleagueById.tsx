import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import IPerson from "@interfaces/IPerson";

const useColleagueById = (id?: string): IPerson | undefined => {
  return useSelector((state: RootState) =>
    id ? state.colleagues.data[id] : undefined
  );
};

export default useColleagueById;