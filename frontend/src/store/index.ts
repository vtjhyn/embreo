import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import vendorReducer from './slice/vendorSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendor: vendorReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch