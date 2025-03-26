import express, {Router} from "express"
import authRouter from "./auth/index.js";
import userRouter from "./user/index.js";
import spaceRouter from "./space/index.js";
import adminRouter from "./admin/index.js";
import {prisma} from "@repo/db/client"


const router : Router = express.Router();

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/space", spaceRouter)
//router.use("/arena", arenaRouter)
router.use("/admin", adminRouter)

router.get("/avatars", async  (req, res) => {
    try {
        const avatars = await prisma.avatar.findMany();
        res.status(200).json({avatars});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

router.get("/elements", async (req, res) => {
    try {
        const elements = await prisma.elements.findMany();
        res.status(200).json({elements});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

router.get("/maps", async (req, res) => {
    try {
        const maps = await prisma.map.findMany({select : {name : true, id : true}});
        res.json(200).json({maps});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

export default router