import RenderSpace from "@/components/spaces/RenderSpace";

const Page = async ({params} : {params : {spaceId : string}}) => {

    const {spaceId} = await params

    return <RenderSpace spaceId={spaceId}/>
}

export default Page