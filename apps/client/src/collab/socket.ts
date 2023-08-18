import { io } from "socket.io-client";

const URL = "http://localhost:31337";

export const socket = io(URL);
