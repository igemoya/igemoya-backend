import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "인증 서비스",
  baseURL: "/user",
  routes: [
    {
      method: "get",
      path: "/me",
      handler: controllers.userInfo,
      needAuth: true,
      needPermission: false,
    },
  ],
});
