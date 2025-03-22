import {Router} from "express";
import client from "@repo/db/client"
export const adminRouter = Router();

adminRouter.post("/element", async  (req, res) => {
    const {imageUrl, width, height, isStatic} = req.body
    const clerkId = req.header("clerkId");

    if (!clerkId || !imageUrl || !width || !height || !isStatic) {
        res.status(400).json({message : "Missing data"})
        return;
    }

    try {

        const findUser = await client.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
        }

        const element = await client.elements.create({
            data : {
                static : isStatic,
                width,
                height,
                imageUrl,
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
        const findUser = await client.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
        }
        await client.elements.update({data : {imageUrl}, where : {id : elementId}})
        res.status(200).json({message : "Element updated"});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})

adminRouter.post("/avatar", async (req, res) => {
    const {imageUrl, name} = req.body
    const clerkId = req.header("clerkId");
    if (!imageUrl || !clerkId || !name) {
        res.status(400).json({message : "Missing data"})
        return;
    }
    try {
        const findUser = await client.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
            return;
        }
        const avatar = await client.avatar.create({
            data : {
                imageUrl,
                name
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
    const {thumbnail, dimensions, name, defaultElements} = req.body;
    const clerkId = req.header("clerkId");

    if (!thumbnail || !name || !dimensions) {
        res.status(400).json({message : "Missing data"})
        return;
    }

    try {
        const findUser = await client.user.findUnique({where : {clerkId}});
        if (!findUser || findUser.role!=="Admin") {
            res.status(400).json({message : "User not found or not an admin"})
            return;
        }
        const [width, height] = dimensions.split("x").map(Number);
        const map = await client.map.create({
            data : {
                width,
                height,
                thumbnail,
                name,
            }
        })
        defaultElements.map(async (e) => {
            await client.mapElements.create({
                data : {
                    mapId : map.id,
                    x : e.x,
                    y : e.y,
                    elementId : e.elementId
                }
            })
        })
        res.status(200).json({message : "map created"})
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
})