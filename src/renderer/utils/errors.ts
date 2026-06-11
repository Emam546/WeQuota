export class WeError extends Error {
  codeNum: string

  constructor(codeNum: string, message?: string) {
    super(message)
    this.codeNum = codeNum
  }
}
export const invalidLoginData = new WeError('603010110400001', 'invalid user data')
export const EmptyLoginData = new WeError('603010110400001', 'empty user data')
const errors = [invalidLoginData, EmptyLoginData]
export function throwError(codeNum: string) {
  for (let i = 0; i < errors.length; i++) {
    const element = errors[i]
    if (element.codeNum == codeNum) throw element
  }

  throw new WeError(codeNum, 'unknownError')
}
