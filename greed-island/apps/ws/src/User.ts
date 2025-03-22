import {WebSocket} from "ws"
import {RoomManager} from "./RoomManager";
import {OutgoingMessage} from "./types";

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
    private ws : WebSocket

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.id = generateRandomString(12);
    }

    initHandlers () {
        this.ws.on("message", (data) => {
            const parsedData = JSON.parse(data.toString());
            switch (parsedData.type) {
                case "join":
                    const spaceId = parsedData.payload.spaceId,clerkId = parsedData.payload.clerkId;
                    RoomManager.getInstance().addUser(spaceId,this)
                    this.send({
                        type : "join",
                        payload : {

                        }
                    })
                case "move":
                default:
                    break
            }
        })
    }

    send(payload : OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }

}