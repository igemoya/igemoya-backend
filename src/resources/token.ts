import jwt from "jsonwebtoken";
import { User } from "../interfaces";
import config from "../config";
import { HttpException } from "../exceptions";

export const issueToken = async (
  payload: User,
  expires: number | string = "1w" //number인 경우 단위는 second, string은 days, w, h, m, d 등등
) => {
  const token = await jwt.sign(
    {
      payload,
    },
    config.jwtSecret as string,
    {
      algorithm: "HS512",
      expiresIn: expires,
    }
  );
  return token;
};

export const veriToken = async (token: string): Promise<User> => {
  try {
    const { payload }: any = await jwt.verify(
      token,
      config.jwtSecret as string
    );

    return payload;
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      throw new HttpException(401, "토큰이 만료되었습니다.");
    } else if (["jwt malformed", "invalid signature"].includes(e.message)) {
      throw new HttpException(401, "토큰이 변조되었습니다.");
    } else throw new HttpException(401, "토큰에 문제가 있습니다.");
  }
};
