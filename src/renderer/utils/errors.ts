export class WeError extends Error {
  codeNum: string[]

  constructor(codeNum: string[], message?: string) {
    super(message)
    this.codeNum = codeNum
  }
}
export const invalidLoginData = new WeError(
  ['603010110400001', '60301023110815001'],
  'invalid user data'
)
export const IncorrectCaptcha = new WeError(['60301025072100001'], 'incorrect captcha')
const errors = [invalidLoginData, IncorrectCaptcha]
export function throwError(codeNum: string, message?: string) {
  for (let i = 0; i < errors.length; i++) {
    const element = errors[i]
    if (element.codeNum.includes(codeNum)) return element
  }

  return new WeError([codeNum], message || 'unknownError')
}
