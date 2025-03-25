"use client";
import { useQueryData } from "@/hooks/useQueryData";
import { fetchElements } from "@/actions/elements";
import { ElementsProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import ElementsCard from "@/components/elements-management/ElementsCard";
import PropAnimation from "@/components/animation/prop-animation";
import { Button } from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

const MapEditor = () => {
    const [selectedElement, setSelectedElement] = useState<any>(null);
    const [placedElements, setPlacedElements] = useState<any[]>([]);
    const editorRef = useRef<HTMLDivElement>(null);

    const { data, isFetching } = useQueryData(["elements"], () => fetchElements());
    const elements = data as ElementsProps;

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (!selectedElement || !editorRef.current) return;

            const editorRect = editorRef.current.getBoundingClientRect();

            setPlacedElements((prev) => [
                ...prev,
                {
                    element: selectedElement,
                    x: e.clientX - editorRect.left,
                    y: e.clientY - editorRect.top,
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

    return (
        <div className="h-[650px] w-full text-white m-2 border border-[#1c1b1e] rounded-md flex flex-col">
            <div className="border-b border-[#1c1b1e] p-3">Map Editor</div>
            <div className="flex flex-1 gap-6 p-3">
                <div ref={editorRef} className="relative flex-1 border border-[#1c1b1e] rounded-md">
                    {placedElements.map((placed, index) => (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                left: `${placed.x}px`,
                                top: `${placed.y}px`,
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
                    <div className="flex flex-col gap-y-2 mt-4 items-center">
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
                                    <PropAnimation imageUrl={element.imageUrl} jsonData={element.jsonData} />
                                </Button>
                            )) : (<Skeleton className={"w-10 h-10"} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapEditor;
