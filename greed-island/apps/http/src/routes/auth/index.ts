import {Router} from "express";

export const authRouter = Router();

import client from "@repo/db/client"

authRouter.post("/signup", (req, res) => {
    //const {clerkId, name, imageUrl} = req.body;
    res.status(200).json({message : "sign up"})
    return;
});