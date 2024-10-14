import UserService from '@/services/user.service';
import { UserRequest } from '@/types/requestUser.types';
import { Request, Response } from 'express';

export class UserController {
	constructor(private userService: UserService) {}

	async registration(_: Request, res: Response): Promise<void> {
		const user = await this.userService.register(_.body);
		res.send(user);
	}

	async login(_: Request, res: Response): Promise<void> {
		const user = await this.userService.login(_.body);
		res.send(user);
	}

	async confirm(_: Request, res: Response): Promise<void> {
		const user = await this.userService.confirmAccount(_.params.link);
		if (!process.env.CLIENT_URL) {
			return;
		}
		res.redirect(process.env.CLIENT_URL);
	}

	async getUser(_: UserRequest, res: Response): Promise<void> {
		const user = await this.userService.getUser(_.user.id);
		res.send(user);
	}

	async updatePassword(_: UserRequest, res: Response): Promise<void> {
		const updated = await this.userService.changePassword(
			_.user.id,
			_.body,
		);
		res.send(updated);
	}
	async forgotPassword(_: UserRequest, res: Response): Promise<void> {
		const forgot = await this.userService.forgotPassword(_.body);
		res.send(forgot);
	}

	async changeForgotPassword(_: UserRequest, res: Response): Promise<void> {
		const forgot = await this.userService.changeForgotPassword(
			_.body,
			_.params.link,
		);
		res.send(forgot);
	}
}

const userController = new UserController(new UserService());
export default userController;
