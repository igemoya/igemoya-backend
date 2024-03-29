import winston from "winston";
import WinstonDaily from "winston-daily-rotate-file";

const logDir = "logs";
const { combine, timestamp, printf } = winston.format;

const logFormat = printf(
  (info) => `${info.timestamp} ${info.level}: ${info.message}`
);

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new WinstonDaily({
      level: "http",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: "%DATE%.log",
      maxFiles: 30,
      zippedArchive: true,
    }),
    new WinstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: `${logDir}/error`,
      filename: "%DATE%.error.log",
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== undefined) {
  //텔그 봇 문제있어서 죽임 process.env.NODE_ENV !== dev
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
} else {
  logger.on("data", ({ level, message, timestamp: time }) => {
    if (!message.startsWith("[HttpException]") && level < 2) {
    }
  });
}

const httpLogStream = {
  write: (message: string) => {
    logger.http(message);
  },
};

export { logger, httpLogStream };
