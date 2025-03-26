"use client"

import PropAnimation from "@/components/animation/prop-animation";
import React, {useRef, useState} from "react";
import {PlacedElement} from "@/components/map-editor/index";
import {useQueryData} from "@/hooks/useQueryData";
import {fetchMapElements} from "@/actions/elements";
import {MapElementsProps} from "@/types";
import {useAutoSave} from "@/hooks/useAutoSave";

const GRID_SIZE = 16;
const GRID_COLOR = "rgba(128, 128, 128, 0.2)";

interface GridProps {
    selectedPalette : any,
    mode : 'place' | 'move' | 'delete' | 'copy',
    setIsDragging : any,
    setCurrentDragElement : any,
    setDragOffset : any,
    isDragging : any,
    currentDragElement : any,
    dragOffset : {x : number, y : number}
    mapId : string
}

const Grid = ({mode, selectedPalette,  setCurrentDragElement, setDragOffset, setIsDragging, isDragging, currentDragElement, dragOffset, mapId} : GridProps) => {


    const {data, isFetching} = useQueryData(["map-elements"], () => fetchMapElements(mapId));

    const initialElements = data as MapElementsProps[]

    const [placedElements, setPlacedElements] = useState<MapElementsProps[]>(initialElements);

    const {isPending,save} = useAutoSave(placedElements.map((e) => ({id : e.Elements.id, x : e.x!, y : e.y!})),mapId,10000);

    const editorRef = useRef<HTMLDivElement>(null);

    const snapToGrid = (value: number) => {
        return Math.round(value / GRID_SIZE) * GRID_SIZE;
    };


    const handleElementPlacement = (e: React.MouseEvent) => {
        if (!selectedPalette || mode !== 'place' || !editorRef.current) return;

        const editorRect = editorRef.current.getBoundingClientRect();
        const gridX = snapToGrid(e.clientX - editorRect.left);
        const gridY = snapToGrid(e.clientY - editorRect.top);

        // Check if the spot is already occupied
        const isOccupied = placedElements.some(placed =>
            placed.x === gridX && placed.y === gridY
        );

        if (!isOccupied) {
            setPlacedElements(prev => [
                ...prev,
                {
                    Elements : {
                        height : selectedPalette.height,
                        id : selectedPalette.id,
                        imageUrl : selectedPalette.imageUrl,
                        jsonData : selectedPalette.jsonData,
                        name : selectedPalette.name,
                        static : selectedPalette.static,
                        width : selectedPalette.width
                    },
                    x : gridX,
                    y : gridY
                }
            ]);
        }
    };

    // Handle element deletion
    const handleElementDeletion = (e: React.MouseEvent) => {
        if (mode !== 'delete' || !editorRef.current) return;

        const editorRect = editorRef.current.getBoundingClientRect();
        const gridX = snapToGrid(e.clientX - editorRect.left);
        const gridY = snapToGrid(e.clientY - editorRect.top);

        setPlacedElements(prev =>
            prev.filter(placed =>
                !(placed.x === gridX && placed.y === gridY)
            )
        );
    };

    // Handle drag start
    const handleDragStart = (e: React.MouseEvent, element: MapElementsProps) => {
        if (mode !== 'move') return;

        e.preventDefault(); // Prevent default to stop text selection

        const editorRect = editorRef.current?.getBoundingClientRect();
        if (!editorRect) return;

        const offsetX = e.clientX - (editorRect.left + element.x!);
        const offsetY = e.clientY - (editorRect.top + element.y!);

        console.log('Drag start', { element, offsetX, offsetY });

        setIsDragging(true);
        setCurrentDragElement(element);
        setDragOffset({ x: offsetX, y: offsetY });
    };

    // Handle drag move
    const handleDragMove = (e: React.MouseEvent) => {
        if (!isDragging || !currentDragElement || mode !== 'move' || !editorRef.current) return;

        e.preventDefault(); // Prevent default to stop text selection

        const editorRect = editorRef.current.getBoundingClientRect();

        const newX = snapToGrid(e.clientX - editorRect.left - dragOffset.x);
        const newY = snapToGrid(e.clientY - editorRect.top - dragOffset.y);

        // Check if the new spot is occupied by another element
        const isOccupied = placedElements.some(placed =>
            placed !== currentDragElement &&
            placed.x === newX && placed.y === newY
        );

        if (!isOccupied) {
            setPlacedElements(prev =>
                prev.map(item =>
                    item.Elements.id === currentDragElement.Elements.id
                        ? { ...item, x: newX, y: newY }
                        : item
                )
            );
        }
    };


    // Handle drag end
    const handleDragEnd = (e: React.MouseEvent) => {
        console.log('Drag end');
        setIsDragging(false);
        setCurrentDragElement(null);
    };

    // Grid background rendering
    const renderGridBackground = () => {
        const gridLines = [];
        const width = 1020;
        const height = 500;

        for (let x = 0; x <= width; x += GRID_SIZE) {
            gridLines.push(
                <line
                    key={`v-${x}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={height}
                    stroke={GRID_COLOR}
                    strokeWidth="1"
                />
            );
        }

        for (let y = 0; y <= height; y += GRID_SIZE) {
            gridLines.push(
                <line
                    key={`h-${y}`}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={GRID_COLOR}
                    strokeWidth="1"
                />
            );
        }

        return (
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
                width={width}
                height={height}
            >
                {gridLines}
            </svg>
        );
    };

    return <div
        ref={editorRef}
        className="relative flex-1 border border-[#1c1b1e] rounded-md overflow-hidden"
        onClick={mode === 'place' ? handleElementPlacement : mode === 'delete' ? handleElementDeletion : undefined}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
    >
        {renderGridBackground()}
        {placedElements.map((placed) => (
            <div
                key={placed.Elements.id}
                style={{
                    position: 'absolute',
                    left: `${placed.x}px`,
                    top: `${placed.y}px`,
                    border: mode === 'move' ? '2px solid blue' : 'none',
                    cursor: mode === 'move' ? 'move' : 'default'
                }}
                onMouseDown={(e) => handleDragStart(e, placed)}
            >
                <PropAnimation
                    imageUrl={placed.Elements.imageUrl}
                    jsonData={placed.Elements.jsonData}
                />
            </div>
        ))}
    </div>
}
export default Grid