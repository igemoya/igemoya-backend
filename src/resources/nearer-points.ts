import { coordinate } from "../types";
import { itemModel } from "../models";

export default async (
  model: any,
  coordinate: coordinate,
  limit: number,
  maxDis: number
): Promise<any[]> => {
  const documents = await model.aggregate([
    {
      $geoNear: {
        spherical: true,
        maxDistance: maxDis,
        near: {
          type: "Point",
          coordinates: [coordinate[1], coordinate[0]],
        },
        distanceField: "distance",
        key: "location",
      },
    },
    {
      $limit: limit,
    },
  ]);
  return documents;
};
