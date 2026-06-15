import { configureStore } from '@reduxjs/toolkit'
import CredentialsState, { CredentialsStateType as CredentialsStateType } from './credentials'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
export type StoreData = {
  credentials: CredentialsStateType
}
const store = configureStore({
  reducer: {
    credentials: CredentialsState.reducer
  }
})
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
