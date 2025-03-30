"use client"
import {useMutationData} from "@/hooks/useMutationData";
import {updateElements} from "@/actions/elements";


export const useAutoSave = (elements : {id : string, elementId : string, x : number, y : number}[],mapId : string, delay? : number) => {
    const {mutate,isPending} = useMutationData(["update-mapelements"], (data) => updateElements(data.mapId, data.elements));

    const saveToDB = () => {
        mutate({mapId, elements});
        console.log('Auto-save successful');
    }

    return {
        save: () => saveToDB(),
        isPending
    };
}