import {Router} from "express";
import {generateUsername} from "unique-username-generator"

export const authRouter = Router();

import client from "@repo/db/client"

authRouter.post("/signup", async (req, res) => {
    const {clerkId, name, imageUrl, email} = req.body;

    try {
        const findUser = await client.user.findUnique({where: {clerkId}});
        if (findUser) {
            res.status(200).json({userId: findUser.id, message : "User already exists"});
            return;
        }
        const findAvatar = await client.avatar.findFirst();
        const createUser = await client.user.create({
            data: {
                username: name + generateUsername(),
                role: "User",
                email,
                imageUrl,
                clerkId,
                avatarId : findAvatar!.id
            }
        })
        res.status(201).json({userId : createUser.id, message : "User created"});
        return;
    } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal Server Error"})
    }
});