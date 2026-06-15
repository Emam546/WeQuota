import React, { useEffect, useState } from 'react'
interface Props {
  defaultState: boolean
  env: Window['Environment']
  children: React.ReactNode
}
export default function TypeApplication({ defaultState, env, children }: Props) {
  const [disabled, setDisable] = useState(defaultState)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisable(window.Environment != env)
  }, [])
  return <>{!disabled && children}</>
}
