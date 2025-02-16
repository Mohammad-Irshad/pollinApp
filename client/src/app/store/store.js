import { configureStore } from "@reduxjs/toolkit";
import pollsSlice from "../features/pollsSlice";

const store = configureStore({
  reducer: {
    polls: pollsSlice,
  },
});

export default store;
