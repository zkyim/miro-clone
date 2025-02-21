import React from 'react'
import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { TextLayer } from '@/types/canvas';
import { cn, colorToCss } from '@/lib/utils';
import { useMutation } from '@liveblocks/react';

const font = Kalam({
    subsets: ['latin'],
    weight: ["400"],
})

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const selectFactor = 0.5;
    const fontSizeBasedOnHeight = height * selectFactor;
    const fontSizeBasedOnWidth = width * selectFactor;
    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;
  const updateValue = useMutation((
      { storage },
       newValue: string,
    ) => {
      const liveLayers = storage.get("layers");
      liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value)
    }
  return (
    <foreignObject
        y={y}
        x={x}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            outline: selectionColor ? `1px solid ${selectionColor}` : 'none'
        }}
    >
        <ContentEditable 
            html={value || 'Text'}
            onChange={handleContentChange}
            className={cn("w-full h-full flex items-center justify-center drop-shadow-md outline-none", font.className)}
            style={{
                color: "#000",
                fontSize: calculateFontSize(width, height),
            }}
        />
    </foreignObject>
  )
}
