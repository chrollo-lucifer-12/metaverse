import { WebSocketServer } from 'ws';
import { User } from "./User";


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

    const user = new User(ws);

    ws.on('error', console.error);
    console.log("user joined");

    ws.on("close", async () => {
        await user.destroy();
    });

    ws.send('something');
});
