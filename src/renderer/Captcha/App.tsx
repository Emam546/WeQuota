import Captcha from '@renderer/components/captcha'

export default function App() {
  async function send(data: { token: string; code: string }) {
    return await window.api.invoke('code', data.code, data.token)
  }
  return (
    <Captcha
      values={{ code: '', token: window.context.token }}
      className="h-screen"
      captcha={window.context.captcha}
      refresh={async function () {
        const data = await window.api.invoke('refreshCaptcha', window.context.number)
        if (data.status == 'Success') {
          if (data.requireInteraction) return data
          else await send({ ...data, code: '' })
        }
        return { captcha: '', token: '' }
      }}
      send={send}
      cancel={function (): void {
        window.api.invoke('cancel')
      }}
    />
  )
}
