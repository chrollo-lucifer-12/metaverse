"use server"

import axios from "axios";
import { supabase } from "../lib/utils"
import {currentUser} from "@clerk/nextjs/server";
import {getCache, setCache} from "../lib/cache"
import character from "@/components/character";

export const fetchAvatars = async () => {
    try {

        const cacheKey = "avatars";

        const cachedData = getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/avatars`);
        const avatars = res.data.avatars;
        await setCache(cacheKey,avatars,1000);
        return avatars;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const fetchElements = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/elements`);
        return res.data.elements;
    } catch (e) {
        console.log(e);
        return[]
    }
}

export const fetchMaps = async () => {
    try {
        const cacheKey = "maps";

        const cachedData = getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/maps`);
        const maps =  res.data.maps;
        await setCache(cacheKey,maps,1000);
        return maps;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const CreateAvatar = async (
    name: string,
    idleImage: File,
    idleJson: string,
    runningImage: File,
    runningJson: string
) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const uniqueFileName = (file: File) => `uploads/${crypto.randomUUID()}_${file.name}`;
        const { data: idleData, error: idleError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(idleImage), idleImage);

        if (idleError) throw idleError;

        const idleImageUrl = supabase.storage.from("storage").getPublicUrl(idleData.path).data.publicUrl;
        const { data: runningData, error: runningError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(runningImage), runningImage);

        if (runningError) throw runningError;

        const runningImageUrl = supabase.storage.from("storage").getPublicUrl(runningData.path).data.publicUrl;
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/avatar`,
            {
                name,
                imageUrl: idleImageUrl,
                imageUrl2: runningImageUrl,
                idleJson,
                runningJson,
            },
            {
                headers: {
                    clerkId: user.id,
                },
            }
        );
    } catch (e) {
        console.error("Error:", e);
    }
};


export const CreateElement = async (name : string, width : string, height : string, image : File, jsonData : string, isStatic : boolean) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const uniqueFileName = (file: File) => `uploads/${crypto.randomUUID()}_${file.name}`;
        const { data: idleData, error: idleError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(image), image);
        if (idleError) throw idleError;
        const idleImageUrl = supabase.storage.from("storage").getPublicUrl(idleData.path).data.publicUrl;
        await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/element`,{
            name ,
            width : parseInt(width),
            height : parseInt(height),
            imageUrl : idleImageUrl,
            jsonData,
            isStatic : isStatic ? true : false
        }, {
            headers : {
                clerkId : user.id
            }
        })
    } catch (e) {
        console.log(e);
    }``
}

export const CreateMap = async (name : string, dimensions : string, thumbnail : File) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const uniqueFileName = (file: File) => `uploads/${crypto.randomUUID()}_${file.name}`;
        const { data: idleData, error: idleError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(thumbnail), thumbnail);
        if (idleError) throw idleError;
        const idleImageUrl = supabase.storage.from("storage").getPublicUrl(idleData.path).data.publicUrl;
        const res = await axios.post( `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/map`,{
            name ,
            dimensions,
            thumbnail : idleImageUrl
        }, {
            headers : {
                clerkId : user.id
            }
        })
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

export const fetchMapElements = async (mapId : string) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/map/${mapId}`, {
            headers : {
                clerkId : user.id
            }
        })
        console.log(res);
        return res.data.elements
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const updateElements = async (mapId : string, elements : {id : string, elementId : string, x : number, y : number}[]) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/map/${mapId}`, {
            elements,
        }, {
            headers : {
                clerkId : user.id
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export const CreateSpace = async (name : string, dimensions : string, thumbnail : File, mapId : string) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const uniqueFileName = (file: File) => `uploads/${crypto.randomUUID()}_${file.name}`;
        const { data: idleData, error: idleError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(thumbnail), thumbnail);
        if (idleError) throw idleError;
        const idleImageUrl = supabase.storage.from("storage").getPublicUrl(idleData.path).data.publicUrl;
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/space/space`, {
            name,
            dimensions,
            thumbnail : idleImageUrl,
            mapId
        }, {
            headers : {
                clerkId : user.id
            }
        })
    } catch (e) {
        console.log(e);
    }
}

export const fetchSpaceElements = async (spaceId : string) => {
    try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/space/${spaceId}`);
        const elements =  res.data.space

        return elements
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const verifySpace = async (spaceId : string) => {
    try { const user = await currentUser();
        if (!user) throw new Error("User not authenticated");
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify/${spaceId}`, {
            headers : {
                clerkId : user!.id
            }
        });
        return res.status===200;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const fetchMessage = async (spaceId : string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message/${spaceId}`);
        const messages =  res.data.messages;
        return messages
    } catch (e) {
        console.log(e);
        return []
    }
}

export const createMessage = async (spaceId : string, userId : string, content : string) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message/create`, {
            spaceId,
            userId,
            content
        })
    } catch (e) {
        console.log(e);
    }
}