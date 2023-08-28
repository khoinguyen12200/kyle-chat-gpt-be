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
exports.OpenAiService = void 0;
const openai_1 = require("openai");
class OpenAiService {
    constructor() {
        this.openAi = new openai_1.OpenAIApi(new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        }));
    }
    static getInstance() {
        if (!OpenAiService.instance) {
            OpenAiService.instance = new OpenAiService();
        }
        return OpenAiService.instance;
    }
    getCompletion(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openAi.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages: messages
                });
                return response.data.choices[0].message.content;
            }
            catch (e) {
                return "Sorry, something went wrong.";
            }
        });
    }
    getCompletionFromConversation(message, history) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = [
                { role: 'system', content: "You are a chat bot and your name is KyleChatGPT, here is the history of conversation: " + JSON.stringify(history) + " answer the following question from user: " },
                { role: 'user', content: message }
            ];
            return yield this.getCompletion(messages);
        });
    }
}
exports.OpenAiService = OpenAiService;
