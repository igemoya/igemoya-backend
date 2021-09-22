import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "exhibitions",
  baseURL: "/image-search",
  routes: [
    {
      method: "get",
      path: "/dummey",
      handler: controllers.dummeyRoute,
      needAuth: false,
      needPermission: false,
    },
    {
      method: "post",
      path: "/image-search",
      handler: controllers.postImage,
      needAuth: true,
      needPermission: false,
    },
  ],
});
