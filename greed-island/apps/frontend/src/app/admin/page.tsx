import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import axios from "axios";
import Admin from "@/components/admin";
import {fetchAvatars, fetchElements} from "@/actions/elements";

const Page = async () => {

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["avatars"],
        queryFn:  () => fetchAvatars()
    })

    await query.prefetchQuery({
        queryKey: ["elements"],
        queryFn:  () => fetchElements()
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <Admin/>
    </HydrationBoundary>
}

export default Page