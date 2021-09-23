import { coordinates } from "../types";
import { logger } from "./logger";

export default async (
  model: any,
  coordinates: coordinates,
  limit: number = 10000,
  options?: object
): Promise<any[]> => {
  const points = await model.aggregate([
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

  for (let i = 0; i < points.length; i++) {
    if (points[i].maxDistance < points[i].dist.calculated) {
      points.splice(i, 1);
    }
  }
  return points;
};
