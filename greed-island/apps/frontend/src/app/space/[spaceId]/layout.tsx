import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchMessage, fetchSpaceElements, verifySpace} from "@/actions/elements";
import {fetchUserProfile} from "@/actions/user";
import NotFound from "@/components/not-found";

const Layout = async ({children, params} : {children : React.ReactNode, params : {spaceId : string}}) => {


    const {spaceId} = await params;

    // const isVerified = await verifySpace(spaceId);
    //
    // if (!isVerified) {
    //     return <NotFound/>
    // }

    const query = new QueryClient();

    await Promise.all([
        query.prefetchQuery({
            queryKey: ["space-elements", spaceId],
            queryFn: () => fetchSpaceElements(spaceId),
        }),
        query.prefetchQuery({
            queryKey: ["user-metadata"],
            queryFn: () => fetchUserProfile(),
        }),
    ]);


    return <HydrationBoundary state={dehydrate(query)}>
        <main>
            {children}
        </main>
    </HydrationBoundary>
}

export default Layout