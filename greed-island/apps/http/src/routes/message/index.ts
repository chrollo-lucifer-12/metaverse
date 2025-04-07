import {Router} from "express";
import {prisma} from "@repo/db/client"

const messageRouter : Router = Router();

messageRouter.get("/:spaceId", async (req, res) => {

    const {spaceId} = req.params;

    try {
        const messages = await prisma.message.findMany({where : {spaceId}, select : {content : true, createdAt : true, user : {select : {username : true}}}});
        res.status(200).json({messages});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

messageRouter.post("/create", async (req, res) => {
    const {content, spaceId, userId} = req.body
    try {
        await prisma.message.create({
            data : {
                content,
                spaceId,
                userId
            }
        })
        res.status(201).json({message : "message created"});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

export default messageRouter