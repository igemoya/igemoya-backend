import dotenv from 'dotenv';

const env = dotenv.config();
if (!env) throw new Error('env file not exist');

export default {
    port: process.env.SERVER_PORT!,
    telegramToken: process.env.TELEGRAM_TOKEN!,
    telegramChatID: process.env.TELEGRAM_CHATID!
}