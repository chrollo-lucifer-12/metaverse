import {useCreateSpace} from "@/hooks/useCreateSpace";
import {useQueryData} from "@/hooks/useQueryData";
import {fetchMaps} from "@/actions/elements";
import {MapProps} from "@/types";
import FormGenerator from "@/components/form-generator";
import {Button} from "@/components/ui/button";


const CreateSpaceForm = ({onClose} : {onClose : any}) => {
    const {errors,isPending,onFormSubmit,register,watch,reset, control} = useCreateSpace();

    const {data} = useQueryData(["maps"], () => fetchMaps());

    const maps = data as MapProps

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            await onFormSubmit();
        } catch (e) {
            console.log(e);
        }
    }

    return <form onSubmit={onFormSubmit}>
        <FormGenerator inputType={"input"} register={register} name={"name"} errors={errors} label={"Name"}/>
        <FormGenerator inputType={"input"} register={register} name={"dimensions"} errors={errors} label={"Dimensions"}/>
        <FormGenerator inputType={"input"} type={"file"} register={register} name={"thumbnail"} errors={errors} label={"Thumbnail"}/>
        <FormGenerator inputType={"select"} register={register} name={"mapId"} errors={errors} options={maps} control={control}/>
        <Button type="submit" disabled={isPending} className="mt-2 bg-white text-black w-full hover:bg-gray-200 cursor-pointer"
                style={{borderRadius: "0.4rem"}}>
            {
                isPending ? "Creating" : "Create"
            }
        </Button>
    </form>

}

export default CreateSpaceForm