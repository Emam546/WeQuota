import { createSlice } from '@reduxjs/toolkit'
export interface LoginData {
  utoken: string
  token: string
  acctId: `${number}`
  custId: `${number}`
  subscriberId: `${number}`
}
export interface SavedData extends LoginData {
  userName: string
  password: string
}
export interface Credentials extends SavedData {
  saved: boolean
}
export type CredentialsStateType = Credentials | null
const states: CredentialsStateType = null as CredentialsStateType
const CredentialState = createSlice({
  name: 'credentials',
  initialState: states,
  reducers: {
    setData(state, action: { payload: Credentials | null }) {
      return action.payload
    }
  }
})
export const CredentialActions = CredentialState.actions
export default CredentialState
