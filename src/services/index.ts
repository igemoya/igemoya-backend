import fs from "fs";
import Joi from "joi";
import {
  Router,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { join as pathJoin } from "path";
import { HTTPMethod } from "../types";
import {
  checkPermissions,
  validator,
  recombineCoord,
  attachIdentity,
} from "../middlewares";

interface KeyValue<T> {
  [key: string]: T;
}

export interface Route {
  method: HTTPMethod;
  path: string;
  middlewares?: RequestHandler[];
  handler: RequestHandler;
  validateSchema?: KeyValue<Joi.Schema>;
  needAuth: boolean;
  needPermission: boolean;
}

// 임포트 된 서비스 (서비스 디렉토리 명 추가)
export interface Service {
  code?: string;
  name: string;
  baseURL: string;
  routes: Route[];
}

// 각 서비스 정의 시 사용되는 인터페이스
interface ServiceSchema {
  name: string;
  baseURL: string;
  routes: Route[];
}

const wrapper =
  (asyncFn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

export const createService = (serviceSchema: ServiceSchema): ServiceSchema =>
  serviceSchema;

const createRouter = (services: Service[]) => {
  const router = Router();

  services.forEach((service) => {
    service.routes.forEach((route) => {
      router[route.method](
        pathJoin(service.baseURL, route.path),
        wrapper(attachIdentity),
        wrapper(checkPermissions(service.code, route)),
        wrapper(recombineCoord),
        ...(route.middlewares ? route.middlewares.map(wrapper) : []),
        ...(route.validateSchema
          ? [validator(Joi.object(route.validateSchema))]
          : []),
        wrapper(route.handler)
      );
    });
  });

  return router;
};

const createDocsRouter = (services: Service[]) => {
  const router = Router();

  const schemaMapper = (validateSchema: KeyValue<Joi.AnySchema>) => {
    const keys = Object.keys(validateSchema);
    const result: KeyValue<String | undefined> = {};
    keys.forEach((key) => {
      result[key] = validateSchema[key].type;
    });
    return result;
  };

  const routeMapper = (service: Service) =>
    service.routes.map((r) => ({
      ...r,
      path: (service.baseURL + r.path).replace(/\/$/, ""),
      validateSchema: r.validateSchema ? schemaMapper(r.validateSchema) : {},
    }));

  const mappedServices = services.map((s: Service) => ({
    ...s,
    routes: routeMapper(s),
  }));

  router.get("/", (req, res) => {
    res.json({ services: mappedServices });
  });

  return router;
};

export const services = fs
  .readdirSync(__dirname)
  .filter((s) => !s.startsWith("index"));

export const importedServices = services.map((s: string) => ({
  code: s,
  // eslint-disable-next-line
  ...require(`${__dirname}/${s}`).default,
}));

export const serviceRouter = createRouter(importedServices);
export const serviceDocsRouter = createDocsRouter(importedServices);
