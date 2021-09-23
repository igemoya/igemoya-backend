import { coordinates } from "../types";
import { logger } from "./logger";

export default async (
  model: any,
  coordinates: coordinates,
  limit: number = 10000,
  options?: object
): Promise<any[]> => {
  const documents = await model.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: coordinates,
        },
        distanceField: "dist.calculated",
        ...options,
      },
    },
    { $limit: limit },
  ]);
  let points: Array<any> = [];
  documents.forEach((e: any) => {
    if (e.maxDistance > e.dist.calculated) points.push(e);
  });
  return points;
};
