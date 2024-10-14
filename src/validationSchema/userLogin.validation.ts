import { Schema } from 'express-validator';

export const UserLoginSchema: Schema = {
	email: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		isEmail: true,
		errorMessage: 'Email is require and shoud be a string',
	},
	password: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		errorMessage: 'Password is require and shoud be a string',
	},
};
