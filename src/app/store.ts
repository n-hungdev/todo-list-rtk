import { configureStore } from '@reduxjs/toolkit'
import tabReducer from '../slices/TabSlice'
import tasksReducer from '../slices/TaskSlice'

export const store = configureStore({
  reducer: {
    tasksWatch: tasksReducer,
    tabWatch: tabReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
