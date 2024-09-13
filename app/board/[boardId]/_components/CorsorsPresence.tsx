"use client";
import { shallow, useOthersConnectionIds, useOthersMapped } from '@liveblocks/react/suspense';
import React, { memo } from 'react'
import { Cursor } from './Cursor';
import { Path } from './Path';
import { colorToCss } from '@/lib/utils';

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}

const Drafts = () => {
  const others = useOthersMapped((other) => ({
    pencilDraft: other.presence.pencilDraft,
    penColor: other.presence.penColor,
  }), shallow)
  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path 
              key={key}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#000"}
              x={0}
              y={0}
            />
          )
        }
        return null;
      })}
    </>
  )
}

export const CorsorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
});

CorsorsPresence.displayName = 'CorsorsPresence';
