import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

// Reducers
import authReducer from "./slices/auth.slice";
import apiSlice from "../services/api";

// Persist configuration
const persistConfig = {
	key: "auth",
	storage,
};

// Persisted auth reducer
const authPersistedReducer = persistReducer(persistConfig, authReducer);

// Configure store
export const store = configureStore({
	reducer: {
		auth: authPersistedReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(apiSlice.middleware),
});

// Setup listeners for the store
setupListeners(store.dispatch);

// Create persistor
export const persistor = persistStore(store);

// Export actions from auth slice
export * from "./slices/auth.slice";

// Infer types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
