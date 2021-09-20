import { Request, Response } from "express";
import { imgMeta } from "../../interfaces";
import { imageMetaModel, itemModel } from "../../models";
import { HttpException } from "../../exceptions";
import { HttpStatus } from "../../types";

export const postImage = async (req: Request, res: Response) => {
  try {
    const imgMeta: imgMeta = { ...req.body, ...req.geoJSON };
    imageMetaModel.findOneAndUpdate(
      { _id: imgMeta.imgId },
      { location: imgMeta.location }
    );
  } catch (e) {
    throw new HttpException(HttpStatus.BadRequest, "아이템을 찾지 못했습니다.");
  }
};

export const dummeyRoute = (req: Request, res: Response) => {
  res.sendStatus(404);
};
