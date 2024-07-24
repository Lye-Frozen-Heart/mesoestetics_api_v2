import { Request } from 'express';

interface User {
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}