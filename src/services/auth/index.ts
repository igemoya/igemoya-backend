import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "인증 서비스",
  baseURL: "/auth",
  routes: [
    {
      method: "post",
      path: "/register",
      handler: controllers.registerUser,
      needAuth: false,
      needPermission: false,
    },
    {
      method: "post",
      path: "/",
      handler: controllers.identifyUser,
      needAuth: false,
      needPermission: false,
    },
  ],
});
