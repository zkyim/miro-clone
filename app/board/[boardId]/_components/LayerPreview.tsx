import { LayerType } from '@/types/canvas';
import { useStorage } from '@liveblocks/react/suspense';
import React, { memo } from 'react'
import { Rectangle } from './Rectangle';
import { Ellips } from './Ellips';
import { Text } from './Text';
import { Note } from './Note';
import { Path } from './Path';
import { colorToCss } from '@/lib/utils';

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
}

export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColor
}: LayerPreviewProps) => {
    const layer = useStorage(root => root.layers.get(id));
    if (!layer) return null;

    switch (layer.type) {
        case LayerType.Path: 
          return(
            <Path
              key={id}
              points={layer.points}
              onPointerDown={(e) => onLayerPointerDown(e, id)}
              x={layer.x}
              y={layer.y}
              fill={layer.fill ? colorToCss(layer.fill) : "#000"}
              stroke={selectionColor}
            />
          )
        case LayerType.Text: 
          return (
            <Text
              id={id}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              selectionColor={selectionColor}
            />
          )
        case LayerType.Note: 
          return (
            <Note
              id={id}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              selectionColor={selectionColor}
            />
          )
        case LayerType.Ellipse: 
          return (
            <Ellips
              id={id}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              selectionColor={selectionColor}
            />
          )
        case LayerType.Rectangle: 
          return (
            <Rectangle
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />
          )

        default:
          return null;
    }
});

LayerPreview.displayName = 'LayerPreview';
