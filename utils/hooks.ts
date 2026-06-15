import { ComponentRef, useEffect, useRef, useState } from 'react'

export function useFitWindow<T extends HTMLElement>(
  additional: Array<React.RefObject<HTMLElement>>
) {
  const [ref, setRef] = useState<T | null>(null)

  useEffect(() => {
    if (!ref) return
    let prevWidth: number = 0
    const resizeObserver = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect
      if (height !== prevWidth) {
        prevWidth = height
        window.api.send(
          'setContentHeight',
          ref!.offsetHeight +
            additional.reduce((acc, elem) => {
              if (!elem.current) return acc
              return acc + elem.current.offsetHeight
            }, 0)
        )
      }
    })
    resizeObserver.observe(ref)
    return () => resizeObserver.disconnect()
  }, [ref, ...additional])
  return setRef
}
