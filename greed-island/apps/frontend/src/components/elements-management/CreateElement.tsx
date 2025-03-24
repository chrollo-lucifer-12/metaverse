import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import CreateElementForm from "@/components/elements-management/CreateElementForm";


const CreateElement = () => {
    return <Dialog>
        <DialogTrigger>
            <Button>
                <PlusIcon/>
                <p>Add New Element</p>
            </Button>
        </DialogTrigger>
        <DialogContent className={"bg-black border-1 text-white"}>
            <DialogHeader>
                <DialogTitle>Add a new element to your collection</DialogTitle>
            </DialogHeader>
            <CreateElementForm/>
        </DialogContent>
    </Dialog>

}

export default CreateElement