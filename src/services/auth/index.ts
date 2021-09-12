import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";
import { UserTypeValues } from "../../types";

export default createService({
  name: "인증 서비스",
  baseURL: "/oauth",
  routes: [
    {
      method: "post",
      path: "/register",
      handler: controllers.registerUser,
      validateSchema: {
        idx: Joi.number().required(),
        username: Joi.string().required(),
        name: Joi.string().required(),
        userType: Joi.string()
          .valid(...UserTypeValues)
          .required(),
      },
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
    {
      method: "get",
      path: "/",
      handler: controllers.echoIdentity,
      needAuth: false,
      needPermission: false,
    },
  ],
});
