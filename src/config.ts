import dotenv from "dotenv";

const env = dotenv.config();
if (!env) throw new Error(".env file not exist");

export default {
  prodPort: process.env.PORT!, //HEROKU 제공 enviornment
  devPort: process.env.SERVER_PORT_DEV!,
  telegramToken: process.env.TELEGRAM_TOKEN!,
  telegramChatID: process.env.TELEGRAM_CHATID!,
  mongoURI: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  logExpires: process.env.LOG_EXPIRES!,
  kakaoKey: process.env.KAKAO_REST_KEY!,
  kakaoRedirUri: process.env.KAKAO_REDIR_URI!,
};
