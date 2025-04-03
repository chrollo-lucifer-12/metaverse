import {Router} from "express";
import {prisma} from "@repo/db/client"

const userRouter : Router = Router();

userRouter.post("/metadata", async  (req, res) => {
    const {avatarId} = req.body
    const clerkId = req.header("clerkId")

    if (!clerkId || !avatarId) {
        res.status(400).json({message : "Missing required data"})
        return;
    }

    try {
        await prisma.user.update({where : {clerkId}, data : {avatarId}})
        res.status(200).json({message : "User updated successfully."});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"});
    }
})

userRouter.get("/metadata", async (req, res) => {
    const clerkId = req.header("clerkId");

    try {
        const user = await prisma.user.findUnique({
            where : {
                clerkId
            },
            select : {
                id : true,
                role : true,
                username : true,
                email : true,
                Avatar : true
            }
        })
        res.status(200).json({user});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

export default userRouter