import {OpenAIApi, Configuration} from 'openai';


export class OpenAiService {
    private static instance: OpenAiService;
    private openAi: OpenAIApi;

    private constructor() {
        this.openAi = new OpenAIApi(new Configuration(
            {
                apiKey: process.env.OPENAI_API_KEY,
            }
        ));
    }

    public static getInstance(): OpenAiService {
        if (!OpenAiService.instance) {
            OpenAiService.instance = new OpenAiService();
        }

        return OpenAiService.instance;
    }

    public async getCompletion(messages: any): Promise<string> {
        try {
            const response = await this.openAi.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            }) as any;

            return response.data.choices[0].message.content;
        } catch (e: any) {
            return "Sorry, something went wrong.";
        }
    }

    public async getCompletionFromConversation(message: string, history: any): Promise<string> {
        const messages = [
            {role: 'system', content: "You are a chat bot and your name is KyleChatGPT, here is the history of conversation: "+JSON.stringify(history)+" answer the following question from user: "},
            {role: 'user', content: message}
        ];
        return await this.getCompletion(messages);
    }
}