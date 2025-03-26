import {fetchMaps} from "@/actions/elements";
import {redirect} from "next/navigation";
import MapSetup from "@/components/map-editor/MapSetup";

const Page  = async () => {
     const maps = await fetchMaps();

     if (maps.length) {
         return redirect(`/admin/map/${maps[0].id}`)
     }

     return <MapSetup/>
}

export default Page