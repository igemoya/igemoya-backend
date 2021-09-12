import { Request, Response } from "express";
import axios from "axios";
import { HttpException } from "../../exceptions";
import { UserModel } from "../../models";
import { User, UserBase, Account } from "../../interfaces";
import { issueToken } from "../../resources/token";
import config from "../../config";
import { logger } from "../../resources/logger";
import QueryString from "qs";

const getKakaoToken = async (authCode: string): Promise<any> => {
  try {
    logger.info(authCode);
    const token = await axios({
      //token
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: QueryString.stringify({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_KEY,
        redirectUri: "https://igemoya-supervisor.herokuapp.com/oauth",
        code: authCode as string,
      }),
    });
    return token.data;
  } catch (e) {
    logger.error(e);
    if (e.name === "HttpException") throw e;
    throw new HttpException(401);
  }
};

const getKakaoIdentity = async (accessToken: string): Promise<any> => {
  try {
    const kakaoIdentity = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: QueryString.stringify({
        Authorization: `bearer ${accessToken}`,
      }),
    });
    logger.info(kakaoIdentity);
    return kakaoIdentity.data;
  } catch (e) {
    logger.info(e);
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "카카오 로그인에 실패했습니다.");
  }
};

export const echoIdentity = async (req: Request, res: Response) => {
  try {
    const authCode: string = req.query.code as string;
    const token = (await getKakaoToken(authCode)) as any;

    // const kakaoIdentity = (await getKakaoIdentity(authCode)) as any;

    return res.json({ token: token });
  } catch (e) {}
};

export const identifyUser = async (req: Request, res: Response) => {
  const account: Account = req.body;

  try {
    const identity: User = await UserModel.findOne({
      idx: account.idx,
    });
    if (!identity) {
      throw new Error("HttpException");
    }
    return res.json({ token: await issueToken(identity) });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "인증에 실패했습니다.");
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const userInfo: UserBase & Account = req.body;

  try {
    const userData = new UserModel(userInfo);
    return res.json({ token: await issueToken(await userData.save()) });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "회원가입에 실패했습니다.");
  }
};
function fetch(
  arg0: string,
  arg1: { method: string; headers: { "Content-Type": string }; body: string }
) {
  throw new Error("Function not implemented.");
}
