import { Layer, XYWH } from '@/types/canvas'
import { shallow, useSelf, useStorage } from '@liveblocks/react/suspense';
import React from 'react'

const boundingBox = (layers: Layer[]): XYWH | null => {
    const first = layers[0];

    if (!first) return null;

    let left: number = first.x;
    let right: number = first.x + first.width;
    let top: number = first.y;
    let bottom: number = first.y + first.height;

    for (let i=1; i < layers.length; i++) {
        const { x, y, width, height } = layers[i];
        if (left > x) left = x;
        if (right < x + width) right = x + width;
        if (top > y) top = y;
        if (bottom < y + height) bottom = y + height;
    }
    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    }
}

const useSelectionBounds = () => {
    const selection = useSelf((me) => me.presence.selection);
    return useStorage((root) => {
        const selectedLayers = selection
        .map(layerId => root.layers.get(layerId)!)
        .filter(Boolean);

        return boundingBox(selectedLayers);
    }, shallow)
}

export default useSelectionBounds
