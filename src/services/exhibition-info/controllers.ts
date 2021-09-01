import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { exhibitionModel, itemModel, objectModel } from "../../models";
import { HttpStatus } from "../../types";

export const getExhibition = async (req: Request, res: Response) => {
  try {
    const exhibition = await exhibitionModel.findById(req.params.id);
    return res.json({ exhibition: exhibition });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const item = await itemModel.findById(req.params.id);
    return res.json({ item: item });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "아이템 조회에 실패했습니다."
    );
  }
};

export const getObject = async (req: Request, res: Response) => {
  try {
    const object = await objectModel.findById(req.params.id);
    return res.json({ object: object });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "오브젝트 조회에 실패했습니다."
    );
  }
};
