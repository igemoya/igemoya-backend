import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";
import { attachIdentity } from "../../middlewares";
import { exhibitionGeoTypeValues, UserTypeValues } from "../../types";

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
  ],
});
