"use client"

import {useMutationData} from "@/hooks/useMutationData";


import {updateElements} from "@/actions/elements";
import {useCallback, useEffect, useRef} from "react";


export const useAutoSave = (elements : {id : string, elementId : string, x : number, y : number}[],mapId : string, delay? : number) => {
    const {mutate,isPending} = useMutationData(["update-mapelements"], (data) => updateElements(data.mapId, data.elements));

    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedAutoSave = useCallback(() => {

        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        autoSaveTimerRef.current = setTimeout(async () => {
            try {
                mutate({mapId, elements});
                console.log('Auto-save successful');
            } catch (error) {
                console.error('Auto-save failed:', error);
            }
        }, delay);
    }, [elements, delay]);

    useEffect(() => {
        debouncedAutoSave();

        // Cleanup function to clear timer
        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [elements, debouncedAutoSave]);

    return {
        save: () => debouncedAutoSave(),
        isPending
    };
}