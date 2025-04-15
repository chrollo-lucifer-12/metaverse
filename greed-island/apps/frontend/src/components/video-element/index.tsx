"use client";
import { useEffect, useRef, useState } from "react";

const VideoElement = ({
                          socket,
                          myId,
                          usersInRoom,
                      }: {
    socket: WebSocket;
    myId: string;
    usersInRoom: { id: string }[];
}) => {
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
    const peerConnections = useRef<Record<string, RTCPeerConnection>>({});

    useEffect(() => {
        if (!socket) return;

        const handler = async (e: MessageEvent) => {
            const { type, payload } = JSON.parse(e.data);

            switch (type) {
                case "video-offer":
                    await handleOffer(payload.offer, payload.fromUserId);
                    break;
                case "video-answer":
                    await peerConnections.current[payload.fromUserId]?.setRemoteDescription(
                        new RTCSessionDescription(payload.answer)
                    );
                    break;
                case "ice-candidate":
                    await peerConnections.current[payload.fromUserId]?.addIceCandidate(
                        new RTCIceCandidate(payload.candidate)
                    );
                    break;
            }
        };

        socket.addEventListener("message", handler);
        return () => socket.removeEventListener("message", handler);
    }, [socket, myStream]);

    const handleOffer = async (offer: any, fromUserId: string) => {
        const pc = createPeerConnection(fromUserId);
        await pc.setRemoteDescription(new RTCSessionDescription(offer));

        if (myStream) {
            myStream.getTracks().forEach((track) => pc.addTrack(track, myStream));
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.send(
            JSON.stringify({
                type: "video-answer",
                payload: {
                    answer,
                    fromUserId: myId,
                },
            })
        );
    };

    const createPeerConnection = (userId: string) => {
        if (peerConnections.current[userId]) return peerConnections.current[userId];

        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                socket.send(
                    JSON.stringify({
                        type: "ice-candidate",
                        payload: {
                            candidate: e.candidate,
                            fromUserId: myId,
                        },
                    })
                );
            }
        };

        const stream = new MediaStream();
        setRemoteStreams((prev) => ({ ...prev, [userId]: stream }));

        pc.ontrack = (e) => {
            e.streams[0].getTracks().forEach((track) => stream.addTrack(track));
        };

        peerConnections.current[userId] = pc;
        return pc;
    };

    const shareVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);

        usersInRoom.forEach(async ({ id }) => {
            const pc = createPeerConnection(id);
            stream.getTracks().forEach((track) => pc.addTrack(track, stream));
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket.send(
                JSON.stringify({
                    type: "video-offer",
                    payload: {
                        offer,
                        fromUserId: myId,
                    },
                })
            );
        });
    };

    return (
        <div className="fixed bottom-4 right-4 absolute z-50 flex flex-wrap gap-2">
            <button onClick={shareVideo} className="bg-green-500 text-white px-2 py-1 rounded">
                Share Video
            </button>

            {myStream && (
                <video
                    autoPlay
                    playsInline
                    muted
                    className="w-28 h-20 border border-white"
                    ref={(video) => {
                        if (video) video.srcObject = myStream;
                    }}
                />
            )}

            {Object.entries(remoteStreams).map(([id, stream]) => (
                <video
                    key={id}
                    autoPlay
                    playsInline
                    className="w-28 h-20 border border-white"
                    ref={(video) => {
                        if (video) video.srcObject = stream;
                    }}
                />
            ))}
        </div>
    );
};

export default VideoElement;
