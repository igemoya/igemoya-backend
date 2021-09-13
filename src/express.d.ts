import { geoJSON, User } from "./interfaces";

declare global {
  namespace Express {
    export interface Request {
      geoJSON?: geoJSON;
      user?: User;
    }
  }
}
