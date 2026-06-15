import React, { ComponentProps, ComponentRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import style from './style.module.scss'
const Frame = React.forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    const [title, setTitle] = useState('')
    const [maximizeState, setMaximizeState] = useState(true)

    useEffect(() => {
      const titleElem = document.querySelector('title')
      if (!titleElem) return

      setTitle(document.title)
      const observer = new MutationObserver(() => {
        setTitle(document.title)
      })

      observer.observe(titleElem, {
        subtree: true,
        characterData: true,
        childList: true
      })

      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      return window.api.on('onToggleWindowState', (_event: unknown, state: boolean) => {
        setMaximizeState(state)
      })
    }, [])

    return (
      <div
        className={classNames(
          ' bg-white px-4 min-h-screen  flex items-center justify-between border-b border-slate-200',
          style['frame-drag']
        )}
      >
        <span className="text-[12px] font-semibold text-slate-500 m-0">
          {title || 'Quota Manager v1.2.0'} · {maximizeState ? 'Maximized' : 'Restored'}
        </span>
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => window.api.send('minimizeWindow')}
            className="w-3 h-3 rounded-full bg-amber-400"
          ></button>
          <button
            onClick={() => window.api.send('ToggleWindowMaximizeState')}
            className="w-3 h-3 bg-green-400 rounded-full"
          ></button>
          <button
            onClick={() => window.api.send('hideWindow')}
            className="w-3 h-3 bg-red-400 rounded-full"
          ></button>
        </div>
      </div>
    )
  }
)

Frame.displayName = 'Frame'

export default Frame
