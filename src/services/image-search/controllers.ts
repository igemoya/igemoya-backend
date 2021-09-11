import { Request, Response } from "express";
import { imgMeta, imgserverMeta } from "../../interfaces";
import { imageMetaModel, exhibitionModel, itemModel } from "../../models";
import { veriToken } from "../../resources/token";
import { HttpException } from "../../exceptions";
import { HttpStatus } from "../../types";

export const postImage = async (req: Request, res: Response) => {
  const meta: imgMeta = req.body;
  const imgMeta = await veriToken(meta.imgToken);

  meta.location.coordinate = [
    meta.location.coordinate[1],
    meta.location.coordinate[0],
  ];

  // imageMetaModel.updateOne({ _id: imgMeta. }, { location: meta.location });
  // try {
  //   const exhibition = (
  //     await exhibitionModel.aggregate([
  //       {
  //         $geoNear: {
  //           spherical: true,
  //           maxDistance: 3000,
  //           near: {
  //             type: "Point",
  //             coordinates: [
  //               meta.location.coordinate[0],
  //               meta.location.coordinate[1],
  //             ],
  //           },
  //           distanceField: "distance",
  //           key: "location",
  //         },
  //       },
  //       {
  //         $limit: 1,
  //       },
  //     ])
  //   )[0];
  // } catch (e) {
  //   throw new HttpException(HttpStatus.BadRequest, "전시를 찾지 못했습니다.");
  // }
  try {
    const items = await itemModel.aggregate([
      {
        $geoNear: {
          spherical: true,
          maxDistance: 3000,
          near: {
            type: "Point",
            coordinates: [
              meta.location.coordinate[0],
              meta.location.coordinate[1],
            ],
          },
          distanceField: "distance",
          key: "location",
        },
      },
      {
        $limit: 3,
      },
    ]);
  } catch (e) {
    throw new HttpException(HttpStatus.BadRequest, "아이템을 찾지 못했습니다.");
  }
};

export const dummeyRoute = (req: Request, res: Response) => {
  res.sendStatus(404);
};
