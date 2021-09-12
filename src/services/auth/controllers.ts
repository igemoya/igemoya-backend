import { Request, Response } from "express";
import axios from "axios";
import { HttpException } from "../../exceptions";
import { UserModel } from "../../models";
import {
  User,
  UserBase,
  Account,
  KakaoIdentity,
  KakaoToken,
} from "../../interfaces";
import { issueToken } from "../../resources/token";
import config from "../../config";
import { logger } from "../../resources/logger";

const getKakaoToken = async (authCode: string): Promise<object> => {
  try {
    const token = await axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      data: {
        grant_type: "authorization_code",
        client_id: config.kakaoKey,
        redirect_uri: "https://igemoya-supervisor.herokuapp.com",
        code: authCode,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return token;
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "토큰 요청에 실패했습니다.");
  }
};

const getKakaoIdentity = async (accessToken: string): Promise<object> => {
  try {
    const kakaoIdentity = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return kakaoIdentity;
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "카카오 로그인에 실패했습니다.");
  }
};

export const echoIdentity = async (req: Request, res: Response) => {
  try {
    const authCode: string = req.query.code as string;
    logger.info(authCode);
    const token = (await getKakaoToken(authCode)) as KakaoToken;

    const kakaoIdentity = (await getKakaoIdentity(
      token.access_token as string
    )) as KakaoIdentity;

    return res.json({ token: token, kakaoId: kakaoIdentity });
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
