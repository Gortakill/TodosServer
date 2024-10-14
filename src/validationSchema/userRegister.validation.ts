import { Schema } from 'express-validator';

export const UserRegisterSchema: Schema = {
	email: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		isEmail: true,
		errorMessage: 'Email is require and shoud be a string',
	},
	name: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		errorMessage: 'Name is require and shoud be a string',
	},
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
