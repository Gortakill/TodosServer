import { Schema } from 'express-validator';

export const TodoSchema: Schema = {
	title: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		errorMessage: 'Title is require and shoud be a string',
	},
	description: {
		in: ['body'],
		isString: true,
		notEmpty: true,
		errorMessage: 'Description is require shoud be a string',
	},
};
