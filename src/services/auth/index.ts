import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "인증 서비스",
  baseURL: "/oauth",
  routes: [
    {
      method: "get",
      path: "/",
      handler: controllers.login,
      needAuth: false,
      needPermission: false,
    },
  ],
});
