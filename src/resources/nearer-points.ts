import { coordinate } from "../types";
import { itemModel } from "../models";

export default async (
  model: any,
  coordinate: coordinate,
  limit: number,
  maxDis: number
): Promise<any[]> => {
  const documents = await itemModel.aggregate([
    {
      $geoNear: {
        spherical: true,
        maxDistance: 3000,
        near: {
          type: "Point",
          coordinates: [coordinate[1], coordinate[0]],
        },
        distanceField: "distance",
        key: "location",
      },
    },
    {
      $limit: 1,
    },
  ]);
  return documents;
};