import {
    Dialog,
    DialogContent,
    DialogHeader, DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import CreateElementForm from "@/components/elements-management/CreateElementForm";


const CreateElement = () => {
    return <Dialog>
        <DialogTrigger >
            <Button className = "cursor-pointer">
                <PlusIcon/>
                <p>Add New Element</p>
            </Button>
        </DialogTrigger>
        <DialogOverlay className={"backdrop-blur-sm z-50 fixed inset-0 bg-black/30"} />
        <DialogContent className={"bg-black border-1 border-[#232325] text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 focus:shadow-blue-500/60"}>
            <DialogHeader>
                <DialogTitle>Add a new element to your collection</DialogTitle>
            </DialogHeader>
            <CreateElementForm/>
        </DialogContent>
    </Dialog>

}

export default CreateElement