import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "exhibitions",
  baseURL: "/supervisor",
  routes: [
    {
      method: "get",
      path: "/exhibition",
      handler: controllers.getAllExhibitions,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "get",
      path: "/item/:id",
      handler: controllers.getAllItems,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "get",
      path: "/object/:id",
      handler: controllers.getAllObjects,
      needAuth: true,
      needPermission: true,
    },

    // 3Depth POST
    {
      method: "post",
      path: "/exhibition",
      handler: controllers.registerExhibition,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "post",
      path: "/item",
      handler: controllers.registerItems,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "post",
      path: "/object",
      handler: controllers.registerObjects,
      needAuth: true,
      needPermission: true,
    },

    //3Depth PUT
    {
      method: "put",
      path: "/exhibition/:id",
      handler: controllers.updateExhibition,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "put",
      path: "/item/:id",
      handler: controllers.updateItem,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "put",
      path: "/object/:id",
      handler: controllers.updateObject,
      needAuth: true,
      needPermission: true,
    },

    //3Depth Delete
    {
      method: "delete",
      path: "/exhibition/:id",
      handler: controllers.deleteExhibition,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/item/:id",
      handler: controllers.deleteItem,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/object/:id",
      handler: controllers.deleteObject,
      needAuth: true,
      needPermission: true,
    },
  ],
});
