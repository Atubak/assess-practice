export const selectAllSpaces = () => (reduxState) => reduxState.spaces.spaces;

export const selectSpaceDetails = () => (reduxState) =>
  reduxState.spaces.spaceDetails;
