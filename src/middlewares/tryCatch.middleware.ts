import { Response, Request, NextFunction } from 'express';

export const tryCatch = (fn: Function) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
