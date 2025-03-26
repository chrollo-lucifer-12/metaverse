"use client";
import { useQueryData } from "@/hooks/useQueryData";
import { fetchElements } from "@/actions/elements";
import { ElementsProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import PropAnimation from "@/components/animation/prop-animation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const GRID_SIZE = 16;
const GRID_COLOR = "rgba(128, 128, 128, 0.2)";

const MapEditor = () => {
    const [selectedElement, setSelectedElement] = useState<any>(null);
    const [placedElements, setPlacedElements] = useState<any[]>([]);
    const [draggingElement, setDraggingElement] = useState<any>(null);
    const [isDragging, setIsDragging] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const {data, isFetching} = useQueryData(["elements"], () => fetchElements());
    const elements = data as ElementsProps;

    useEffect(() => {
        if (!isFetching && elements) {
            const woodenTile = elements.find(el => el.name === "wooden-tile");
            if (woodenTile) {
                const tilesX = Math.ceil(1020 / GRID_SIZE);
                const tilesY = Math.ceil(500 / GRID_SIZE);
                const newPlacedElements = [];

                for (let x = 0; x < tilesX; x++) {
                    for (let y = 0; y < tilesY; y++) {
                        newPlacedElements.push({
                            element: woodenTile,
                            x: x * GRID_SIZE,
                            y: y * GRID_SIZE,
                        });
                    }
                }

                setPlacedElements(newPlacedElements);
            }
        }
    },[isFetching])

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (!selectedElement || !editorRef.current) return;
            const editorRect = editorRef.current.getBoundingClientRect();

            const gridX = Math.floor((e.clientX - editorRect.left) / GRID_SIZE) * GRID_SIZE;
            const gridY = Math.floor((e.clientY - editorRect.top) / GRID_SIZE) * GRID_SIZE;

            setPlacedElements((prev) => [
                ...prev,
                {
                    element: selectedElement,
                    x: gridX,
                    y: gridY,
                },
            ]);
        };

        const editor = editorRef.current;
        if (editor) {
            editor.addEventListener("mousedown", handleMouseDown);
        }

        return () => {
            if (editor) {
                editor.removeEventListener("mousedown", handleMouseDown);
            }
        };
    }, [selectedElement]);

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
            <div className="border-b border-[#1c1b1e] p-3">Map Editor</div>
            <div className="flex flex-1 gap-6 p-3">
                <div
                    ref={editorRef}
                    className="relative flex-1 border border-[#1c1b1e] rounded-md overflow-hidden"
                >
                    {renderGridBackground()}
                    {placedElements.map((placed, index) => (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                left: `${placed.x}px`,
                                top: `${placed.y}px`,
                                zIndex: 10
                            }}
                            onMouseDown={(e) => {
                                if (selectedElement || !editorRef.current) return;
                                setIsDragging(true);
                                setDraggingElement(placed);
                                if (draggingElement.element.id === placed.element.id) {
                                    const editorRect = editorRef.current.getBoundingClientRect();
                                    const gridX = Math.floor((e.clientX - editorRect.left) / GRID_SIZE) * GRID_SIZE;
                                    const gridY = Math.floor((e.clientY - editorRect.top) / GRID_SIZE) * GRID_SIZE;
                                    setPlacedElements(prevState => prevState.map(item => item.element.id === draggingElement.element.id ? {item, x : gridX, y : gridY} : item))
                                }
                            }}
                            onMouseMove={(e) => {
                                if (isDragging && editorRef.current) {
                                    const editorRect = editorRef.current.getBoundingClientRect();
                                    const gridX = Math.floor((e.clientX - editorRect.left) / GRID_SIZE) * GRID_SIZE;
                                    const gridY = Math.floor((e.clientY - editorRect.top) / GRID_SIZE) * GRID_SIZE;
                                    setPlacedElements(prevState => prevState.map(item => item.element.id === draggingElement.element.id ? {item, x : gridX, y : gridY} : item))
                                }
                            }}
                            onMouseUp={(e) => {
                                if (isDragging && editorRef.current) {
                                    const editorRect = editorRef.current.getBoundingClientRect();
                                    const gridX = Math.floor((e.clientX - editorRect.left) / GRID_SIZE) * GRID_SIZE;
                                    const gridY = Math.floor((e.clientY - editorRect.top) / GRID_SIZE) * GRID_SIZE;
                                    setPlacedElements(prevState => prevState.map(item => item.element.id === draggingElement.element.id ? {item, x : gridX, y : gridY} : item))
                                    setIsDragging(false);
                                    setDraggingElement(null);
                                }
                            }}
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
                    <Button onClick={() => {
                        setSelectedElement(null);
                    }}>click me </Button>
                    <div className="flex flex-col gap-y-2 mt-4 items-center overflow-y-auto max-h-[500px]">
                        {!isFetching ?
                            elements.map((element) => (
                                <Button
                                    key={element.id}
                                    className="h-fit w-fit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedElement(element);
                                    }}
                                >
                                    <PropAnimation imageUrl={element.imageUrl} jsonData={element.jsonData}/>
                                </Button>
                            )) : (<Skeleton className={"w-10 h-10"}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapEditor;