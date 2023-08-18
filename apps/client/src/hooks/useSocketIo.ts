import { useEffect, useState } from "react";
import { socket } from "../collab/socket";
import { WS_EVENTS } from "../utils/app_constants";

export const useSocket = (roomId: string) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      socket.emit(WS_EVENTS.WS_NEW_CONNECTION, roomId);
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(data: string) {
      console.log(data);
    }
    socket.on(WS_EVENTS.WS_CONNECT, onConnect);
    socket.on(WS_EVENTS.WS_DISCONNECT, onDisconnect);
    socket.on(WS_EVENTS.WS_MESSAGE, onMessage);

    return () => {
      socket.off(WS_EVENTS.WS_CONNECT, onConnect);
      socket.off(WS_EVENTS.WS_DISCONNECT, onDisconnect);
      socket.off(WS_EVENTS.WS_MESSAGE, onMessage);
    };
  }, [roomId]);

  return { socket, isConnected };
};
