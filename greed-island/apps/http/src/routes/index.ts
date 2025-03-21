import express from "express"
import {authRouter} from "./auth";
import {userRouter} from "./user";
import {spaceRouter} from "./space";
import {arenaRouter} from "./arena";
import {adminRouter} from "./admin";

export const router = express.Router();

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/space", spaceRouter)
router.use("/arena", arenaRouter)
router.use("/admin", adminRouter)