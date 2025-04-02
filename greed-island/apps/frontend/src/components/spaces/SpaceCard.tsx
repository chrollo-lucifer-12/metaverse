"use client"

import {SpaceProps} from "@/types";
import Image from "next/image";
import {useRouter} from "next/navigation";

const SpaceCard = ({space} : {space : SpaceProps}) => {

    const router= useRouter();

    return <div className={"w-[250px] flex flex-col bg-[#272729] rounded-md cursor-pointer hover:scale-105 transition duration-200"} onClick={() => {
        router.push(`/dashboard/${space.id}`)
    }}>
        <Image src={space.thumbnail!} alt={"space card"} width={250} height={60}/>
        <div className={"flex flex-col gap-y-2 p-3"}>
            <div className={"flex justify-between items-center"}>
                <p>{space.name}</p>
            </div>
        </div>
        <div className={"flex items-center gap-x-3"}>

        </div>
    </div>
}

export default SpaceCard