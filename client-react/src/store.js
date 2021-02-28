import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./reducer", () => store.replaceReducer(rootReducer));
}

export default store;
