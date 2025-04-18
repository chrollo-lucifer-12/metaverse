import {WebSocket} from "ws"
import {RoomManager} from "./RoomManager";
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
    private username ?: string

    constructor(ws: WebSocket, ) {
        this.ws = ws;
        this.id = generateRandomString(12);
        this.initHandlers();
    }

    async isValidPosition (x : number, y : number) {
        const elements = await prisma.spaceElements.findMany({
            where: {
                spaceId: this.spaceId,
            },
            select : {
                Elements : true,
                x : true, y : true
            }
        });

        const isOverlapping = elements.some(el => {
            const withinX = x === el.x;
            const withinY = y === el.y;
            return withinX && withinY && el.Elements.static;
        });

        return !isOverlapping;
    }

    initHandlers () {
        this.ws.on("message", async (data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type) {
                case "join":
                    console.log("join request");
                    const spaceId = parsedData.payload.spaceId, clerkId = parsedData.payload.clerkId;
                    const user = await prisma.user.findUnique({where: {clerkId}});
                    if (!user) {
                        this.ws.close();
                        console.log("user not found")
                        return;
                    }
                    this.userId = user.id
                    this.username = user.username
                    const space = await prisma.space.findUnique({where: {id: spaceId}})
                    if (!space) {
                        this.ws.close();
                        console.log("space not found")
                        return;
                    }
                    this.spaceId = spaceId
                    RoomManager.getInstance().addUser(spaceId, this)
                    do {
                        this.x = Math.max(0, Math.min(space.width - 1, Math.floor(Math.random() * space.width)));
                        this.y = Math.max(0, Math.min(space.height - 1, Math.floor(Math.random() * space.height)));
                    } while (!(await this.isValidPosition(this.x, this.y)));

                    this.send({
                        type: "space-joined",
                        payload: {
                            x: this.x,
                            y: this.y,
                            id : this.userId,
                            users: RoomManager.getInstance().rooms.get(spaceId)?.map((u) =>  ({id: u.userId, username : u.username, x : u.x, y : u.y})) ?? [],
                        }
                    })
                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            user : {
                                id: this.userId,
                                username: this.username,
                                x: this.x,
                                y: this.y
                            }
                        }
                    }, this, this.spaceId!)
                    break
                case "move":
                    const moveX = parsedData.payload.x, moveY = parsedData.payload.y
                    console.log(moveX, this.x)
                    console.log(moveY,this.y);
                    let dx = this.x! - moveX;
                    let dy = this.y! - moveY;
                    let d = dx * dx + dy * dy;
                    //const canMove = await this.isValidPosition(moveX,moveY);
                    if ((d === 1 || d === 2)) {
                        this.x = moveX, this.y = moveY
                        RoomManager.getInstance().broadcast({
                            type: "user-move",
                            payload: {
                                id: this.userId,
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId!)
                        return;
                    }

                    console.log("conflict found")

                    this.send({
                        type: "move-rejected",
                        payload: {
                            x: this.x,
                            y: this.y
                        }
                    })
                    break
                case "chat" : {
                    const { content } = parsedData.payload;
                    await this.saveChat(content);
                    break
                }
                case "video-offer": {
                    const { offer } = parsedData.payload;
                    const usersInRoom = RoomManager.getInstance().rooms.get(this.spaceId!) || [];

                    // Broadcast the video offer to all other users in the room
                    usersInRoom.forEach(user => {
                        if (user.id !== this.id) {  // Don't send the offer to the user who sent it
                            user.send({
                                type: "video-offer",
                                payload: {
                                    offer,
                                    fromId: this.id,
                                    username: this.username
                                }
                            });
                        }
                    });
                    break;
                }

                case "video-answer": {
                    const { answer } = parsedData.payload;
                    const usersInRoom = RoomManager.getInstance().rooms.get(this.spaceId!) || [];

                    // Broadcast the video answer to all other users in the room
                    usersInRoom.forEach(user => {
                        if (user.id !== this.id) {  // Don't send the answer to the user who sent it
                            user.send({
                                type: "video-answer",
                                payload: {
                                    answer,
                                    fromId: this.id
                                }
                            });
                        }
                    });
                    break;
                }

                case "ice-candidate": {
                    const { candidate } = parsedData.payload;
                    const usersInRoom = RoomManager.getInstance().rooms.get(this.spaceId!) || [];

                    // Broadcast the ICE candidate to all other users in the room
                    usersInRoom.forEach(user => {
                        if (user.id !== this.id) {  // Don't send the candidate to the user who sent it
                            user.send({
                                type: "ice-candidate",
                                payload: {
                                    candidate,
                                    fromId: this.id
                                }
                            });
                        }
                    });
                    break;
                }


                default:
                    break
            }
        })
    }

    public async destroy() {
        RoomManager.getInstance().broadcast({
            type : "user-left",
            payload : {
                id : this.userId
            }
        }, this, this.spaceId!)
        RoomManager.getInstance().removeUser(this,this.spaceId!)
    }

    async saveChat (content : string) {
        if (this.spaceId && this.userId) {
            try {
                const message = await prisma.message.create({
                    data: {
                        userId: this.userId!,
                        spaceId: this.spaceId!,
                        content: content
                    }
                })
                RoomManager.getInstance().broadcast({
                    type: "chat",
                    payload: {
                        content: content,
                        createdAt: message.createdAt,
                        user: {
                            username: this.username
                        }
                    },
                }, this, this.spaceId!)
                this.send({
                    type : "chat",
                    payload: {
                        content,
                        createdAt: message.createdAt,
                        user: {
                            username: this.username
                        }
                    },
                    sentAt : Date.now()
                })
            } catch (e) {
                console.log(e);
            }

        }
    }

    send(payload : any) {
        console.log("sending to", this.username);
        this.ws.send(JSON.stringify(payload));
    }
}