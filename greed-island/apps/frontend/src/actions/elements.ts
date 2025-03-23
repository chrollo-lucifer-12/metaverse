"use server"

import axios from "axios";

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