import {z, ZodSchema} from "zod";
import {UseMutateFunction} from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";

const useZodForm = (schema : ZodSchema, mutation : UseMutateFunction, defaultValues?: any) => {
    const {register, watch, reset, handleSubmit, control, formState: {errors}} = useForm<z.infer<typeof schema>>({resolver: zodResolver(schema), defaultValues : {...defaultValues}})
    const onFormSubmit = handleSubmit(async (values) => mutation({...values}))

    return {register, watch, reset, onFormSubmit, errors,control}
}

export default useZodForm