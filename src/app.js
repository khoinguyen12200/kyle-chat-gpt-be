"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const Chat_handler_1 = __importDefault(require("./SocketHandlers/Chat.handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '0', 10) || 3000;
const clientOrigin = (_b = process.env.CLIENT_ORIGIN) !== null && _b !== void 0 ? _b : 'http://localhost:3000';
const dev = process.env.NODE_ENV !== 'production';
const server = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(server);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: clientOrigin,
        methods: ["GET", "POST"]
    }
});
const onConnection = (socket) => {
    (0, Chat_handler_1.default)(io, socket);
};
io.on("connection", onConnection);
httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
