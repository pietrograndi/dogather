import express from "express";
import http from "http";
import cors from "cors";
import pino from "pino";
import { Server as socketIO } from "socket.io";
import dotenv from "dotenv";

dotenv.config({
  path: `../../.env.${process.env.NODE_ENV}`,
});

const app = express();
const logger = pino();
const port = process.env.WS_PORT || 8080;

const server = http.createServer(app);
app.use(cors());

const io = new socketIO(server, {
  transports: ["websocket", "polling"],
  cors: {
    origin: `http://localhost:${process.env.VITE_PORT}`,
    methods: ["GET", "POST", "OPTION"],
  },
});

app.get("/", (req, res) => {
  logger.debug(req);
  res.send();
});

try {
  io.on("connection", (socket) => {
    logger.info("connessione stabilita");
    socket.emit("init-room");

    socket.on("join-room", async ({ roomId }) => {
      logger.info(`evento join-room ${JSON.stringify(roomId)}`);
      await socket.join(roomId);
      const sockets = await io.in(roomId).fetchSockets();
      if (sockets.length <= 1) {
        io.to(`${socket.id}`).emit("first-in-room");
      } else {
        logger.info(`${socket.id} new-user emitted to room ${roomId}`);
        socket.broadcast.to(roomId).emit("new-user", socket.id);
        socket.broadcast.to(roomId).emit("users", sockets.length);
      }
    });

    socket.on("disconnect", () => {
      logger.info("un client si è disconnesso");
      // socket.leave(roomId as string);
      socket.removeAllListeners();
    });

    // socket.on("new-connection", async (roomId) => {
    //   logger.info(`roomId ${roomId}`);
    //   await socket.join(roomId);
    //   const sockets = await io.in(roomId).fetchSockets();
    //   if (sockets.length <= 1) {
    //     io.to(socket.id).emit("sei il primo!");
    //   } else {
    //     logger.info(`${socket.id} new user emited to room ${roomId}`);
    //     socket.broadcast.to(roomId).emit(`new user: ${socket.id}`);
    //     socket.broadcast.to(roomId).emit("users", sockets.length);
    //   }
    // });
  });
} catch (e) {
  console.error(e);
}

server.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
