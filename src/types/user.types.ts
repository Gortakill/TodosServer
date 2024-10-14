export type UserCreateType = {
	email: string;
	name: string;
	password: string;
	confirmedLink: string;
};

export type UserLoginType = {
	email: string;
	password: string;
};

export type ChangeUserPassword = {
	password: string;
};

export type ForgotPassword = {
	email: string;
};

export type UserType = {
	id: number;
	email: string;
	name: string;
};
