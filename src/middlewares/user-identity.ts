import { Request, Response, NextFunction } from "express";
import { veriToken } from "../resources/token";

const attachIdentity = (req: Request, Res: Response, next: NextFunction) => {
  if (!req.token) {
    return next();
  }
  const { token } = req;
  try {
    const identity = veriToken(token);
    req.user = identity;
    next();
  } catch (e) {
    return next(e);
  }
};

export default attachIdentity;
