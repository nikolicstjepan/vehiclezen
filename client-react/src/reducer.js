import { combineReducers } from "@reduxjs/toolkit";

import vehiclesReducer from "./features/vehicles/vehiclesSlice";
import userReducer from "./features/user/userSlice";

const rootReducer = combineReducers({
  vehicles: vehiclesReducer,
  user: userReducer,
});

export default rootReducer;
