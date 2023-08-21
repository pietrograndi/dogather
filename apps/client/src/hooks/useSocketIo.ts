import { useEffect, useRef, useState } from "react";
// import { socket } from "../utils/socket";
// import { WS_EVENTS } from "../utils/app_constants";
import {io, Socket } from 'socket.io-client'
import { WS_EVENTS } from "../utils/app_constants";

const URL = "http://localhost:31337";

export const useSocket = (roomId:string|null) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected ] = useState(false) 

  useEffect(() => {
    debugger
    socketRef.current = (roomId && socketRef.current === null) ? io(URL, {query: {
      roomId
    }}) : null

    function onConnect() {
      console.log('connect!')
      setIsConnected(true)
    }
    
    function onDisconnect() {
      console.log('disconnect')
      setIsConnected(false)
      socketRef.current = null
    }

    socketRef.current?.on(WS_EVENTS.WS_CONNECT, onConnect)
    socketRef.current?.on(WS_EVENTS.WS_DISCONNECT, onDisconnect)

    return () => {
      socketRef.current?.off(WS_EVENTS.WS_CONNECT,onConnect)
      socketRef.current?.off(WS_EVENTS.WS_DISCONNECT, onDisconnect)
    }

  }, [roomId])
  
  return { isConnected, socket: socketRef.current }
}


// export const useSocket = (roomId: string | null) => {
//   const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(() => {
//     function onConnect() {
//       console.log("try to connect");
//       socket.emit(WS_EVENTS.WS_NEW_CONNECTION, roomId);
//       setIsConnected(true);
//     }
//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     function onMessage(data: string) {
//       console.log(data);
//     }

//     roomId && socket.on(WS_EVENTS.WS_CONNECT, onConnect);
//     roomId && socket.on(WS_EVENTS.WS_DISCONNECT, onDisconnect);
//     roomId && socket.on(WS_EVENTS.WS_MESSAGE, onMessage);

//     return () => {
//       socket.off(WS_EVENTS.WS_CONNECT, onConnect);
//       socket.off(WS_EVENTS.WS_DISCONNECT, onDisconnect);
//       socket.off(WS_EVENTS.WS_MESSAGE, onMessage);
//     };
//   }, [roomId]);

//   return { socket, isConnected };
// };
