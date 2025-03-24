import {useCreateElement} from "@/hooks/useCreateElement";
import FormGenerator from "@/components/form-generator";
import {Button} from "@/components/ui/button";

const CreateElementForm = () => {
    const {errors,isPending,onFormSubmit,register,watch} = useCreateElement()

    return <form onSubmit={onFormSubmit}>
        <FormGenerator inputType={"input"} placeholder={"Enter name for element"} register={register} name={"name"} errors={errors}/>
        <FormGenerator inputType={"input"} placeholder={"Enter width for element"} register={register} name={"width"} errors={errors}/>
        <FormGenerator inputType={"input"} placeholder={"Enter height for element"} register={register} name={"height"} errors={errors}/>
        <FormGenerator inputType={"input"} placeholder={"Image for element"} register={register} name={"image"} errors={errors} type={"file"} />
        <FormGenerator inputType={"input"} placeholder={"Json for element"} register={register} name={"jsonData"} errors={errors}/>
        <FormGenerator inputType={"input"} placeholder={"Static Element"} register={register} name={"isStatic"} errors={errors} type={"checkbox"} label={"Static Element"} />
        <Button type="submit" disabled={isPending} className="mt-2 bg-white text-black w-full hover:bg-gray-200"
                style={{borderRadius: "0.4rem"}}>
            {
                isPending ? "Creating" : "Create"
            }
        </Button>
    </form>
}

export default CreateElementForm