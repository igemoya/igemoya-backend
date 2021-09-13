import { Request, Response } from "express";
import axios from "axios";
import { HttpException } from "../../exceptions";
import { UserModel } from "../../models";
import { User, UserBase, Account } from "../../interfaces";
import { issueToken } from "../../resources/token";
import qs from "qs";
import config from "../../config";
import { logger } from "../../resources/logger";

const getKakaoToken = async (authCode: string): Promise<any> => {
  try {
    const token = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_KEY,
        redirectUri: "https://igemoya-supervisor.herokuapp.com/oauth",
        code: authCode as string,
      }),
    });
    return token.data;
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, e);
  }
};

const getKakaoIdentity = async (accessToken: string): Promise<any> => {
  try {
    const kakaoIdentity = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });

    return kakaoIdentity.data;
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "카카오 로그인에 실패했습니다.");
  }
};

export const login = async (req: Request, res: Response) => {
  const authCode: string = req.query.code as string;
  const token = (await getKakaoToken(authCode)) as any;
  const kakaoIdentity = (await getKakaoIdentity(token.access_token)) as any;
  try {
    const identity: User = await UserModel.findOne({ idx: kakaoIdentity.id });
    const me: User = identity
      ? identity
      : await (async (): Promise<User> => {
          const userIdentity = new UserModel({
            idx: kakaoIdentity.id,
            username: kakaoIdentity.properties.nickname as string,
            name: kakaoIdentity.properties.nickname as string,
            userType: "Audience",
          });
          return await userIdentity.save();
        })();

    return res.json({ me: me, jwt: await issueToken(me) });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "로그인 또는 회원가입에 실패했습니다.");
  }
};
