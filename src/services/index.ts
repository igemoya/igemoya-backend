import fs from 'fs';
import {
  Router, RequestHandler, Request, Response, NextFunction,
} from 'express';
import { join as pathJoin } from 'path';
import { HTTPMethod } from '../types';

interface KeyValue<T> {
  [key: string]: T;
}

export interface Route {
  method: HTTPMethod;
  path: string;
  middlewares?: RequestHandler[];
  handler: RequestHandler;
  needAuth: boolean; // 인증이 필요한지
  needPermission: boolean; // 관리자 권한이 필요한지
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

const wrapper = (asyncFn: any) =>
  (
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await asyncFn(req, res, next);
      } catch (error) {
        return next(error);
      }
    }
  );

export const createService = (serviceSchema: ServiceSchema) => serviceSchema;

const createRouter = (services: Service[]) => {
  const router = Router();

  services.forEach((service) => {
    service.routes.forEach((route) => {
      router[route.method](
        pathJoin(service.baseURL, route.path),
        ...(route.middlewares
          ? route.middlewares.map(wrapper) : []),
        wrapper(route.handler),
      );
    });
  });

  return router;
};

export const services = fs.readdirSync(__dirname)
  .filter((s) => !s.startsWith('index'));

export const importedServices = services.map((s) => ({
  code: s,
  // eslint-disable-next-line
  ...(require(`${__dirname}/${s}`).default),
}));

export const serviceRouter = createRouter(importedServices);