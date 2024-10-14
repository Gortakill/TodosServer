import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Response, Request, NextFunction } from 'express';

export const isExist =
	(model: Prisma.TodoDelegate<DefaultArgs>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			const todo = await model.findUnique({ where: { id: Number(id) } });
			if (!todo) {
				return res.status(404).json({
					message: 'Todo not found',
					status: 404,
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	};
