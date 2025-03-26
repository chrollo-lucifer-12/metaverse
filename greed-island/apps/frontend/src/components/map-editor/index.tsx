"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Move, Copy } from 'lucide-react';
import PropAnimation from "@/components/animation/prop-animation";
import { fetchElements } from "@/actions/elements";
import { useQueryData } from "@/hooks/useQueryData";
import { ElementsProps } from "@/types";

const GRID_SIZE = 16;
const GRID_COLOR = "rgba(128, 128, 128, 0.2)";

type PlacedElement = {
    id: string;
    element: any;
    x: number;
    y: number;
};

const MapEditor = () => {
    const [selectedPalette, setSelectedPalette] = useState<any>(null);
    const [placedElements, setPlacedElements] = useState<PlacedElement[]>([]);
    const [mode, setMode] = useState<'place' | 'move' | 'delete' | 'copy'>('place');
    const [isDragging, setIsDragging] = useState(false);
    const [currentDragElement, setCurrentDragElement] = useState<PlacedElement | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const editorRef = useRef<HTMLDivElement>(null);

    const { data, isFetching } = useQueryData(["elements"], () => fetchElements());
    const elements = data as ElementsProps;

    // Snap to grid function
    const snapToGrid = (value: number) => {
        return Math.round(value / GRID_SIZE) * GRID_SIZE;
    };

    // Handle element placement
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
                    id: `element-${Date.now()}`,
                    element: selectedPalette,
                    x: gridX,
                    y: gridY
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

    // Handle element copying
    const handleElementCopy = (e: React.MouseEvent) => {
        if (mode !== 'copy' || !editorRef.current) return;

        const editorRect = editorRef.current.getBoundingClientRect();
        const gridX = snapToGrid(e.clientX - editorRect.left);
        const gridY = snapToGrid(e.clientY - editorRect.top);

        const elementToCopy = placedElements.find(placed =>
            placed.x === gridX && placed.y === gridY
        );

        if (elementToCopy) {
            // Find a nearby empty spot
            const newX = gridX + GRID_SIZE;
            const newY = gridY + GRID_SIZE;

            const isSpotAvailable = !placedElements.some(placed =>
                placed.x === newX && placed.y === newY
            );

            if (isSpotAvailable) {
                setPlacedElements(prev => [
                    ...prev,
                    {
                        id: `element-${Date.now()}`,
                        element: elementToCopy.element,
                        x: newX,
                        y: newY
                    }
                ]);
            }
        }
    };

    // Handle drag start
    const handleDragStart = (e: React.MouseEvent, element: PlacedElement) => {
        if (mode !== 'move') return;

        e.preventDefault(); // Prevent default to stop text selection

        const editorRect = editorRef.current?.getBoundingClientRect();
        if (!editorRect) return;

        const offsetX = e.clientX - (editorRect.left + element.x);
        const offsetY = e.clientY - (editorRect.top + element.y);

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

        // Calculate the new position with grid snapping, accounting for the drag offset
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
                    item.id === currentDragElement.id
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

    return (
        <div className="h-[650px] w-full text-white m-2 border border-[#1c1b1e] rounded-md flex flex-col">
            <div className="border-b border-[#1c1b1e] p-3 flex justify-between items-center">
                <span>Map Editor</span>
                <div className="flex gap-2">
                    <Button
                        variant={mode === 'place' ? 'default' : 'outline'}
                        onClick={() => setMode('place')}
                    >
                        Place
                    </Button>
                    <Button
                        variant={mode === 'move' ? 'default' : 'outline'}
                        onClick={() => setMode('move')}
                    >
                        <Move className="mr-2 h-4 w-4" /> Move
                    </Button>
                    <Button
                        variant={mode === 'delete' ? 'default' : 'outline'}
                        onClick={() => setMode('delete')}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                    <Button
                        variant={mode === 'copy' ? 'default' : 'outline'}
                        onClick={() => setMode('copy')}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                </div>
            </div>
            <div
                className="flex flex-1 gap-6 p-3"

            >
                <div
                    ref={editorRef}
                    className="relative flex-1 border border-[#1c1b1e] rounded-md overflow-hidden"
                    onClick={mode === 'place' ? handleElementPlacement :
                        mode === 'delete' ? handleElementDeletion :
                            mode === 'copy' ? handleElementCopy : undefined}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                >
                    {renderGridBackground()}
                    {placedElements.map((placed) => (
                        <div
                            key={placed.id}
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
                                imageUrl={placed.element.imageUrl}
                                jsonData={placed.element.jsonData}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-1/5 border border-[#1c1b1e] rounded-md p-2 flex flex-col">
                    <p className="font-bold text-center">Elements</p>
                    <Button onClick={() => setSelectedPalette(null)}>
                        Deselect Element
                    </Button>
                    <div className="flex flex-col gap-y-2 mt-4 items-center">
                        {!isFetching ?
                            elements.map((element) => (
                                <Button
                                    key={element.id}
                                    className={`h-fit w-fit ${selectedPalette?.id === element.id ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedPalette(element);
                                    }}
                                >
                                    <PropAnimation
                                        imageUrl={element.imageUrl}
                                        jsonData={element.jsonData}
                                    />
                                </Button>
                            )) : (<Skeleton className={"w-10 h-10"}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapEditor;