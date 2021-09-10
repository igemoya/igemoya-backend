import { Request, Response, NextFunction } from "express";
import { veriToken } from "../resources/token";
import { User } from "../interfaces";
import { logger } from "../resources/logger";

const attachIdentity = async (
  req: Request,
  Res: Response,
  next: NextFunction
) => {
  if (!req.token) {
    return next();
  }
  const { token } = req;
  try {
    const identity = await veriToken(token);
    req.user = identity;
    next();
  } catch (e) {
    return next(e);
  }
};

export default attachIdentity;
