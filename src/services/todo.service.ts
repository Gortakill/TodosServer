import { UserRequest } from '@/types/requestUser.types';
import { FilterType, TodoType } from '@/types/todos.type';
import { PrismaClient, Todo } from '@prisma/client';
import { Request } from 'express';

const todoClient = new PrismaClient().todo;

export default class TodoService {
	async findAllFiltration(
		search: string | undefined,
		status: boolean,
		userId: number,
		showAll: boolean,
		isPublic: boolean,
		skip: number,
	): Promise<void | { todos: Todo[]; total: number }> {
		const filters: FilterType = {
			userId,
			isComplete: false,
			title: undefined,
			isPublic: false,
		};
		if (!showAll) {
			filters.isComplete = status ?? false;
			filters.title = search || undefined;
			filters.isPublic = isPublic || false;
		}
		const total = await todoClient.count({
			where: { userId },
		});
		const todos = await todoClient.findMany({
			take: 5,
			skip: (skip - 1) * 5,
			where: showAll ? { userId } : filters,
			orderBy: {
				id: 'desc',
			},
		});
		return { todos: [...todos], total };
	}
	async findTodoById(req: Request, id: number): Promise<Todo> {
		const todo = await todoClient.findUnique({
			where: { id: Number(req.params.id) },
		});
		if (!todo) {
			throw new Error('todo not found');
		}
		if (todo.isPublic === false && todo.userId !== id) {
			throw new Error('todo is private');
		}
		return todo;
	}
	async createTodo(data: TodoType, id: number): Promise<Todo> {
		const todo = await todoClient.create({
			data: {
				...data,
				userId: id,
			},
		});
		return todo;
	}
	async updateTodo(req: UserRequest, data: TodoType): Promise<Todo> {
		const checkTodo = await todoClient.findUnique({
			where: { id: Number(req.params.id) },
		});
		if (!checkTodo) {
			throw new Error('todo not found');
		}
		if (checkTodo.userId !== req.user.id) {
			throw new Error('You are not owner of this todo');
		}
		const todo = await todoClient.update({
			where: { id: Number(req.params.id) },
			data,
		});
		return todo;
	}
	async deleteTodo(req: UserRequest): Promise<{ message: string }> {
		const todo = await todoClient.findUnique({
			where: { id: Number(req.params.id) },
		});
		if (!todo) {
			throw new Error('todo is not found');
		}
		if (todo.userId !== req.user.id) {
			throw new Error('You are not owner of this todo');
		}
		await todoClient.delete({ where: { id: Number(req.params.id) } });
		return {
			message: 'Todo was deleted',
		};
	}
}
