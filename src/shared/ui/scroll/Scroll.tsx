'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import {CSSProperties, ReactNode} from 'react'

interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export const Scroll = ({ children, className, style }: Props) => {
  return (
    <ScrollArea.Root className={`scroll-root ${className ?? ''}`} style={style}>
      <ScrollArea.Viewport className="scroll-viewport">
        {children}
      </ScrollArea.Viewport>

      {/* Вертикальный скролл */}
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="scroll-scrollbar"
        style={{
          width: '12px',
          padding: '0 4px'
        }}
      >
        <ScrollArea.Thumb
          className="scroll-thumb"
          style={{
            width: '4px',
            margin: '0 auto'
          }}
        />
      </ScrollArea.Scrollbar>

      {/* Горизонтальный скролл */}
      <ScrollArea.Scrollbar
        orientation="horizontal"
        className="scroll-scrollbar"
        style={{
          height: '12px',
          padding: '4px 0'
        }}
      >
        <ScrollArea.Thumb
          className="scroll-thumb"
          style={{
            height: '4px',
            margin: 'auto 0'
          }}
        />
      </ScrollArea.Scrollbar>

      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}