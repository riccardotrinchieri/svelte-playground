export type SequelizeDefaultAttributes = {
	createdAt: string;
	updatedAt: string;
};

export type OmitForCreationType<TType, TKeys extends string | symbol | number> = Omit<
	TType,
	TKeys | keyof SequelizeDefaultAttributes
>;
