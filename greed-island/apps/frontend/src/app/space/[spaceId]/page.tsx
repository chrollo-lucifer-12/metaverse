import RenderSpace from "@/components/spaces/RenderSpace";
import {fetchMessage, fetchSpaceElements} from "@/actions/elements";
import {fetchUserProfile} from "@/actions/user";
import {currentUser} from "@clerk/nextjs/server";


const Page = async ({params} : {params : {spaceId : string}}) => {

    const {spaceId} = await params
    const user = await currentUser();

    const spaceElements = await fetchSpaceElements(spaceId);
    const userData = await fetchUserProfile();
    const messages = await fetchMessage(spaceId);


    return (
            <RenderSpace spaceId={spaceId} userId={user!.id} spaceElements={spaceElements} userMetadata={userData} messages={messages}/>
    )
}

export default Page