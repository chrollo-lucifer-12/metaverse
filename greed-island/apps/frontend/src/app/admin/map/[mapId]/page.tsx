import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchMaps} from "@/actions/elements";
import MapEditor from "@/components/map-editor";

// add params

const Page = async () => {
    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["maps"],
        queryFn: () => fetchMaps()
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className={"h-full w-full flex justify-center items-center"}>
                <MapEditor/>
            </div>
        </HydrationBoundary>
    )
}

export default Page