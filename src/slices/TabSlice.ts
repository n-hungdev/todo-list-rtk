import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tab: (localStorage.getItem('tab') as string) || 'all',
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    updateTab: (state: any, action: PayloadAction<string>) => {
      state.tab = action.payload
    },
  },
})

export const { updateTab } = tabSlice.actions

export default tabSlice.reducer
