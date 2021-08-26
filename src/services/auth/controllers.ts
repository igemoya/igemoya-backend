import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { UserModel } from "../../models";
import { User, UserBase, Account } from "../../interfaces";
import { issueToken } from "../../resources/token";

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
