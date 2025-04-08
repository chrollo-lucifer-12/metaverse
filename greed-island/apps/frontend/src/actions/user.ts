"use server"

import {currentUser} from "@clerk/nextjs/server";
import axios from "axios";
import {getCache, setCache} from "../lib/cache"

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

export const fetchUserSpace = async () => {
    try {
        const user = await currentUser();
        if (!user) return [];

        const cacheKey = `user:${user.id}:spaces`

        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        console.log("hitting db");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/space/all`, {
            headers : {
                clerkId : user.id
            }
        })

        const spaces = res.data.spaces;
        await setCache(cacheKey, spaces, 1000);
        return spaces;
    } catch (e) {
        console.log(e);
        return []
    }
}

export const fetchUserProfile = async () => {
    try {
        const user = await currentUser();
        if (!user) return ;

        const cacheKey = `$user:${user.id}:profile`

        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/metadata`, {
            headers : {
                clerkId : user.id
            }
        })

        const profile = res.data.user;

        await setCache(cacheKey, profile, 1000);

        return profile

    } catch (e) {
        console.log(e);
        return ;
    }
}

export const updateProfile = async (username : string | null, email : string | null, avatarId : string | null) => {
    try {
        const user = await currentUser();
        if (!user) return ;
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/metadata`, {
            username,email,avatarId
        }, {
            headers : {
                clerkId : user.id
            }
        });
    } catch (e) {
        console.log(e);
    }
}

export const fetchAvatars = async (userIds : string[]) => {
    try {
        const res =  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/avatars/bulk`, {
            ids : userIds
        })
        return res.data.avatars
    } catch (e) {
        console.log(e);
        return[];
    }
}