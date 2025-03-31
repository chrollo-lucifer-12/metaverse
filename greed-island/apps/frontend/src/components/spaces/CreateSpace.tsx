import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import CreateElementForm from "@/components/elements-management/CreateElementForm";
import CreateSpaceForm from "@/components/spaces/CreateSpaceForm";

const CreateSpace = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
            <Button className = "cursor-pointer bg-[#272729]">
                <PlusIcon/>
                <p>Add New Space</p>
            </Button>
        </DialogTrigger>
        <DialogOverlay className={"backdrop-blur-sm z-50 fixed inset-0 bg-black/30"} />
        <DialogContent className={"bg-black border-1 border-[#232325] text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 focus:shadow-blue-500/60"}>
            <DialogHeader>
                <DialogTitle>Add a new space to your collection</DialogTitle>
            </DialogHeader>
            <CreateSpaceForm onClose={handleClose}/>
        </DialogContent>
    </Dialog>
}

export default CreateSpace