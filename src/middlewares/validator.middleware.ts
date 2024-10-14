import { checkSchema, Schema, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';

export const validator = (schema: Schema) => {
	return [
		...checkSchema(schema),
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
				});
			}
			next();
		},
	];
};
