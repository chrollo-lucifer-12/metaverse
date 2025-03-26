import {Router} from "express";
import {prisma} from "@repo/db/client"
const adminRouter : Router = Router();

adminRouter.post("/element", async  (req, res) => {
    const {imageUrl, width, height, isStatic, jsonData, name} = req.body
    const clerkId = req.header("clerkId");

    if (!clerkId || !imageUrl || !width || !height || !isStatic) {
        res.status(400).json({message : "Missing data"})
        return;
    }

    try {

        const findUser = await prisma.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
        }

        const element = await prisma.elements.create({
            data : {
                static : isStatic,
                width,
                height,
                imageUrl,
                jsonData : JSON.parse(jsonData),
                name
            }
        })
        res.status(200).json({id : element.id});
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

adminRouter.put("/element/:elementId" , async (req, res) => {
    const {imageUrl} = req.body
    const clerkId = req.header("clerkId");
    const elementId = req.params.elementId;

    if (!imageUrl || !clerkId || !elementId) {
        res.status(400).json({message : "Missing data"})
        return;
    }

    try {
        const findUser = await prisma.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
        }
        await prisma.elements.update({data : {imageUrl}, where : {id : elementId}})
        res.status(200).json({message : "Element updated"});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

adminRouter.post("/avatar", async (req, res) => {
    const {imageUrl, name, imageUrl2, idleJson, runningJson} = req.body
    const clerkId = req.header("clerkId");
    if (!imageUrl || !clerkId || !name) {
        res.status(400).json({message : "Missing data"})
        return;
    }
    try {
        const findUser = await prisma.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
            return;
        }
        const avatar = await prisma.avatar.create({
            data : {
                imageUrl,
                name,
                imageUrl2,
                idleJson : JSON.parse(idleJson),
                runningJson : JSON.parse(runningJson)
            }
        })
        res.status(200).json({avatarId : avatar.id})
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

adminRouter.post("/map", async (req, res) => {
    const {thumbnail, dimensions, name} = req.body;
    const clerkId = req.header("clerkId");

    if (!thumbnail || !name || !dimensions) {
        res.status(400).json({message : "Missing data"})
        return;
    }

    try {
        const findUser = await prisma.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
            return;
        }
        const [width, height] = dimensions.split("x").map(Number);
        await prisma.map.create({
            data : {
                width,
                height,
                thumbnail,
                name,
            }
        })
        res.status(200).json({message : "map created"})
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

export default adminRouter