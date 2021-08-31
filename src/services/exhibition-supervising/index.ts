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
      path: "/exhibition/:id",
      handler: controllers.getExhibition,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "put",
      path: "/exhibition",
      handler: controllers.updateExhibition,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/exhibition",
      handler: controllers.deleteExhibition,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
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
    {
      method: "get",
      path: "/item",
      handler: controllers.getItem,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "put",
      path: "/item",
      handler: controllers.updateItem,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/item",
      handler: controllers.deleteItem,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "post",
      path: "/object",
      handler: controllers.registerObjects,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
  ],
});
