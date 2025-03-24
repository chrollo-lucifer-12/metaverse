"use client"
import {useMutationData} from "@/hooks/useMutationData";
import useZodForm from "@/hooks/useZodForm";
import {propSchema} from "@/schemas";
import {CreateAvatar} from "@/actions/elements";


export const useCreateProp = () => {
    const {mutate, isPending} = useMutationData(["create-avatar"], (data) => CreateAvatar(data.name, data.idleImage, data.idleJson, data.runningImage, data.runningJson), "avatars")
    const {errors, onFormSubmit, register, watch} = useZodForm(propSchema, mutate);
    return {errors, onFormSubmit, register, isPending, watch};
}