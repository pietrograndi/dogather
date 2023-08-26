import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { WS_EVENTS } from "../utils/app_constants";

const wsAddress = `${process.env.WS_BASE_URL}:${process.env.WS_PORT}`;

type useSocketType = {
  isConnected: boolean;
  socket: Socket | null;
};

export const useSocket = (roomId: string | undefined): useSocketType => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = roomId && !isConnected ? io(wsAddress) : null;

    function onConnect() {
      console.log("⚡ connect!");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("🔌 disconnect!");
      setIsConnected(false);
    }

    socketRef.current?.on(WS_EVENTS.WS_CONNECT, onConnect);
    socketRef.current?.on(WS_EVENTS.WS_DISCONNECT, onDisconnect);

    return () => {
      socketRef.current?.off(WS_EVENTS.WS_CONNECT, onConnect);
      socketRef.current?.off(WS_EVENTS.WS_DISCONNECT, onDisconnect);
    };
  }, [roomId, isConnected]);

  return { isConnected, socket: socketRef.current };
};
