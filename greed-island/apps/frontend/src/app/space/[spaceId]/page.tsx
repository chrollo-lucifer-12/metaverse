import RenderSpace from "@/components/spaces/RenderSpace";
import {fetchMessage, fetchSpaceElements} from "@/actions/elements";
import {fetchUserProfile} from "@/actions/user";
import {currentUser} from "@clerk/nextjs/server";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";


const Page = async ({params} : {params : {spaceId : string}}) => {

    const {spaceId} = await params
    const user = await currentUser();

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

    const spaceElements = await fetchSpaceElements(spaceId);
    const userData = await fetchUserProfile();
    const messages = await fetchMessage(spaceId);


    return (
        <HydrationBoundary state={dehydrate(query)}>
            <RenderSpace spaceId={spaceId} userId={user!.id} spaceElements={spaceElements} userMetadata={userData} messages={messages}/>
        </HydrationBoundary>
    )
}

export default Page