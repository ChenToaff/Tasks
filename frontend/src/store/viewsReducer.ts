import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface ViewState {
  value: string;
}

const initialState: ViewState = {
  value: "Home",
};

export const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    selectView: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { selectView } = viewsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.views.value;

export default viewsSlice.reducer;
