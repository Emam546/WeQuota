import React, { ComponentProps, ComponentRef, useEffect, useState } from 'react'
import classNames from 'classnames'

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
        ref={ref}
        className={classNames(
          'w-105 shadow-2xl rounded-lg overflow-hidden border border-slate-200 bg-white',
          className
        )}
        {...props}
      >
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <span className="text-[12px] font-semibold text-slate-500">
            {title || 'Quota Manager v1.2.0'} · {maximizeState ? 'Maximized' : 'Restored'}
          </span>
          <div className="flex items-center gap-2">
            <button className="w-3 h-3 rounded-full bg-amber-400"></button>
            <button className="w-3 h-3 rounded-full bg-red-400"></button>
          </div>
        </div>
      </div>
    )
  }
)

Frame.displayName = 'Frame'

export default Frame
