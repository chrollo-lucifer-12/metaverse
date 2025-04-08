import Spaces from "@/components/spaces";
import {fetchUserProfile, fetchUserSpace} from "@/actions/user";
import {fetchAvatars, fetchMaps} from "@/actions/elements";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
const Page = async () => {

    const query = new QueryClient();

    await Promise.all([
        query.prefetchQuery({
            queryKey: ["spaces"],
            queryFn: () => fetchUserSpace(),
        }),
        query.prefetchQuery({
            queryKey: ["user-metadata"],
            queryFn: () => fetchUserProfile(),
        }),
        query.prefetchQuery({
            queryKey: ["avatars"],
            queryFn: () => fetchAvatars(),
        }),
        query.prefetchQuery({
            queryKey: ["maps"],
            queryFn: () => fetchMaps(),
        }),
    ]);

    return <HydrationBoundary state={dehydrate(query)}> <div className={"text-white mt-8 ml-5"}>
        <div className="flex flex-col gap-y-2">
            <span>Your spaces</span>
            <span className="text-5xl text-[#86868c]">See and edit all your spaces here</span>
        </div>
        <Spaces/>
    </div>
    </HydrationBoundary>
}

export default Page