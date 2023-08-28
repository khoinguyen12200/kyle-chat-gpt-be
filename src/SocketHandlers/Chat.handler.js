"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OpenAi_service_1 = require("../Services/OpenAi.service");
function registerChatHandler(io, socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('connect', () => {
        console.log('user connected');
        socket.emit('loading', 'done');
    });
    socket.emit('loading', 'done');
    socket.on('chat', (data) => __awaiter(this, void 0, void 0, function* () {
        socket.emit('loading', 'loading');
        const { message, history } = JSON.parse(data);
        const response = yield OpenAi_service_1.OpenAiService.getInstance().getCompletionFromConversation(message, history);
        socket.emit('loading', 'done');
        socket.emit('chat', response);
    }));
}
exports.default = registerChatHandler;
