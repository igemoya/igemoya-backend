import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { UserModel } from "../../models";
import { User, Account } from "../../interfaces";
import { issueToken } from "../../resources/token";

export const identifyUser = async (req: Request, res: Response) => {
  const account: Account = req.body;

  try {
    const identity: User = (await UserModel.findOne({
      idx: account.idx,
    })) as User;
    return res.json({ token: await issueToken(identity) });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "인증에 실패했습니다.");
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const userInfo: User & Account = req.body;

  try {
    const userData = new UserModel({
      idx: userInfo.idx,
      username: userInfo.username,
      name: userInfo.name,
      userType: userInfo.userType,
    });
    return res.json({ token: await issueToken(await userData.save()) });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "회원가입에 실패했습니다.");
  }
};
