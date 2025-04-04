"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchUserSpace} from "@/actions/user";
import TotalSpacesCard from "@/components/spaces/TotalSpacesCard";
import {SpaceProps} from "@/types";
import CreateSpace from "@/components/spaces/CreateSpace";
import SpaceCard from "@/components/spaces/SpaceCard";
import JoinSpace from "@/components/spaces/JoinSpace";

const Spaces = () => {

    const {data, isFetching} = useQueryData(["spaces"], () => fetchUserSpace())

    const spaces = data as SpaceProps[]

    return <div className={"mt-4 flex flex-col gap-4 mb-4"}>
        <TotalSpacesCard numberOfSpaces={spaces.length}/>
        <div className={"flex gap-2 justify-center items-center"}>

        <CreateSpace/>
        <JoinSpace/>
        </div>
        <div className={"flex gap-2"}>
            {
                spaces.map((space) => (
                    <SpaceCard key={space.id} space={space}/>
                ))
            }
        </div>
    </div>
}

export default Spaces