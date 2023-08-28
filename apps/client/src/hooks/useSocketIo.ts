import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { ioEvents, UpdateActions } from '@lib/shared'
import { updateReducer } from "../collab/updateReducer";

const wsAddress = `${process.env.WS_BASE_URL}:${process.env.WS_PORT}`;

export const useSocket = (
  roomId: string | undefined,
  setConnection: (connected: boolean) => void,
) => {
  const socketRef = useRef<Socket | null>();

  const disconnect = () => {
    socketRef.current?.disconnect();
  };

  useEffect(() => {
    socketRef.current = roomId ? io(wsAddress, { query: { roomId } }) : null;

    socketRef.current?.on(ioEvents.WS_CONNECT, () => {
      setConnection(true);
      socketRef.current?.emit(ioEvents.WS_JOIN_ROOM, { roomId });
    });
    
    socketRef.current?.on(ioEvents.WS_DISCONNECT, () => {
      setConnection(false);
    });

    socketRef.current?.on(ioEvents.WS_UPDATE,(data:UpdateActions) => {
      updateReducer(data)
    })

    return () => {
      socketRef.current?.off(ioEvents.WS_DISCONNECT);
      socketRef.current?.off(ioEvents.WS_CONNECT);
      socketRef.current?.disconnect();
    };
  }, [roomId, setConnection]);

  return {
    disconnect,
  };
};
