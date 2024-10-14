import { UserType } from '@/types/user.types';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export class TokenService {
	generateToken(payload: UserType) {
		const token = jwt.sign(payload, process.env.SECRET_KEY, {
			expiresIn: '10h',
		});
		return {
			token: token,
		};
	}
}
