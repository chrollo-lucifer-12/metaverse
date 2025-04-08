import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchUserProfile, fetchUserSpace} from "@/actions/user";
import {fetchAvatars, fetchMaps} from "@/actions/elements";
import Sidebar from "@/components/sidebar";

const Layout = async ({children} : {children : React.ReactNode}) => {
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

    return <HydrationBoundary state={dehydrate(query)}>
        <div className="flex h-screen w-screen bg-black text-white">
            <Sidebar children={children} />
        </div>
    </HydrationBoundary>
}

export default Layout