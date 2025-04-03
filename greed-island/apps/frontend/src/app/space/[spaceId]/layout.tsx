import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchSpaceElements} from "@/actions/elements";
import {fetchUserProfile} from "@/actions/user";

const Layout = async ({children, params} : {children : React.ReactNode, params : {spaceId : string}}) => {

    const {spaceId} = await params;


    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ["space-elements"],
        queryFn : () => fetchSpaceElements(spaceId)
    })

    await query.prefetchQuery({
        queryKey : ["user-metadata"],
        queryFn : () => fetchUserProfile()
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <main>
            {children}
        </main>
    </HydrationBoundary>
}

export default Layout