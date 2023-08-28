import {Socket} from "socket.io";
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import registerChatHandler from "./SocketHandlers/Chat.handler";
import dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT ?? '0', 10) || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:3000';
const dev = process.env.NODE_ENV !== 'production'


const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer, {
    cors: {
        origin: clientOrigin,
        methods: ["GET", "POST"]
    }
});

const onConnection = (socket: Socket) => {
    registerChatHandler(io, socket);
}

io.on("connection", onConnection);


httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
})
