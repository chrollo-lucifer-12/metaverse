"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useQueryData} from "@/hooks/useQueryData";
import {fetchMaps} from "@/actions/elements";
import {MapProps} from "@/types";

const MapSelector = () => {

    const {data, isFetching} = useQueryData(["maps"], () => fetchMaps());

    const maps = data as MapProps;

    return <Select>
        <SelectTrigger className="w-[250px] border-1 border-[#141416]">
            <SelectValue placeholder="Map" />
        </SelectTrigger>
        <SelectContent>
            {
                !isFetching && maps.map((map,i) => (
                    <SelectItem key={i} value={map.id}>{map.name}</SelectItem>
                ))
            }
        </SelectContent>
    </Select>

}

export default MapSelector