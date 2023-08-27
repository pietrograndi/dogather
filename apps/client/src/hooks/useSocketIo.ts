import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { WS_EVENTS } from "../utils/app_constants";

const wsAddress = `${process.env.WS_BASE_URL}:${process.env.WS_PORT}`;

export const useSocket = (
  roomId: string | undefined,
  setConnection: (connected: boolean) => void,
  startCollaboration: () => void
) => {
  const socketRef = useRef<Socket | null>();

  const disconnect = () => {
    socketRef.current?.disconnect();
  };

  useEffect(() => {
    socketRef.current = roomId ? io(wsAddress, { query: { roomId } }) : null;

    socketRef.current?.on(WS_EVENTS.WS_CONNECT, () => {
      setConnection(true);
      socketRef.current?.emit(WS_EVENTS.WS_JOIN_ROOM, { roomId });
    });
    socketRef.current?.on(WS_EVENTS.WS_DISCONNECT, () => {
      setConnection(false);
    });
    socketRef.current?.on("first-in-room", () => {
      console.log("PRIMO!");
    });

    return () => {
      socketRef.current?.off(WS_EVENTS.WS_DISCONNECT);
      socketRef.current?.off(WS_EVENTS.WS_CONNECT);
      socketRef.current?.disconnect();
    };
  }, [roomId, setConnection]);

  return {
    disconnect,
  };
};
