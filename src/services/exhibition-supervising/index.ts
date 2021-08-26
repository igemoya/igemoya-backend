import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";
import { attachIdentity } from "../../middlewares";
import { exhibitionGeoTypeValues, UserTypeValues } from "../../types";

export default createService({
  name: "exhibitions",
  baseURL: "/superviser",
  routes: [
    {
      method: "post",
      path: "/exhibition",
      handler: controllers.registerExhibition,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
      validateSchema: {
        name: Joi.string().required(),
        description: Joi.string().required(),
        images: Joi.array().items(Joi.string()).required(),
        location: Joi.object({
          type: Joi.string()
            .valid(...exhibitionGeoTypeValues)
            .required(),
          coordinate: Joi.array().items(Joi.number()).required(),
        }),
      },
    },
    {
      method: "get",
      path: "/my",
      handler: controllers.myExhibitions,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "post",
      path: "/item",
      handler: controllers.registerItems,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
  ],
});
