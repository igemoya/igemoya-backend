import { coordinates } from "../types";

export default async (
  model: any,
  coordinates: coordinates,
  limit: number,
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
  return documents;
};
