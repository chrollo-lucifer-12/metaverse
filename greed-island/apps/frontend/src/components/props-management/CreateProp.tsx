import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import CreatePropForm from "@/components/props-management/CreatePropForm";


const CreateProp = () => {
    return <Dialog>
        <DialogTrigger>
            <Button>
                <PlusIcon/>
                <p>Add New Prop</p>
            </Button>
        </DialogTrigger>
        <DialogContent className={"bg-black border-1 text-white"}>
            <DialogHeader>
                <DialogTitle>Add a new prop to your collection</DialogTitle>
            </DialogHeader>
            <CreatePropForm/>
        </DialogContent>
    </Dialog>

}

export default CreateProp