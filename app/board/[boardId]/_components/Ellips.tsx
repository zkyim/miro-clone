import { colorToCss } from '@/lib/utils';
import { EllipseLayer } from '@/types/canvas'
import React from 'react'

interface EllipsProps {
    id: string;
    layer: EllipseLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

export const Ellips = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: EllipsProps) => {
  return (
    <ellipse 
        className='drop-shadow-md'
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            transform: `translate(${layer.x}px, ${layer.y}px)`
        }}
        cx={layer.width / 2}
        cy={layer.height / 2}
        rx={layer.width / 2}
        ry={layer.height / 2}
        fill={layer.fill ? colorToCss(layer.fill) : "#fff9b1"}
        stroke={selectionColor || "transparent"}
        strokeWidth={1}
    />
  )
}
