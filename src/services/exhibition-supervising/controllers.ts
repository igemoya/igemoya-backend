import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { exhibitionModel } from "../../models";
import { ExhibitionIdentity, ItemIdentity } from "../../interfaces";

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
    throw new HttpException(401, "전시 등록에 실패했습니다.");
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
    throw new HttpException(401, "전시 조회에 실패했습니다.");
  }
};

export const registerItems = async (req: Request, res: Response) => {
  try {
    const items: ItemIdentity[] = req.body.items;
    const exhibition = await exhibitionModel.findById(req.body.exhibitionId);
    if (exhibition.createdUser !== req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        401,
        "해당 라우트에 접근하기 위해 필요한 권한이 없습니다."
      );
    }
    items.forEach((v) => {
      exhibition.items.push(v);
    });
    res.json({ exhibition: await exhibition.save() });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(401, "전시 조회에 실패했습니다.");
  }
};
