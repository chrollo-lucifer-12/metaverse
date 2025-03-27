import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogPortal, DialogOverlay,

} from "@/components/ui/dialog"
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import CreatePropForm from "@/components/props-management/CreatePropForm";


const CreateProp = () => {
    return <Dialog>
        <DialogTrigger >
            <Button className={"cursor-pointer"}>
                <PlusIcon/>
                <p>Add New Prop</p>
            </Button>
        </DialogTrigger>
        <DialogOverlay className={"backdrop-blur-sm z-50 fixed inset-0 bg-black/30"} />
        <DialogContent className={"bg-black border-1 border-[#232325] text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 focus:shadow-blue-500/60"}>
            <DialogHeader>
                <DialogTitle>Add a new prop to your collection</DialogTitle>
            </DialogHeader>
            <CreatePropForm/>
        </DialogContent>
    </Dialog>
}

export default CreateProp