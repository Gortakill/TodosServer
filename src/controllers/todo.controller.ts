import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';
import { UserRequest } from '@/types/requestUser.types';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodoFiltration(_: UserRequest, res: Response): Promise<void> {
		// TODO: Write your implementation here
		const todos = await this.todoService.findAllFiltration(
			_.query.search?.toString(),
			Boolean(_.query.status),
			_.user.id,
			Boolean(_.query.showAll),
			Boolean(_.query.isPublic),
			Number(_.query.skip),
		);
		res.send(todos);
	}
	async getTodoById(_: UserRequest, res: Response): Promise<void> {
		const todo = await this.todoService.findTodoById(_, _.user.id);
		res.send(todo);
	}

	async createTodo(_: UserRequest, res: Response): Promise<void> {
		const todo = await this.todoService.createTodo(_.body, _.user.id);
		res.send(todo);
	}
	async updateTodo(_: UserRequest, res: Response): Promise<void> {
		const todo = await this.todoService.updateTodo(_, _.body);
		res.send(todo);
	}
	async deleteTodo(_: UserRequest, res: Response): Promise<void> {
		const response = await this.todoService.deleteTodo(_);
		res.send(response);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
