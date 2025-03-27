import {useCreateProp} from "@/hooks/useCreateProp";
import {Button} from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";

const CreatePropForm = () => {
    const {errors, isPending, onFormSubmit, register} = useCreateProp();
    return <form onSubmit={onFormSubmit}>
        <FormGenerator inputType={"input"} placeholder={"Enter name for avatar"} register={register} name={"name"}
                       errors={errors} label={"Name"} />
        <FormGenerator inputType={"input"} placeholder={"Idle image"} register={register} name={"idleImage"}
                       errors={errors} type={"file"} label={"Idle Image"} />
        <FormGenerator inputType={"input"} placeholder={"Enter json for idle avatar"} register={register}
                       name={"idleJson"} errors={errors} type={"text"} label={"Idle json"} />
        <FormGenerator inputType={"input"} placeholder={"Running image"} register={register} name={"runningImage"}
                       errors={errors} type={"file"} label={"Running Image"} />
        <FormGenerator inputType={"input"} placeholder={"Enter json for running avatar"} register={register}
                       name={"runningJson"} errors={errors} type={"text"} label={"Running json"} />
        <Button type="submit" disabled={isPending} className="mt-2 bg-white text-black w-full hover:bg-gray-200 cursor-pointer"
                style={{borderRadius: "0.4rem"}}>
            {
                isPending ? "Creating" : "Create"
            }
        </Button>
    </form>
}

export default CreatePropForm