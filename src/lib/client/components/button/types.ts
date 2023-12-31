import type { HTMLButtonAttributes } from 'svelte/elements';

export type ButtonVariant = {
	size: 'sm' | 'md' | 'lg';
	mode: 'filled' | 'outlined' | 'ghost';
	tone: 'primary' | 'neutral' | 'danger';
};

type BaseButtonProps = {
	variant?: Partial<ButtonVariant>;
};

type RegularButtonProps = {
	href?: undefined;
} & Partial<HTMLButtonAttributes>;

type LinkButtonProps = {
	href?: string;
} & Partial<Omit<HTMLAnchorElement, 'href'>>;

export type ButtonProps = BaseButtonProps & (RegularButtonProps | LinkButtonProps);
