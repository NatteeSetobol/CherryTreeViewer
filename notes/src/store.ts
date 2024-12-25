import {configureStore } from "@reduxjs/toolkit"
import { AnyAction, applyMiddleware, createStore} from "redux"
import reduxThunk, { ThunkDispatch } from "redux-thunk";
import treeidReducer from "./slices/treeid"
import { notesApi } from "./services/notes"
export const store = configureStore({
    reducer: {
        TreeId: treeidReducer,
        [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddiware) =>
        getDefaultMiddiware().concat(notesApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, void, AnyAction>

export default store;