
import {v4} from "uuid"
import axios from "axios";

const BACKEND_URL = "http://localhost:3000"

describe("Authentication",  () => {
    test("User is able to signup", async () => {
        const clerkId = "user_" + v4();
        const res =  await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            clerkId,
            type : "admin"
        })
        expect(res.statusCode).toBe(200);
    })
})