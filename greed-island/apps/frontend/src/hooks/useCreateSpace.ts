"use client"

import {useMutationData} from "@/hooks/useMutationData";
import useZodForm from "@/hooks/useZodForm";
import {spaceSchema} from "@/schemas";
import {CreateSpace} from "@/actions/elements";

export const useCreateSpace = () => {
    const {mutate,isPending} = useMutationData(["create-space"], (data) => CreateSpace(data.name, data.dimensions, data.thumbnail, data.mapId), "spaces");

    const {errors, onFormSubmit, register, watch, reset} = useZodForm(spaceSchema, mutate);
    return {errors, onFormSubmit, register, isPending, watch, reset};
}