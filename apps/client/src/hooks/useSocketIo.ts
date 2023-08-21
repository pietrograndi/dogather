import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { WS_EVENTS } from "../utils/app_constants";

export const useSocket = (roomId: string | null) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() {
      console.log("try to connect");
      socket.emit(WS_EVENTS.WS_NEW_CONNECTION, roomId);
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(data: string) {
      console.log(data);
    }

    roomId && socket.on(WS_EVENTS.WS_CONNECT, onConnect);
    roomId && socket.on(WS_EVENTS.WS_DISCONNECT, onDisconnect);
    roomId && socket.on(WS_EVENTS.WS_MESSAGE, onMessage);

    return () => {
      socket.off(WS_EVENTS.WS_CONNECT, onConnect);
      socket.off(WS_EVENTS.WS_DISCONNECT, onDisconnect);
      socket.off(WS_EVENTS.WS_MESSAGE, onMessage);
    };
  }, [roomId]);

  return { socket, isConnected };
};
