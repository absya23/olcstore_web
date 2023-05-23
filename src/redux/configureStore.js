import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import logger from "redux-logger";
import catalogueSlice from "./catalogueSlice";
import typeProductSlice from "./typeProductSlice";

const reducer = combineReducers({
  product: productSlice,
  catalogue: catalogueSlice,
  typeProduct: typeProductSlice,
  // global: globalSlice,
});

const store = configureStore({
  reducer,
  // middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
  middleware: (gDM) => gDM().concat(logger),
});

// store.subscribe(() => {
//   console.log(`current state: ${store.getState().product.data}`);
// });

export default store;
