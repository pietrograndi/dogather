export const STORAGE_KEYS = {
  LOCAL_STORAGE_ELEMENTS: "dogather",
} as const;

export const WS_EVENTS = {
  WS_CONNECT: "connect",
  WS_DISCONNECT: "disconnect",
  WS_JOIN_ROOM: "join-room",
  WS_FIRST_IN_ROOM: "first-in-room",
  WS_NEW_USER: "new-user",
} as const;
