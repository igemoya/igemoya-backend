import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { exhibitionModel, itemModel, objectModel } from "../../models";
import {
  ExhibitionIdentity,
  ItemIdentity,
  ObjectIdentity,
} from "../../interfaces";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../types";
import { logger } from "../../resources/logger";

export const registerExhibition = async (req: Request, res: Response) => {
  try {
    const exhibition: ExhibitionIdentity = {
      createdUser: req.user._id,
      ...req.body,
      ...req.geoJSON,
    };
    const newExhibition = new exhibitionModel(exhibition);
    await newExhibition.save();
    return res.sendStatus(HttpStatus.Created);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 등록에 실패했습니다.");
  }
};

export const registerItems = async (req: Request, res: Response) => {
  try {
    const item: ItemIdentity = {
      createdUser: req.user._id,
      ...req.body,
      ...req.geoJSON,
    };
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
    new itemModel(item).save();
    res.sendStatus(HttpStatus.Created);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
  }
};

export const registerObjects = async (req: Request, res: Response) => {
  try {
    const object: ObjectIdentity = {
      createdUser: req.user._id,
      ...req.body,
    };
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
    new objectModel(object).save();
    res.sendStatus(HttpStatus.Created);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.NotFound,
      "오브젝트 등록에 실패했습니다."
    );
  }
};

export const updateExhibition = async (req: Request, res: Response) => {
  try {
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
    await exhibitionModel.updateOne(
      { _id: req.body.exhibitionId },
      req.body.exhibition
    );
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 수정에 실패했습니다.");
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const item = await itemModel.findOne({
      _id: req.body.exhibitionId,
    });
    if (item.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 아이템을 수정하기 위해 필요한 권한이 없습니다."
      );
    }
    await itemModel.updateOne({ _id: req.body.itemId }, req.body.item);
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "아이템 수정에 실패했습니다."
    );
  }
};

export const updateObject = async (req: Request, res: Response) => {
  try {
    const item = await objectModel.findOne({
      _id: req.body.objectId,
    });
    if (item.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 오브젝트를 수정하기 위해 필요한 권한이 없습니다."
      );
    }
    await objectModel.updateOne({ _id: req.body.objectId }, req.body.object);
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "오브젝트 수정에 실패했습니다."
    );
  }
};

export const getAllExhibitions = async (req: Request, res: Response) => {
  try {
    const exhibitions: ExhibitionIdentity[] = await exhibitionModel.find({
      createdUser: req.user._id,
    });
    return res.json({ exhibitions: exhibitions });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 조회에 실패했습니다.");
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items: ItemIdentity[] = await itemModel.find({
      createdUser: new ObjectId(req.user._id),
      exhibitionId: new ObjectId(req.params.id),
    });
    return res.json({ items: items });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "아이템 조회에 실패했습니다."
    );
  }
};

export const getAllObjects = async (req: Request, res: Response) => {
  try {
    const objects: ObjectIdentity[] = await objectModel.find({
      createdUser: new ObjectId(req.user._id),
      itemId: new ObjectId(req.params.id),
    });
    return res.json({ objects: objects });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "오브젝트 조회에 실패했습니다."
    );
  }
};

export const deleteExhibition = async (req: Request, res: Response) => {
  try {
    const exhibition = await exhibitionModel.findOne({
      _id: req.params.id,
    });
    if (exhibition.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 전시를 수정하기 위해 필요한 권한이 없습니다."
      );
    }

    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "전시 삭제에 실패했습니다.");
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await itemModel.findOne({
      _id: req.params.id,
    });
    if (item.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 아이템을 수정하기 위해 필요한 권한이 없습니다."
      );
    }
    await itemModel.deleteOne({ _id: req.params.id });
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "아이템 삭제에 실패했습니다."
    );
  }
};

export const deleteObject = async (req: Request, res: Response) => {
  try {
    const item = await objectModel.findOne({
      _id: req.params.id,
    });
    if (item.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 오브젝트를 수정하기 위해 필요한 권한이 없습니다."
      );
    }
    await objectModel.deleteOne({ _id: req.params.id });
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(
      HttpStatus.BadRequest,
      "오브젝트 삭제에 실패했습니다."
    );
  }
};
