"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchAvatars} from "@/actions/elements";
import {AvatarsProps} from "@/types";
import PropCard from "@/components/props-management/PropCard";
import CreateProp from "@/components/props-management/CreateProp";

const PropsManagement = () => {

    const {data } = useQueryData(["avatars"],  () => fetchAvatars());

    const avatars = data as AvatarsProps;

    return <div>
        <div className={"text-white mt-10 ml-6 mr-6 flex items-center justify-between"}>
            <div>
                <p className="text-5xl font-bold">Avatars</p>
                <p className={"text-ms mt-3 text-[#7f8086]"}>Add, edit, and manage avatars for your metaverse world.</p>
            </div>
            <CreateProp/>
        </div>
        <div className={"ml-6 mr-6 mt-10 flex gap-x-8"}>
            {
                !avatars.length ? (<p className={"text-center text-[#7f8086] text-md"}>No avatars to show</p>) : (
                    avatars.map((avatar) => (
                        <PropCard key={avatar.id} imageUrl={avatar.imageUrl} name={avatar.name} idleJson={avatar.idleJson} imageUrl2={avatar.imageUrl2} runningJson={avatar.runningJson} />
                    ))
                )
            }
        </div>
    </div>
}

export default PropsManagement