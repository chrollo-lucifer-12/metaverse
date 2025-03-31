import Spaces from "@/components/spaces";

const Page = () => {
    return <div className={"text-white mt-8 ml-5"}>
        <div className="flex flex-col gap-y-2">
            <span>Your spaces</span>
            <span className="text-5xl text-[#86868c]">See and edit all your spaces here</span>
        </div>
        <Spaces/>
    </div>
}

export default Page