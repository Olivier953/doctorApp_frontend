import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "./alertSlice";
import { userSlice } from "./userSlice";

const rootReducers = combineReducers({
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
