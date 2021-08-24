import { User } from './interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
