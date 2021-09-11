import dotenv from "dotenv";
import App from "./app";
import config from "./config";
import { logger } from "./resources/logger";

dotenv.config();

const { app } = new App();
const port: number =
  process.env.NODE_ENV == "prod"
    ? parseInt(config.prodPort)
    : parseInt(config.devPort);

app.listen(port, () => {
  logger.info(`Server listening on ${port}`);
});
