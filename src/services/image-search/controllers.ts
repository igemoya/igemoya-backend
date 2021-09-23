import { Request, Response } from "express";
import { imageMetaModel, itemModel } from "../../models";
import { HttpException } from "../../exceptions";
import { coordinates, HttpStatus } from "../../types";
import nearerPoints from "../../resources/nearer-points";
import { ObjectId } from "mongodb";

export const postImage = async (req: Request, res: Response) => {
  try {
    const points = await nearerPoints(
      itemModel,
      req.geoJSON.location.coordinates as coordinates
    );

    new imageMetaModel({
      uploader: req.user._id,
      model: points[0]._id,
      ...req.geoJSON,
    }).save();
    return res.json({ result: points[0] });
  } catch (e) {
    throw new HttpException(HttpStatus.BadRequest, "아이템을 찾지 못했습니다.");
  }
};

export const dummeyRoute = (req: Request, res: Response) => {
  res.sendStatus(404);
};
