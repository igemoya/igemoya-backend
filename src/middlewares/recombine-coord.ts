import { NextFunction, Request, Response } from "express";
import { geoJSON } from "../interfaces";
import { logger } from "../resources/logger";

const recombineCoord = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.location) {
    //body.location이 없을 경우 Bypass
    return next();
  }
  if (!(req.body.location.type == "Point")) {
    //body.location의 type이 Point가 아닐 경우 좌표만 그대로 옮김
    const geojson: geoJSON = {
      location: {
        type: "Polygon",
        coordinate: req.body.location.coordinate,
      },
    };
    req.geoJSON = geojson;
    return next();
  }

  //body.location의 type이 Point이면 좌표 swap

  const geojson: geoJSON = {
    location: {
      type: "Point",
      coordinate: [
        req.body.location?.coordinate[1],
        req.body.location?.coordinate[0],
      ],
    },
    maxDistance: req.body.location.maxDistance
      ? req.body.location.maxDistance
      : 500,
  };

  req.geoJSON = geojson;

  logger.info(req.geoJSON);

  return next();
};

export default recombineCoord;