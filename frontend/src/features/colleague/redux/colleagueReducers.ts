import { PayloadAction } from "@reduxjs/toolkit";
import { ColleaguesState } from "./colleagueSlice";
import IUser from "@interfaces/IUser";

export function addColleague(
  state: ColleaguesState,
  action: PayloadAction<IUser>
) {
  state.data[action.payload.id] = action.payload;
}
export function updateColleague(
  state: ColleaguesState,
  action: PayloadAction<IUser>
) {
  if (state.data[action.payload.id]) {
    state.data[action.payload.id] = {
      ...state.data[action.payload.id],
      ...action.payload,
    };
  }
}
export function removeColleagues(
  state: ColleaguesState,
  action: PayloadAction<IUser>
) {
  delete state.data[action.payload.id];
}
