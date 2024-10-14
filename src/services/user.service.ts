import {
	ChangeUserPassword,
	ForgotPassword,
	UserCreateType,
	UserLoginType,
} from '@/types/user.types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import MailService from './mail.service';
import { v4 } from 'uuid';

const userClient = new PrismaClient().user;
const tokenService = new TokenService();
const mailService = new MailService();

export default class UserService {
	async register(data: UserCreateType): Promise<{ token: string }> {
		const candidate = await userClient.findUnique({
			where: { email: data.email },
		});
		if (candidate) {
			throw new Error('User with this email is alredy exist');
		}
		const hashPassword = await bcrypt.hash(data.password, 5);
		const confirmedLink = v4();
		const user = await userClient.create({
			data: {
				...data,
				password: hashPassword,
				confirmedLink: confirmedLink,
			},
		});
		await mailService.sendConfirmedMail(
			data.email,
			`${process.env.SERVER_URL}/user/confirm/${confirmedLink}`,
		);
		return tokenService.generateToken({
			id: user.id,
			email: user.email,
			name: user.name,
		});
	}

	async login(data: UserLoginType) {
		const candidate = await userClient.findUnique({
			where: { email: data.email },
		});
		if (!candidate) {
			throw new Error('email or password incorrect');
		}
		const comparePassword = await bcrypt.compare(
			data.password,
			candidate.password,
		);
		if (!comparePassword) {
			throw new Error('email or password incorrect');
		}
		return tokenService.generateToken({
			id: candidate.id,
			email: candidate.email,
			name: candidate.name,
		});
	}

	async confirmAccount(confirmedLink: string) {
		const user = await userClient.findFirst({ where: { confirmedLink } });
		if (!user) {
			throw new Error('Incorrect confirmed link');
		}
		await userClient.update({
			where: { id: user.id },
			data: { isConfirmed: true },
		});
	}

	async getUser(id: number) {
		const user = await userClient.findUnique({ where: { id } });
		return {
			email: user?.email,
			name: user?.name,
		};
	}

	async changePassword(id: number, data: ChangeUserPassword) {
		const hashPassword = await bcrypt.hash(data.password, 5);
		await userClient.update({
			where: { id },
			data: { password: hashPassword },
		});
		return {
			message: 'Password was updated',
		};
	}

	async forgotPassword(data: ForgotPassword) {
		const user = await userClient.findUnique({
			where: { email: data.email },
		});
		if (!user) {
			throw new Error('User with this email is not exist');
		}
		if (!user.confirmedLink) {
			throw new Error('Incorrect confirmed link');
		}
		await mailService.sendForgotPasswordMail(
			user.email,
			`${process.env.SERVER_URL}/user/forgot/${user.confirmedLink}`,
		);
		return {
			message: 'Mail was sended on your email',
		};
	}

	async changeForgotPassword(
		data: ChangeUserPassword,
		confirmedLink: string,
	) {
		const user = await userClient.findFirst({ where: { confirmedLink } });
		if (!user) {
			throw new Error('Incorrect confirmed link');
		}
		const hashPassword = await bcrypt.hash(data.password, 5);
		await userClient.update({
			where: { id: user.id },
			data: { password: hashPassword },
		});
		return {
			message: 'Password was changed',
		};
	}
}
