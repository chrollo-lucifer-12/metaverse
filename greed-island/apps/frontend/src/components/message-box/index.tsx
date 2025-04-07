"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {createMessage, fetchMessage} from "@/actions/elements";
import {MessageProps} from "@/types";
import {useMutationData} from "@/hooks/useMutationData";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";

const MessageBox = ({spaceId, userId} : {spaceId : string, userId : string})  => {
    const {data} = useQueryData(["space-messages"], () => fetchMessage(spaceId));
    const {mutate,isPending} = useMutationData(["create-message"], (data) => createMessage(spaceId, userId, data.content))
    const messages = data as MessageProps;
    const [currentMessage, setCurrentMessage] = useState<string>("");

    return <div>
        <div>
            {
                messages.map((message) => (
                    <div>

                    <p>{message.content}</p>
                        <p>{message.createdAt.toISOString()}</p>
                        <p>{message.user.username}</p>
                    </div>
                ))
            }
        </div>
        <Input value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}} />
        <Button
            disabled={!currentMessage}
            onClick={() => {
                mutate({content : currentMessage})
            }}
        >
            {
                isPending ? "sending" : "Send"
            }
        </Button>
    </div>

}

export default MessageBox