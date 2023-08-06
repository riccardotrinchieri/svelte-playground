<script lang="ts">
	import clsx from 'clsx';

	export let progress: number = 0;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let progressClass: string = '';

	let parentEl: HTMLDivElement;
	$: safeProgress = Math.min(Math.max(progress, 0), 100);
	$: parentWidth = parentEl?.offsetWidth ?? 0;
</script>

<div
	role="progressbar"
	bind:this={parentEl}
	on:mousemove
	class={clsx(
		'relative',
		'w-full flex',
		'rounded-full',
		'border-[1px] border-gray-200',

		'overflow-hidden',
		{
			'h-8': size === 'sm',
			'h-10': size === 'md',
			'h-12': size === 'lg'
		}
	)}
>
	<div
		style={`width:${safeProgress}%`}
		class={clsx('h-full rounded-full bg-transparent overflow-hidden')}
	>
		<div style={`width:${parentWidth}px`} class={clsx('h-full bg-gray-50', progressClass)} />
	</div>
</div>
