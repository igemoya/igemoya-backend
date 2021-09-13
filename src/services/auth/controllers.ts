import { Request, Response } from "express";
import axios from "axios";
import { HttpException } from "../../exceptions";
import { UserModel } from "../../models";
import { User } from "../../interfaces";
import { issueToken } from "../../resources/token";
import qs from "qs";
import config from "../../config";

const getKakaoToken = async (authCode: string): Promise<object> => {
  const data = {
    grant_type: "authorization_code",
    client_id: config.kakaoKey,
    redirectUri: config.kakaoRedirUri,
    code: authCode as string,
  };
  try {
    const token = await axios({
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: qs.stringify(data),
      url: "https://kauth.kakao.com/oauth/token",
    });
    return token.data;
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "토큰을 가져오는데 실패했습니다.");
  }
};

const getKakaoIdentity = async (accessToken: string): Promise<object> => {
  try {
    const kakaoIdentity = await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
      url: "https://kapi.kakao.com/v2/user/me",
    });
    return kakaoIdentity.data;
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "사용자 정보를 불러오는데 실패했습니다.");
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
