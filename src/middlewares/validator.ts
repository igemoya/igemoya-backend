import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export default (joiScheme: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joiScheme.validateAsync(req.body);
    } catch (e) {
      res.status(400).json({ message: e.message });
      return;
    }
    next();
  };
