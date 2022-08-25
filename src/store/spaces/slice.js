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
    fillSpaceDetails: (state, action) => {
      const incomingDetails = action.payload;

      state.spaceDetails = incomingDetails;
    },
  },
});

export const { fillSpaces, fillSpaceDetails } = spacesSlice.actions;

export default spacesSlice.reducer;
