"use client"


import useZodForm from "@/hooks/useZodForm";
import {spaceSchema, userSchema} from "@/schemas";
import {useMutationData} from "@/hooks/useMutationData";
import {CreateSpace} from "@/actions/elements";

export const useUpdateProfile = () => {
    const {mutate,isPending} = useMutationData(["update-profile"], (data) => CreateSpace(data.name, data.dimensions, data.thumbnail, data.mapId), "spaces");

    const {errors, onFormSubmit, register, watch, reset, control} = useZodForm(userSchema, mutate);

    return {errors, control ,onFormSubmit, register, isPending, watch, reset};
}