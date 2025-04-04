"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchUserProfile} from "@/actions/user";
import {AvatarProps, UserMetadata} from "@/types";
import {useUpdateProfile} from "@/hooks/useUpdateProfile";
import FormGenerator from "@/components/form-generator";
import { Separator } from "@/components/ui/separator"
import AvatarAnimation from "@/components/animation/avatar-animation";
import PropCard from "@/components/props-management/PropCard";
import {fetchAvatars} from "@/actions/elements";
import {Button} from "@/components/ui/button";


const ProfilePage = () => {
    const {data: userMetadataData, isFetching} = useQueryData(["user-metadata"], () => fetchUserProfile());
    const {data} = useQueryData(["avatars"] , () => fetchAvatars());
    const {control, errors, isPending, onFormSubmit, register, reset, watch} = useUpdateProfile()

    const userData = userMetadataData as UserMetadata
    const avatars = data as AvatarProps[]

    return (
        <div className={"flex justify-between m-8"}>
            <div className={"text-white w-[60%]"}>
                <p className={"text-xl tracking-tight"}>Profile</p>
                <p className={"text-[#858980]"}>This is how others will see you on the site.</p>
                <Separator className={"mt-2"} color={"#858980"}/>
                <form className={"mt-6"} onSubmit={onFormSubmit}>
                    <FormGenerator inputType={"input"} label={"Username"} placeholder={userData.username}
                                   register={register} name={"username"} errors={errors}/>
                    <FormGenerator inputType={"input"} label={"Email"} placeholder={userData.email} register={register}
                                   name={"email"} errors={errors}/>
                    <FormGenerator control={control} inputType={"select"} register={register} name={"avatarId"} errors={errors} options={avatars} label={"Avatars"} />
                    <Button disabled={isPending} className={"bg-white text-black mt-8 cursor-pointer hover:bg-white"}>
                        {
                            isPending ? "Saving" : "Save Changes"
                        }
                    </Button>
                </form>
            </div>
            <div className={""}>
              <PropCard imageUrl={userData.Avatar.imageUrl} name={userData.Avatar.name} imageUrl2={userData.Avatar.imageUrl2} idleJson={userData.Avatar.idleJson} runningJson={userData.Avatar.runningJson}/>
            </div>
        </div>
    )
}

export default ProfilePage