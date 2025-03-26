"use client"

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PropAnimation from "@/components/animation/prop-animation";
import { fetchElements } from "@/actions/elements";
import { useQueryData } from "@/hooks/useQueryData";
import { ElementsProps } from "@/types";
import Grid from "@/components/map-editor/Grid";



export type PlacedElement = {
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

    const { data, isFetching } = useQueryData(["elements"], () => fetchElements());
    const elements = data as ElementsProps;

    return (
        <div className="h-[650px] w-full text-white m-2 border border-[#1c1b1e] rounded-md flex flex-col">
            <div className="border-b border-[#1c1b1e] p-3 flex justify-between items-center">
                <span>Map Editor</span>
                <div className="flex gap-2">
                    <Button>
                        Create new map
                    </Button>
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
                       Move
                    </Button>
                    <Button
                        variant={mode === 'delete' ? 'default' : 'outline'}
                        onClick={() => setMode('delete')}
                    >
                         Delete
                    </Button>
                    <Button
                        variant={mode === 'copy' ? 'default' : 'outline'}
                        onClick={() => setMode('copy')}
                    >
                         Copy
                    </Button>
                </div>
            </div>
            <div
                className="flex flex-1 gap-6 p-3"

            >
                <Grid currentDragElement={currentDragElement} dragOffset={dragOffset} isDragging={isDragging} mode={mode} placedElements={placedElements} selectedPalette={selectedPalette} setCurrentDragElement={setCurrentDragElement} setDragOffset={setDragOffset} setIsDragging={setIsDragging} setPlacedElements={setPlacedElements} />
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