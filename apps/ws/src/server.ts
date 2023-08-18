import express from "express";
import http from "http";
import cors from "cors";
import pino from "pino";
import { Server as socketIO } from "socket.io";

const app = express();
const logger = pino();
const port = 31337;

const server = http.createServer(app);
app.use(cors());

const io = new socketIO(server, {
  transports: ["websocket", "polling"],
  cors: {
    origin: "http://localhost:3000",
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
    io.to(socket.id).emit("init-room");
    socket.on("join-room", async (roomId) => {
      logger.info(`${socket.id} è entrato nella stanza ${roomId}`);
    });

    socket.on("disconnect", () => {
      logger.info("un client si è disconnesso");
    });

    socket.on("new-room", (data) => {
      logger.info(data);
    });

    socket.on("message", (d) => {
      logger.info(d);
    });

    socket.on("new-connection", async (roomId) => {
      logger.info(`roomId ${roomId}`);
      await socket.join(roomId);
      const sockets = await io.in(roomId).fetchSockets();
      if (sockets.length <= 1) {
        io.to(socket.id).emit("sei il primo!");
      } else {
        logger.info(`${socket.id} new user emited to room ${roomId}`);
        socket.broadcast.to(roomId).emit(`new user: ${socket.id}`);
      }
    });
  });
} catch (e) {
  console.error(e);
}

server.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
