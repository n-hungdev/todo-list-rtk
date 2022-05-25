import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITask, ITasks } from '../interfaces/Task'
import { nanoid } from 'nanoid'

interface rootState {
  tasks: ITasks
}
const initialState: rootState = {
  tasks:
    (JSON.parse(localStorage.getItem('tasks')!) as ITasks) || ([] as ITasks),
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state: rootState, action: PayloadAction<string>) => {
      const task: ITask = {
        id: nanoid(),
        description: action.payload,
        complete: false,
      }
      state.tasks.push(task)
    },
    updateTask: (state: rootState, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...action.payload, complete: false }
          : task
      )
    },
    deleteTask: (state: rootState, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter(
        (task: ITask) => task.id !== action.payload.id
      )
    },
    deleteAllTasks: (state: rootState) => {
      state.tasks = []
    },
    toggleComplete: (state: rootState, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.map((task: ITask) =>
        task.id === action.payload.id
          ? { ...task, complete: !task.complete }
          : task
      )
    },
  },
})

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  toggleComplete,
} = taskSlice.actions

export default taskSlice.reducer
