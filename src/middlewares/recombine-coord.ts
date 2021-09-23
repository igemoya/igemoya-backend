import { NextFunction, Request, Response } from "express";
import { logger } from "../resources/logger";
import { geoJSON } from "../interfaces";
import { coordinates } from "../types";

const recombineCoord = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.location) {
    //body.location이 없을 경우 Bypass
    return next();
  } else if (!(req.body.location.type == "Point")) {
    //body.location의 type이 Poligon일 경우 좌표 swap 후 옮김
    const coordinates = req.body.location.coordinates;

    for (let i = 0; i < coordinates.length; i++) {
      coordinates[i] = [coordinates[i][1], coordinates[i][0]];
    }

    const geojson: geoJSON = {
      location: {
        type: "Polygon",
        coordinates: coordinates,
      },
    };
    req.geoJSON = geojson;

    const body = req.body;
    delete body.location;
    req.body = body;

    return next();
  }

  //body.location의 type이 Point이면 좌표 swap

  const geojson: geoJSON = {
    location: {
      type: "Point",
      coordinates: [
        parseFloat(req.body.location?.coordinates[1].toFixed(8)),
        parseFloat(req.body.location?.coordinates[0].toFixed(8)),
      ] as coordinates,
    },
    maxDistance: req.body.location.maxDistance
      ? req.body.location.maxDistance
      : (500 as number),
  };

  req.geoJSON = geojson;
  const body = req.body;
  delete body.location;
  req.body = body;

  return next();
};

export default recombineCoord;
