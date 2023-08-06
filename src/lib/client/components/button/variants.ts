import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export const buttonVariants = cva(
	[
		clsx(
			'rounded-md',
			'px-4 py-2',
			'outline-0',
			'grid place-items-center',
			'transition-all ease-in',
			'[&[aria-disabled="true"]]:!pointer-events-auto'
		)
	],
	{
		variants: {
			size: {
				sm: [clsx('h-8')],
				md: [clsx('h-10')],
				lg: [clsx('h-12')]
			},
			mode: {
				filled: [],
				outlined: [],
				ghost: []
			},
			tone: {
				primary: [],
				neutral: [],
				danger: []
			}
		},
		compoundVariants: [
			//Filled variants
			{
				mode: 'filled',
				tone: 'primary',
				class: clsx(
					'text-gray-50',
					'bg-blue-900 border-1 border-blue-900',
					'[&[aria-disabled="true"]]:bg-blue-500 [&[aria-disabled="true"]]:border-blue-500',
					'hover:bg-blue-800 hover:border-blue-800',
					'active:bg-blue-950 active:border-blue-950',
					'focus:ring-4 foucs:ring-blue-50',
					'focus-visible:ring-4 foucs-visible:ring-blue-50'
				)
			},
			{
				mode: 'filled',
				tone: 'neutral',
				class: clsx(
					'text-gray-50',
					'bg-gray-900 border-1 border-gray-900',
					'[&[aria-disabled="true"]]:bg-gray-500 [&[aria-disabled="true"]]:border-gray-500',
					'hover:bg-gray-800 hover:border-gray-800',
					'active:bg-gray-950 active:border-gray-950',
					'focus:ring-1 foucs:ring-gray-50',
					'focus-visible:ring-1 foucs-visible:ring-gray-50'
				)
			},
			{
				mode: 'filled',
				tone: 'danger',
				class: clsx(
					'text-gray-50',
					'bg-red-900 border-2 border-red-900',
					'[&[aria-disabled="true"]]:bg-red-500 [&[aria-disabled="true"]]:border-red-500',
					'hover:bg-red-800 hover:border-red-800',
					'active:bg-red-950 active:border-red-950',
					'focus:ring-4 foucs:ring-red-50',
					'focus-visible:ring-4 foucs-visible:ring-red-50'
				)
			},

			//Outlined variants
			{
				mode: 'outlined',
				tone: 'primary',
				class: clsx(
					'text-blue-900',
					'bg-transparent border-2 border-blue-900',
					'[&[aria-disabled="true"]]:border-blue-500',
					'hover:text-blue-800 hover:border-blue-800',
					'active:text-blue-950 active:border-blue-950',
					'focus:ring-4 foucs:ring-blue-50',
					'focus-visible:ring-4 foucs-visible:ring-blue-50'
				)
			},
			{
				mode: 'outlined',
				tone: 'neutral',
				class: clsx(
					'text-gray-900',
					'bg-transparent border-2 border-gray-900',
					'[&[aria-disabled="true"]]:border-gray-500',
					'hover:text-gray-800 hover:border-gray-800',
					'active:text-gray-950 active:border-gray-950',
					'focus:ring-4 foucs:ring-gray-50',
					'focus-visible:ring-4 foucs-visible:ring-gray-50'
				)
			},
			{
				mode: 'outlined',
				tone: 'danger',
				class: clsx(
					'text-red-900',
					'bg-transparent border-2 border-red-900',
					'[&[aria-disabled="true"]]:border-red-500',
					'hover:text-red-800 hover:border-red-800',
					'active:text-red-950 active:border-red-950',
					'focus:ring-4 foucs:ring-red-50',
					'focus-visible:ring-4 foucs-visible:ring-red-50'
				)
			},

			//Ghost variants
			{
				mode: 'ghost',
				tone: 'primary',
				class: clsx(
					'text-blue-900',
					'bg-transparent',
					'[&[aria-disabled="true"]]:text-blue-500',
					'hover:bg-blue-100',
					'active:text-blue-950'
				)
			},
			{
				mode: 'ghost',
				tone: 'neutral',
				class: clsx(
					'text-gray-900',
					'bg-transparent',
					'[&[aria-disabled="true"]]:text-gray-500',
					'hover:bg-gray-100',
					'active:text-gray-950'
				)
			},
			{
				mode: 'ghost',
				tone: 'danger',
				class: clsx(
					'text-red-900',
					'bg-transparent',
					'[&[aria-disabled="true"]]:text-red-500',
					'hover:bg-red-100',
					'active:text-red-950'
				)
			}
		],
		defaultVariants: {
			size: 'md',
			mode: 'filled',
			tone: 'primary'
		}
	}
);
