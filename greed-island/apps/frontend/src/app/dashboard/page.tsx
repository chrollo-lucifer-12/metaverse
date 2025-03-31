import {QueryClient} from "@tanstack/react-query";
import {fetchUserProfile, fetchUserSpace} from "@/actions/user";
import {fetchAvatars} from "@/actions/elements";

const Page = async () => {

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ["spaces"],
        queryFn : () => fetchUserSpace()
    })

    await query.prefetchQuery({
        queryKey : ["user-metadata"],
        queryFn : () => fetchUserProfile()
    })

    await query.prefetchQuery({
        queryKey: ["avatars"],
        queryFn:  () => fetchAvatars()
    })

    return <div>

    </div>
}

export default Page