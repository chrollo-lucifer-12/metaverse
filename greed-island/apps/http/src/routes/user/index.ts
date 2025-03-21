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

userRouter.get("/metadata/bulk", async (req, res) => {
    const ids = req.query.ids;

    try {
        let parseIds = JSON.parse(ids as string);
        const users = await prisma.user.findMany({
            where : {id : {in : parseIds}},
            select : {id : true, imageUrl : true}
        })
        res.status(200).json({users});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

export default userRouter