import { exhibitionGeoType, coordinates } from "../types";

export interface geoJSON {
  location: {
    type: exhibitionGeoType;
    coordinates: Array<number>; //Poligon or Point
  };
  maxDistance?: number;
}
