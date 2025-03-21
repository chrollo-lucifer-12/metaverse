
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
        expect(res.status).toBe(200);
    })

    test("request fails if user tries to signup without clerkId", async () => {
        const res =  await axios.post(`${BACKEND_URL}/api/v1/signup`);
        expect(res.status).toBe(400);
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
        exports(res.status).toBe(400);
    })

    test("user can update metadata with right avatarId", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            clerkId : clerkIdGlobal,
            avatarId : avatarIdGlobal
        });
        exports(res.status).toBe(200);
    })

    test("user is not able to update metadata if clerkId is absent", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarId : avatarIdGlobal
        });
        exports(res.status).toBe(400);
    })


})

describe("user avatar information", () => {
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

    test("get back avatar information for user", async () => {
        const res =  await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${clerkIdGlobal}]`);
        expect(res.data.avatars.length).toBe(1);
    })

    test("available avatars lists the recently created avatar", async () => {
        const res = await axios.get(`${BACKEND_URL}/api/v1/avatars`);
        expect(res.data.avatars.length).not.toBe(0);
    })
})

describe("space information", () => {
    let mapId, element1Id, element2Id, adminClerkId = "user_" + v4(), userClerkId = "user_" + v4();

    beforeAll( async () =>
    {

        const imageUrl = "image.jpg";
        const name = "sahil";
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            clerkId : adminClerkId,
            imageUrl,
            name,
            type : "admin"
        })

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            clerkId : userClerkId,
            imageUrl,
            name,
        })

        const element1Res = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            imageUrl : "dfsdfds",
            width : 1,
            height : 1,
            static : true
        }, {
            headers : {
                clerkId: adminClerkId
            }
        })

        element1Id = element1Res.data.id;

        const element2Res = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
            imageUrl : "dfsdfds",
            width : 1,
            height : 1,
            static : false
        }, {
            headers : {
                clerkId: adminClerkId
            }
        })

        element2Id = element2Res.data.id;


        const res = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
            thumbnail : "fdsfsdf.png",
            dimensions : "100x200",
            name : "something",
            defaultElements : [{
                elementId : element1Id,
                x : 20,
                y : 20
            }, {
                elementId:  element2Id,
                x : 40, y : 40
            }]
        }, {
            headers : {
                clerkId: adminClerkId
            }
        })

        mapId = res.data.id
    })

    test("user is able to create a space", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            name : "test",
            dimensions : "100x200",
            mapId
        }, {
            headers : {
                clerkId : userClerkId
            }
        })

        expect(res.data.spaceId).toBeDefined();
    })

    test("user is able to create a space without a map", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/space`, {

            name : "test",
            dimensions : "100x200",
        }, {
            headers : {
                clerkId : userClerkId,
            }
        })
        expect(res.data.spaceId).toBeDefined();
    })

    test("user is not able to create a space without a map and dimensions", async () => {
        const res = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            name : "test",
        }, {
            headers : {
                clerkId : userClerkId,
            }
        })
        expect(res.status).toBe(400);
    })

    test("user is not able to delete a space that doesnt exist", async () => {
        const res = await axios.delete(`${BACKEND_URL}/api/v1/space/123`, {
            headers : {
                clerkId : userClerkId,
            }
        })
        expect(res.status).toBe(400);
    })

    test("user is able to delete a space", async () => {

        const res = await axios.post(`${BACKEND_URL}/api/v1/space`, {
            name : "test",
            dimensions : "100x200",
            mapId
        }, {
            headers : {
                clerkId : userClerkId,
            }
        })

        const resDelete = await axios.delete(`${BACKEND_URL}/api/v1/space/${res.data.spaceId}`, {
            headers : {
                clerkId : userClerkId,
            }
        })
        expect(resDelete.status).toBe(200);
    })

    test("user is able to get all space", async () => {
        const res =  await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
            headers : {
                clerkId : userClerkId,
            }
        })
        expect(res.status).toBe(200)
    })
})
