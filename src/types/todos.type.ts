export type TodoType = {
	title: string;
	description: string;
	isComplete: boolean;
	isPublic: boolean;
	userId: number;
};

export type FilterType = {
	isComplete: boolean;
	title: string | undefined;
	userId: number;
	isPublic: boolean;
};
