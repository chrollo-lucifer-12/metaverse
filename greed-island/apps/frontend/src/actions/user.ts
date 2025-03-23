"use server"

import {currentUser} from "@clerk/nextjs/server";
import axios from "axios";

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return false;
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
            clerkId : user.id,
            name : user.firstName,
            imageUrl : user.imageUrl,
            email : user.emailAddresses[0].emailAddress
        })
        console.log("signup",res);
        if (res.status===201 || res.data.status===200) return true;
        return false
    } catch (e) {
        console.log(e);
        return false;
    }
}