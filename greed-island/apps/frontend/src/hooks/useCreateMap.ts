"use client"

import {useMutationData} from "@/hooks/useMutationData";
import useZodForm from "@/hooks/useZodForm";
import { mapSchema} from "@/schemas";
import {CreateMap} from "@/actions/elements";

export const useCreateMap = () => {
    const {isPending, mutate} = useMutationData(["create-map"], (data) => CreateMap(data.name, data.dimensions, data.thumbnail), "maps");
    const {errors, onFormSubmit, register, watch} = useZodForm(mapSchema, mutate);
    return {errors, onFormSubmit, register, watch, isPending}
}