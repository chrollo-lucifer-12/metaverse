"use client"


import useZodForm from "@/hooks/useZodForm";
import { userSchema} from "@/schemas";
import {useMutationData} from "@/hooks/useMutationData";
import {updateProfile} from "@/actions/user";

export const useUpdateProfile = () => {
    const {mutate,isPending} = useMutationData(["update-profile"], (data) => updateProfile(data.username, data.email, data.avatarId), "user-metadata");

    const {errors, onFormSubmit, register, watch, reset, control} = useZodForm(userSchema, mutate);

    return {errors, control ,onFormSubmit, register, isPending, watch, reset};
}