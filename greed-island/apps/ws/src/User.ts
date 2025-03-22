import {WebSocket} from "ws"
import {RoomManager} from "./RoomManager";
import {OutgoingMessage} from "./types";
import {prisma} from "@repo/db/client";

function generateRandomString(length : number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export class User {
    public id : string
    private userId?: string
    private ws : WebSocket
    private spaceId?: string
    private x? : number
    private y? : number

    constructor(ws: WebSocket, ) {
        this.ws = ws;
        this.id = generateRandomString(12);
    }

    initHandlers () {
        this.ws.on("message", async (data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type) {
                case "join":
                    const spaceId = parsedData.payload.spaceId,clerkId = parsedData.payload.clerkId;
                    const user = await prisma.user.findUnique({where : {clerkId}});
                    if (!user) {
                        this.ws.close();
                        return;
                    }
                    this.userId = user.id
                    const space = await prisma.space.findUnique({where : {id : spaceId}})
                    if (!space) {
                        this.ws.close();
                        return;
                    }
                    this.spaceId = spaceId
                    RoomManager.getInstance().addUser(spaceId,this)
                    this.x =  Math.floor(Math.random() * space.width), this.y = Math.floor(Math.random() * space.height)
                    this.send({
                        type : "space-joined",
                        payload : {
                            // todo
                            spawn: {
                                x: this.x,
                                y: this.y
                            },
                            users : RoomManager.getInstance().rooms.get(spaceId)?.map((u) => ({ id : u.id})) ?? []
                        }
                    })
                    RoomManager.getInstance().broadcast({
                        type : "user-joined",
                        payload : {
                            userId: this.userId,
                                x : this.x,
                                y : this.y
                        }
                    },this, this.spaceId!)
                    break
                case "move":
                    const moveX = parsedData.payload.x, moveY = parsedData.payload.y
                    if ((this.x! - moveX) * (this.x! - moveX) + (this.y! - moveY) * (this.y! - moveY) == 1) {
                        this.x = moveX, this.y = moveY
                        RoomManager.getInstance().broadcast({
                            type : "move",
                            payload : {
                                x : this.x,
                                y : this.y
                            }
                        }, this, this.spaceId!)
                    }
                    else {
                        this.send({
                            type : "move-rejected",
                            payload : {
                                x : this.x,
                                y : this.y
                            }
                        })
                    }
                    break
                default:
                    break
            }
        })
    }

    public destroy() {
        RoomManager.getInstance().broadcast({
            type : "user-left",
            payload : {
                userId : this.userId
            }
        }, this, this.spaceId!)
        RoomManager.getInstance().removeUser(this,this.spaceId!)
    }

    send(payload : OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }

}