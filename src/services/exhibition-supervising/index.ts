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
      method: "get",
      path: "/exhibition",
      handler: controllers.getAllExhibitions,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "get",
      path: "/item/:id",
      handler: controllers.getAllItems,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "get",
      path: "/object/:id",
      handler: controllers.getAllObjects,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },

    // 3Depth POST
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
      method: "post",
      path: "/item",
      handler: controllers.registerItems,
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

    //3Depth PUT
    {
      method: "put",
      path: "/exhibition",
      handler: controllers.updateExhibition,
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
      method: "put",
      path: "/object",
      handler: controllers.updateObject,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },

    //3Depth Delete
    {
      method: "delete",
      path: "/exhibition/:id",
      handler: controllers.deleteExhibition,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/item/:id",
      handler: controllers.deleteItem,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/object/:id",
      handler: controllers.deleteObject,
      middlewares: [attachIdentity],
      needAuth: true,
      needPermission: true,
    },
  ],
});
