import TelegramBot from 'node-telegram-bot-api';
import config from '../config';

const token = config.telegramToken;
const chatID = parseInt(config.telegramChatID);

const bot = new TelegramBot(token, { polling: true });

export const sendTGMessage = async (text: string) => {
    await bot.sendMessage(chatID, text);
}