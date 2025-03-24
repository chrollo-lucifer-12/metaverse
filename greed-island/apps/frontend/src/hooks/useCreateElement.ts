"use client"
import {useMutationData} from "@/hooks/useMutationData";
import useZodForm from "@/hooks/useZodForm";
import {elementSchema} from "@/schemas";
import { CreateElement} from "@/actions/elements";


export const useCreateElement = () => {
    const {mutate, isPending} = useMutationData(["create-element"], (data) => CreateElement(data.name, data.width, data.height, data.image, data.jsonData, data.isStatic), "elements")
    const {errors, onFormSubmit, register, watch} = useZodForm(elementSchema, mutate);
    return {errors, onFormSubmit, register, isPending, watch};
}