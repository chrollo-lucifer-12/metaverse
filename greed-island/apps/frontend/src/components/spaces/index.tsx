"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchUserSpace} from "@/actions/user";
import TotalSpacesCard from "@/components/spaces/TotalSpacesCard";
import {SpaceProps} from "@/types";
import CreateSpace from "@/components/spaces/CreateSpace";

const Spaces = () => {

    const {data,isFetching} = useQueryData(["spaces"], () => fetchUserSpace())

    const spaces = data as SpaceProps

    return <div className={"mt-4 flex flex-col gap-4"}>
        <TotalSpacesCard numberOfSpaces={spaces.length}/>
        <CreateSpace/>
    </div>
}

export default Spaces