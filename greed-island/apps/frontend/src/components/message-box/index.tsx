"use client"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {MessageProps} from "@/types";

const MessageBox = ({spaceId, userId, socket, messages } : {spaceId : string, userId : string, socket : WebSocket, messages : MessageProps})  => {

    const [allMessages, setAllMessages] = useState(messages ?? []);
    const [currentMessage, setCurrentMessage] = useState<string>("");

    useEffect(() => {
        const messageHandler = (e : any) => {
            const parsedData = JSON.parse(e.data);
            console.log("chat");
            if (parsedData.type === "chat") {
                setAllMessages(prevState => [parsedData.payload,...prevState]);
            }
        }

        socket.addEventListener("message", messageHandler);

        return () => {
            socket.removeEventListener("message", messageHandler);
        }
    },[spaceId]);

    console.log(allMessages);

    return <div className={"bg-black flex flex-col gap-y-3 text-white border-1 border-[#1c1b1e] absolute z-20 rounded-md"}>
        <div className={"h-[100px] bg-[#18181a] m-3 p-2 rounded-md overflow-auto"}>
            {
                allMessages.map((message,i) => (
                    <p key={i} className={"text-xs"}> {message.content}</p>
                ))
            }
        </div>
        <div className={"flex gap-x-3 p-2"}>
        <Input className={"w-[70%] border-1 border-blue-200"} value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}} />
        <Button
            className={"bg-white text-black hover:bg-white cursor-pointer "}
            onClick={() => {
                socket.send(JSON.stringify({
                    type : "chat",
                    payload : {
                        content : currentMessage
                    }
                }))
            }}
        >
            send
        </Button>
        </div>
    </div>

}

export default MessageBox