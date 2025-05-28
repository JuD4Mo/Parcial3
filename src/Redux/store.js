import { configureStore } from '@reduxjs/toolkit';
import grafoReducer from "./slices/graphSlice.js"
import arbolesReducer from "./slices/treeSlice.js"

export const store = configureStore({
  reducer: {
    grafo: grafoReducer,
    arboles: arbolesReducer
  },
   middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});
