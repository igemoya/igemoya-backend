import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "exhibitions",
  baseURL: "/theme",
  routes: [
    {
      method: "post",
      path: "/",
      handler: controllers.createTheme,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "put",
      path: "/:id",
      handler: controllers.updateTheme,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "delete",
      path: "/:id",
      handler: controllers.deleteTheme,
      needAuth: true,
      needPermission: true,
    },
    {
      method: "get",
      path: "/one/:id",
      handler: controllers.getTheme,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/all",
      handler: controllers.getAllTheme,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "post",
      path: "/nearer",
      handler: controllers.nearerTheme,
      needAuth: true,
      needPermission: false,
    },
  ],
});
