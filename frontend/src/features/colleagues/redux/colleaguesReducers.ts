import { PayloadAction } from "@reduxjs/toolkit";
import { ColleaguesState } from "./colleaguesSlice";
import IPerson from "@interfaces/IPerson";

export function addColleague(
  state: ColleaguesState,
  action: PayloadAction<IPerson>
) {
  state.data[action.payload.id] = action.payload;
}
export function updateColleague(
  state: ColleaguesState,
  action: PayloadAction<IPerson>
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
  action: PayloadAction<IPerson>
) {
  delete state.data[action.payload.id];
}
