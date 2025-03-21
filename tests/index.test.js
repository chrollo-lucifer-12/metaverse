
import {v4} from "uuid"
import axios from "axios";

const BACKEND_URL = "http://localhost:3000"

describe("Authentication",  () => {
    test("User is able to signup", async () => {
        const clerkId = "user_" + v4();
        const imageUrl = "image.jpg";
        const name = "sahil";
        const res =  await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            clerkId,
            imageUrl,
            name,
            type : "admin"
        })
        expect(res.statusCode).toBe(200);
    })

    test("request fails if user tries to signup without clerkId", async () => {
        const res =  await axios.post(`${BACKEND_URL}/api/v1/signup`);
        expect(res.statusCode).toBe(400);
    })
})

describe("User metadata endpoints", () => {

    let clerkIdGlobal, avatarIdGlobal;

    beforeAll(async () => {
        const clerkId = "user_" + v4();
        clerkIdGlobal = clerkId;
        const imageUrl = "image.jpg";
        const name = "sahil";
        const res =  await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            clerkId,
            imageUrl,
            name,
            type : "admin"
        })

        const avatarRes = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
            clerkId : clerkId,
            imageUrl : "sasdfsdf",
            name : "gojo"
        })

        avatarIdGlobal = avatarRes.avatarId
    })

    test("user can't update metadata with wrong avatarId", async () => {
        const  avatarId = v4();
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            clerkId : clerkIdGlobal,
            avatarId
        });
        exports(res.statusCode).toBe(400);
    })

    test("user can update metadata with right avatarId", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            clerkId : clerkIdGlobal,
            avatarId : avatarIdGlobal
        });
        exports(res.statusCode).toBe(200);
    })

    test("user is not able to update metadata if clerkId is absent", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId : avatarIdGlobal
        });
        exports(res.statusCode).toBe(400);
    })


})
