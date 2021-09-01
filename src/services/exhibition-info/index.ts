import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";
import { attachIdentity } from "../../middlewares";
import { exhibitionGeoTypeValues, UserTypeValues } from "../../types";

export default createService({
  name: "전시 정보 조회",
  baseURL: "/exhibition-info",
  routes: [
    {
      method: "get",
      path: "/exhibition/:id",
      handler: controllers.getExhibition,
      needAuth: false,
      needPermission: false,
    },
    {
      method: "get",
      path: "/item/:id",
      handler: controllers.getItem,
      needAuth: false,
      needPermission: false,
    },
    {
      method: "get",
      path: "/object/:id",
      handler: controllers.getObject,
      needAuth: false,
      needPermission: false,
    },
  ],
});
