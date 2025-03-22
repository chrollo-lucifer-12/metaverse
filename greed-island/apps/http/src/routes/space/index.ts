import {Router} from "express";
import {prisma} from "@repo/db/client"
const spaceRouter : Router= Router();

spaceRouter.post("/space", async (req, res) => {
    const {name, dimensions, mapId, thumbnail} = req.body
    const clerkId = req.header("clerkId");

    try {
        const findUser = await prisma.user.findUnique({where : {clerkId}});
        if (!findUser) {
            res.status(400).json({message : "User doesn't exists"})
            return;
        }
        const [width, height] = dimensions.split("x").map(Number);
        const createSpace = await prisma.space.create({data : {
                creatorId: findUser.id,
                name,
                mapId,
                thumbnail,
                width,
                height
            }})
        res.status(200).json({message : "Space created"})
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

spaceRouter.delete("/:spaceId", async (req, res) => {
    const { spaceId } = req.params;
    const clerkId = req.header("clerkId");

    if (!spaceId || !clerkId) {
        res.status(400).json({messgae : "Missing data"})
        return
    }

    try {
        const findUser = await prisma.user.findUnique({where : {clerkId}});
        const findSpace = await prisma.space.findUnique({where : {id : spaceId}})

        if (!findUser || !findSpace || findSpace.creatorId!==findUser.id) {
            res.status(400).json({message : "Space or user not found"})
        }
        await prisma.space.delete({where : {id : spaceId}});
        res.status(200).json({message : "Space deleted"})
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

spaceRouter.get("/all", async (req, res) => {
    try {
        const spaces = await prisma.space.findMany({select : {id : true, name : true, height : true, width : true, thumbnail : true
        }});
        res.status(200).json({spaces});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

spaceRouter.get("/:spaceId", async (req, res) => {
    const { spaceId } = req.params;
    try {
        const space = await prisma.space.findUnique({where : {id : spaceId}, select : {height : true, width : true, spaceElements : true}});
        res.status(200).json({space});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"});
    }
})

spaceRouter.post("/element", async (req, res) => {
    const {elementId, spaceId, x,y,} = req.body;
    if (!elementId || !spaceId || !x || !y) {
        res.status(400).json({message : "Missing data"})
    }
    try {
        await prisma.spaceElements.create({data : {
                spaceId,
                elementId,
                x,
                y,
            }})
        res.status(200).json({message : "element added successfully."})
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

spaceRouter.delete("/element", async (req, res) => {
    const {spaceElementId} = req.body;

    try {
        await prisma.spaceElements.delete({where : {id : spaceElementId}});
        res.status(200).json({message : "Element deleted"})
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

export default spaceRouter