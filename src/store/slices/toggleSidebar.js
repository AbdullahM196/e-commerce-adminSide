import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: true,
};
const toggleSlice = createSlice({
  name: "toggleSidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.toggle = !state.toggle;
    },
  },
});
export const { toggleSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;
