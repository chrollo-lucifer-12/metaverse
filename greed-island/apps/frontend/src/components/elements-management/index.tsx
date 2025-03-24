import {useQueryData} from "@/hooks/useQueryData";
import {fetchElements} from "@/actions/elements";
import {ElementsProps} from "@/types";
import ElementsCard from "@/components/elements-management/ElementsCard";
import CreateElement from "@/components/elements-management/CreateElement";

const ElementsManagement = () => {
    const {data} = useQueryData(["elements"], () => fetchElements())

    const elements = data as ElementsProps

    return <div>
        <div className={"text-white mt-10 ml-6 mr-6 flex items-center justify-between"}>
            <div>
                <p className="text-5xl font-bold">Props</p>
                <p className={"text-ms mt-3 text-[#7f8086]"}>Add, edit, and manage props for your metaverse world.</p>
            </div>
            <CreateElement/>
        </div>
        <div className={"ml-6 mr-6 mt-10 flex gap-x-8"}>
            {
                !elements.length ? (<p className={"text-center text-[#7f8086] text-md"}>No elements to show</p>) : (
                    elements.map((element) => (
                        <ElementsCard key={element.id} imageUrl={element.imageUrl} name={element.name} jsonData={element.jsonData}/>
                    ))
                )
            }
        </div>
    </div>
}

export default ElementsManagement