import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export const buttonVariants = cva([clsx('rounded-md'), clsx('px-4 py-2'), clsx('outline-0')], {
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
				'disabled:bg-blue-500 disabled:border-blue-500',
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
				'disabled:bg-gray-500 disabled:border-gray-500',
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
				'disabled:bg-red-500 disabled:border-red-500',
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
				'disabled:border-blue-500',
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
				'disabled:border-gray-500',
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
				'disabled:border-red-500',
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
				'disabled:text-blue-500',
				'hover:bg-blue-500',
				'active:text-blue-950',
				'focus:underline',
				'focus-visible:underline'
			)
		},
		{
			mode: 'ghost',
			tone: 'neutral',
			class: clsx(
				'text-gray-900',
				'bg-transparent',
				'disabled:text-gray-500',
				'hover:bg-gray-500',
				'active:text-gray-950',
				'focus:underline',
				'focus-visible:underline'
			)
		},
		{
			mode: 'ghost',
			tone: 'danger',
			class: clsx(
				'text-red-900',
				'bg-transparent',
				'disabled:text-red-500',
				'hover:bg-red-500',
				'active:text-red-950',
				'focus:underline',
				'focus-visible:underline'
			)
		}
	],
	defaultVariants: {
		size: 'md',
		mode: 'filled',
		tone: 'primary'
	}
});
