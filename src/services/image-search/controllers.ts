import { Request, Response } from "express";
import { imgMeta } from "../../interfaces";
import { imageMetaModel, itemModel } from "../../models";
import { HttpException } from "../../exceptions";
import { coordinates, HttpStatus } from "../../types";
import nearerPoints from "../../resources/nearer-points";
import { ObjectId } from "mongodb";
import { maxHeaderSize } from "http";

export const postImage = async (req: Request, res: Response) => {
  try {
    const imgMeta: imgMeta = { ...req.body, ...req.geoJSON };
    imageMetaModel.findOneAndUpdate(
      { _id: imgMeta.imgId },
      { location: imgMeta.location }
    );
    const points = await nearerPoints(
      itemModel,
      req.geoJSON.location.coordinates as coordinates,
      1
    );

    for (let i = 0; i < points.length; i++) {
      if (points[i].maxDistance < points[i].dist.calculated) {
        points.splice(i, 1);
      }
    }

    return res.json({ result: points });
  } catch (e) {
    throw new HttpException(HttpStatus.BadRequest, "아이템을 찾지 못했습니다.");
  }
};

export const dummeyRoute = (req: Request, res: Response) => {
  res.sendStatus(404);
};
