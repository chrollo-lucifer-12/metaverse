import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchMapElements, fetchMaps} from "@/actions/elements";
import MapEditor from "@/components/map-editor";

// add params

const Page = async ({params} : {params : {mapId : string}}) => {

    const {mapId} = await params

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["maps"],
        queryFn: () => fetchMaps()
    })

    await query.prefetchQuery({
        queryKey : ["map-elements"],
        queryFn : () => fetchMapElements(mapId)
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className={"h-full w-full flex justify-center items-center"}>
                <MapEditor mapId = {mapId} />
            </div>
        </HydrationBoundary>
    )
}

export default Page