import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import riderReducer from "./Rider/riderSlice"
import postReducer from "./Post/postSlice"

const rootReducer = combineReducers({
  rider: riderReducer,
  post: postReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
