import axios from 'axios'
import { ApiResponse } from '..'
interface G<T> {
  body: T
  token: string
}
export default async function makePostRequest<T, Data = unknown>(
  url: string,
  info: G<Data>
): Promise<ApiResponse<T>> {
  const data = await axios.post<ApiResponse<T>>(
    url,
    {
      ...info.body
    },
    {
      headers: {
        cookie: `indiv_login_token=${info.token}`
      }
    }
  )

  return data.data
}
