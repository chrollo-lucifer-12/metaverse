import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchUserProfile, fetchUserSpace} from "@/actions/user";
import {fetchAvatars} from "@/actions/elements";
import Sidebar from "@/components/sidebar";

const Layout = async ({children} : {children : React.ReactNode}) => {
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

    return <HydrationBoundary state={dehydrate(query)}>
        <div className="flex h-screen w-screen bg-black text-white">
            <Sidebar children={children} />
        </div>
    </HydrationBoundary>
}

export default Layout