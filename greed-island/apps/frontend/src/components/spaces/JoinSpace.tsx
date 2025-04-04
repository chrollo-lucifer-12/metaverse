"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const JoinSpace = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [spaceCode, setSpaceCode] = useState("");

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="cursor-pointer bg-[#272729]">
                    Join Space
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-1 border-[#232325] text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 focus:shadow-blue-500/60">
                <DialogHeader>
                    <DialogTitle>Join a space</DialogTitle>
                </DialogHeader>
                <Input
                    ref={inputRef}
                    placeholder="Enter code for space"
                    value={spaceCode}
                    onChange={(e) => setSpaceCode(e.target.value)}
                />
                <Button
                    disabled={!spaceCode.trim()}
                    onClick={() => {
                        router.push(`/space/${spaceCode.trim()}`);
                    }}
                    className="cursor-pointer bg-white text-black hover:bg-white"
                >
                    Join
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default JoinSpace;
