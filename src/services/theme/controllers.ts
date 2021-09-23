import { themeModel } from "../../models";
import { Theme } from "../../interfaces";
import { Request, Response } from "express";
import { coordinates, HttpStatus } from "../../types";
import { HttpException } from "../../exceptions";
import nearerPoints from "../../resources/nearer-points";

export const createTheme = async (req: Request, res: Response) => {
  try {
    const theme: Theme = {
      createdUser: req.user._id,
      ...req.body,
      ...req.geoJSON,
    };
    await new themeModel(theme).save();

    return res.sendStatus(HttpStatus.Created);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "테마 등록에 실패했습니다.");
  }
};

export const updateTheme = async (req: Request, res: Response) => {
  try {
    const theme = await themeModel.findOne({ _id: req.params.id });
    if (theme.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 테마를 수정하기 위해 필요한 권한이 없습니다."
      );
    }

    await themeModel.updateOne(
      { _id: req.body.themeId },
      { ...req.body.theme, ...req.geoJSON }
    );
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "테마 수정에 실패했습니다.");
  }
};

export const deleteTheme = async (req: Request, res: Response) => {
  try {
    const theme = await themeModel.findOne({ _id: req.body.themeId });
    if (theme.createdUser != req.user._id) {
      //전시를 등록한 사용자와 현재 접근하는 사용자가 같은지 검증
      throw new HttpException(
        HttpStatus.Unauthorized,
        "해당 테마를 수정하기 위해 필요한 권한이 없습니다."
      );
    }

    await themeModel.deleteOne({ _id: req.params.id });
    res.sendStatus(HttpStatus.OK);
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "테마 삭제에 실패했습니다.");
  }
};

export const getTheme = async (req: Request, res: Response) => {
  try {
    return res.json({
      theme: await themeModel.findOne({ _id: req.params.id }),
    });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "테마 조회에 실패했습니다.");
  }
};

export const getAllTheme = async (req: Request, res: Response) => {
  try {
    return res.json({
      theme: await themeModel.find(),
    });
  } catch (e) {
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "테마 조회에 실패했습니다.");
  }
};

export const nearerTheme = async (req: Request, res: Response) => {
  try {
    const points = await nearerPoints(
      themeModel,
      req.geoJSON.location.coordinates as coordinates
    );
    return res.json({ themes: points });
  } catch (e) {
    throw e;
    if (e.name === "HttpException") throw e;
    throw new HttpException(HttpStatus.BadRequest, "테마 조회에 실패했습니다.");
  }
};

export const dummeyRoute = (req: Request, res: Response) => {
  res.sendStatus(404);
};
