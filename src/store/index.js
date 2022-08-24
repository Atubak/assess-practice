import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import spacesReducer from "./spaces/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    spaces: spacesReducer,
  },
});
