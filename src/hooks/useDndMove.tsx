import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

export const ItemTypes = {
    TEXTCARD: 'card',
}

interface DragItem {
    index: number
    id: string
    type: string
}

interface IUseDndMove {
    targetRef: React.RefObject<HTMLElement>,
    id: string,
    index: number,
    handleMoveCard: (dragIndex: number, hoverIndex: number) => void;
}

export default function useDndMove({ targetRef, id, index, handleMoveCard }: IUseDndMove) {
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.TEXTCARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!targetRef.current) return;
            const dragIndex = item.index // 原本是 item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) return;

            // Determine rectangle on screen
            const hoverBoundingRect = targetRef.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            handleMoveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TEXTCARD,
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drag(drop(targetRef));

    return { isDragging, handlerId };
}
