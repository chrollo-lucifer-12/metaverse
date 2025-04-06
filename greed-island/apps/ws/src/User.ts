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
                            users: RoomManager.getInstance().rooms.get(spaceId)?.map((u) =>  ({id: u.userId, username : u.username, x : u.x, y : u.y})) ?? []
                        }
                    })
                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            id: this.userId,
                            username : this.username,
                            x: this.x,
                            y: this.y
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
                default:
                    break
            }
        })
    }

    public destroy() {
        RoomManager.getInstance().broadcast({
            type : "user-left",
            payload : {
                id : this.userId
            }
        }, this, this.spaceId!)
        RoomManager.getInstance().removeUser(this,this.spaceId!)
    }

    send(payload : any) {
        console.log("sending to", this.username);
        this.ws.send(JSON.stringify(payload));
    }
}