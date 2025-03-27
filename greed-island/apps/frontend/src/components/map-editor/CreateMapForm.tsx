"use client"

import {useCreateMap} from "@/hooks/useCreateMap";
import FormGenerator from "@/components/form-generator";
import {Button} from "@/components/ui/button";

const CreateMapForm = () => {
    const {errors,onFormSubmit,register,isPending, reset} = useCreateMap();

    return <form onSubmit={onFormSubmit}>
        <FormGenerator inputType={"input"} placeholder={"Enter name for map"} register={register} name={"name"} errors={errors}/>
        <FormGenerator inputType={"input"} placeholder={"Enter dimensions for map"} register={register} name={"dimensions"} errors={errors}/>
        <FormGenerator inputType={"input"} placeholder={"Enter thumbnail"} register={register} name={"thumbnail"} errors={errors} type={"file"} />
        <Button type="submit" disabled={isPending} className="mt-2 bg-white text-black w-full hover:bg-gray-200"
                style={{borderRadius: "0.4rem"}}>
            {
                isPending ? "Creating" : "Create"
            }
        </Button>
    </form>
}

export default CreateMapForm