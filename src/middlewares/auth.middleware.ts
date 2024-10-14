import { Errback, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
	user?: string | jwt.JwtPayload;
}

const AuthMiddleware = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			throw new Error('Unauthorize');
		}
		const verify = await jwt.verify(token, process.env.SECRET_KEY);
		req.user = verify;
		next();
	} catch (err) {
		res.status(401).send(err);
	}
};

export default AuthMiddleware;
