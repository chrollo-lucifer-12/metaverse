"use server"

import axios from "axios";
import { supabase } from "../lib/utils"
import {currentUser} from "@clerk/nextjs/server";

export const fetchAvatars = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/avatars`);
        console.log(res.data.avatars);
        return res.data.avatars;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const fetchElements = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/elements`);
        console.log(res.data.elements);
        return res.data.elements;
    } catch (e) {
        console.log(e);
        return[]
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

        console.log(name, idleJson, runningJson);

        const uniqueFileName = (file: File) => `uploads/${crypto.randomUUID()}_${file.name}`;

        console.log("Uploading idle image...");
        const { data: idleData, error: idleError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(idleImage), idleImage);

        if (idleError) throw idleError;

        const idleImageUrl = supabase.storage.from("storage").getPublicUrl(idleData.path).data.publicUrl;

        console.log("Uploading running image...");
        const { data: runningData, error: runningError } = await supabase.storage
            .from("storage")
            .upload(uniqueFileName(runningImage), runningImage);

        if (runningError) throw runningError;

        const runningImageUrl = supabase.storage.from("storage").getPublicUrl(runningData.path).data.publicUrl;

        console.log("Uploading to backend...");
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

        console.log(res);
    } catch (e) {
        console.error("Error:", e);
    }
};
