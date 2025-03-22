import express from "express"
import {authRouter} from "./auth";
import {userRouter} from "./user";
import {spaceRouter} from "./space";
import {arenaRouter} from "./arena";
import {adminRouter} from "./admin";
import client from "@repo/db/client"

export const router = express.Router();

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/space", spaceRouter)
router.use("/arena", arenaRouter)
router.use("/admin", adminRouter)

router.get("/avatars", async  (req, res) => {
    try {
        const avatars = await client.avatar.findMany();
        res.status(200).json({avatars});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

router.get("/elements", async (req, res) => {
    try {
        const elements = await client.elements.findMany();
        res.status(200).json({elements});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})