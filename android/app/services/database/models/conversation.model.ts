export interface Conversation {
    id?: number;
    user_input: string;
    bot_response: string;
    language: string;
    timestamp?: Date;
}