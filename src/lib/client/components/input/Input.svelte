<script lang="ts">
	import clsx from 'clsx';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = HTMLInputAttributes & {
		error?: string;
		label?: string;
	};

	export let error: string | undefined = undefined;
	export let label: string | undefined = undefined;

	const addonClasses = clsx('transition-all ease-in', {
		'group-focus-within:text-blue-600  group-hover:text-blue-300': !error,
		'text-red-600  group-hover:!text-red-300': error
	});
</script>

<div class={clsx('w-full flex flex-col gap-1')}>
	{#if label}
		<p class={clsx('w-full text-start text-md text-gray-900')}>
			{label}
		</p>
	{/if}
	<div class={clsx('w-full relative flex items-center group')}>
		{#if $$slots.startAddon}
			<div class={clsx('absolute left-2', addonClasses)}>
				<slot name="startAddon" />
			</div>
		{/if}
		{#if $$slots.endAddon}
			<div class={clsx('absolute right-2', addonClasses)}>
				<slot name="endAddon" />
			</div>
		{/if}
		<input
			{...$$restProps}
			class={clsx(
				'w-full outline-0',
				'transition-all ease-in',
				'bg-transparent text-gray-900 border-2 rounded-md px-2 py-1 focus:ring-4',
				$$slots.startAddon && 'pl-8',
				$$slots.endAddon && 'pr-4',
				{
					'border-gray-800 focus:border-blue-600 focus:ring-blue-200 hover:!border-blue-300':
						!error,
					'border-red-600 focus:ring-red-200 hover:border-red-300': error
				},

				$$restProps.class
			)}
		/>
	</div>
	<div class={clsx('w-full h-6 whitespace-nowrap ')}>
		{#if error}
			<p class={clsx('w-full text-start text-sm text-red-600 overflow-hidden text-ellipsis')}>
				{error}
			</p>
		{/if}
	</div>
</div>
