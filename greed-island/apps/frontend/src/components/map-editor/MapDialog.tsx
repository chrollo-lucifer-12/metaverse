import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import CreateMapForm from "@/components/map-editor/CreateMapForm";

const MapDialog = () => {
    return <Dialog>
        <DialogTrigger>
            <Button>
                <PlusIcon/>
                <p>Add New Map</p>
            </Button>
        </DialogTrigger>
        <DialogContent className={"bg-black border-1 text-white"}>
            <DialogHeader>
                <DialogTitle>Add a new map to your collection</DialogTitle>
            </DialogHeader>
            <CreateMapForm/>
        </DialogContent>
    </Dialog>
 }

 export default MapDialog