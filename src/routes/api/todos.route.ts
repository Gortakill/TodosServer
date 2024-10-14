import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { isExist } from '@/middlewares/isExist.middleware';
import { PrismaClient } from '@prisma/client';
import { tryCatch } from '@/middlewares/tryCatch.middleware';
import { TodoSchema } from '@/validationSchema/todo.validation';
import { validator } from '@/middlewares/validator.middleware';
import AuthMiddleware from '@/middlewares/auth.middleware';

const todosRouter: Router = Router();
const todoClient = new PrismaClient().todo;

todosRouter.get(
	'/all',
	AuthMiddleware,
	tryCatch(todoController.getAllTodoFiltration.bind(todoController)),
);
todosRouter.get(
	'/byId/:id',
	isExist(todoClient),
	AuthMiddleware,
	tryCatch(todoController.getTodoById.bind(todoController)),
);
todosRouter.post(
	'/create',
	AuthMiddleware,
	validator(TodoSchema),
	tryCatch(todoController.createTodo.bind(todoController)),
);
todosRouter.patch(
	'/update/:id',
	AuthMiddleware,
	validator(TodoSchema),
	isExist(todoClient),
	tryCatch(todoController.updateTodo.bind(todoController)),
);
todosRouter.patch(
	'/updateStatus/:id',
	AuthMiddleware,
	isExist(todoClient),
	tryCatch(todoController.updateTodo.bind(todoController)),
);
todosRouter.delete(
	'/delete/:id',
	AuthMiddleware,
	isExist(todoClient),
	tryCatch(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
