import { exhibitionGeoType, coordinate } from "../types";

export interface geoJSON {
  location: {
    type: exhibitionGeoType;
    coordinate: coordinate | Number[][]; //Poligon or Point
  };
  maxDistance?: number;
}
