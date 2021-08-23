import jwt from "jsonwebtoken";
import { User } from "../interfaces";
import config from "../config";
import { HttpException } from "../exceptions";

export const issueToken = async (identity: User) => {
  const token = jwt.sign(
    {
      identity,
    },
    config.jwtSecret as string,
    {
      algorithm: "HS512",
      expiresIn: "1w",
    }
  );
  return token;
};
