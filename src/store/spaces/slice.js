import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaces: [],
  spaceDetails: {},
};

const spacesSlice = createSlice({
  name: "spaces",
  initialState,
  reducers: {
    fillSpaces: (state, action) => {
      const newSpacesArray = action.payload;

      state.spaces = newSpacesArray;
    },
  },
});

export const { fillSpaces } = spacesSlice.actions;

export default spacesSlice.reducer;
