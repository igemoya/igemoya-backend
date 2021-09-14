import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { veriToken } from "../../resources/token";

export const userInfo = async (req: Request, res: Response) => {
  try {
    const identity = req.user;

    return res.json({
      username: identity.username,
      profile_image: identity.profile_image,
    });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "사용자 정보를 불러오는데 실패했습니다.");
  }
};
