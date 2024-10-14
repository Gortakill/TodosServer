import { Schema } from 'express-validator';

export const UserChangePasswordSchema: Schema = {
	password: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		isLength: {
			options: { min: 5, max: 25 },
			errorMessage: 'Password should be between 5 and 25 characters',
		},
		errorMessage: 'Password is require and shoud be a string',
	},
};
