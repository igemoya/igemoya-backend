import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { exhibitionModel, itemModel, objectModel } from "../../models";
import {
  ExhibitionIdentity,
  ItemIdentity,
  ObjectIdentity,
} from "../../interfaces";
import { logger } from "../../resources/logger";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../types";
import { Http } from "winston/lib/winston/transports";

export const registerExhibition = async (req: Request, res: Response) => {
  try {
    const exhibition: ExhibitionIdentity = req.body;
    exhibition.createdUser = req.user._id;
    exhibition.location.coordinate = [
      exhibition.location.coordinate[1],
      exhibition.location.coordinate[0],
    ];
    const newExhibition = new exhibitionModel(exhibition);
    res.json(await newExhibition.save());
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 등록에 실패했습니다.");
  }
};

export const myExhibitions = async (req: Request, res: Response) => {
  try {
    const exhibitions: ExhibitionIdentity[] = await exhibitionModel.find({
      createdUser: req.user._id,
    });
    res.json({ exhibitions: exhibitions });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
  }
};

export const registerItems = async (req: Request, res: Response) => {
  try {
    const items: ItemIdentity[] = req.body.items;
    const exhibition = await exhibitionModel.findOne({
      _id: req.body.exhibitionId,
    });
    if (exhibition.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 전시를 수정하기 위해 필요한 권한이 없습니다."
      );
    }
    items.forEach((v: ItemIdentity) => {
      v.exhibitionId = req.body.exhibitionId;
      v.createdUser = exhibition.createdUser;
      new itemModel(v).save();
    });
    res.sendStatus(HttpStatus.Created);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
  }
};

export const registerObjects = async (req: Request, res: Response) => {
  try {
    const objects: ObjectIdentity[] = req.body.objects;
    const item = await itemModel.findOne({
      _id: req.body.itemId,
    });
    if (item.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 전시를 수정하기 위해 필요한 권한이 없습니다."
      );
    }
    objects.forEach((v: ObjectIdentity) => {
      v.itemId = req.body.itemId;
      new objectModel(v).save();
    });
    res.sendStatus(HttpStatus.Created);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.NotFound, "전시 조회에 실패했습니다.");
  }
};
