import {Server, Socket} from "socket.io";
import {OpenAiService} from "../Services/OpenAi.service";

export default function registerChatHandler (io: Server, socket: Socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('connect', () => {
        console.log('user connected');
        socket.emit('loading','done')
    })
    socket.emit('loading','done')
    socket.on('chat', async (data: string) => {
        socket.emit('loading','loading');
        const {message,history} = JSON.parse(data);
        const response = await OpenAiService.getInstance().getCompletionFromConversation(message, history);

        socket.emit('loading','done');
        socket.emit('chat',response);
    });

}
