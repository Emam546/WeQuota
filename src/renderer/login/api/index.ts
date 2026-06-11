import { throwError } from '@renderer/utils/errors'

export async function login(data: Parameters<ApiMain.HandleMethods['login']>[0]) {
  const result = await window.api.invoke('login', data)
  if (result.header.retCode != '0') throwError(result.header.errorNo!)
  return result
}
