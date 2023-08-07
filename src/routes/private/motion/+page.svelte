<script lang="ts">
	import Button from '$lib/client/components/button/Button.svelte';
	import Progressbar from '$lib/client/components/progressbar/Progressbar.svelte';
	import { Throttler } from '$lib/client/features/throttling';
	import clsx from 'clsx';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { spring } from 'svelte/motion';
	import CustomPointer from './CustomPointer.svelte';
	import { onMount } from 'svelte';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const onMouseMoveProgressbar = (e: MouseEvent) => {
		const target = e.currentTarget as HTMLDivElement;
		if (!target) {
			return;
		}
		const bounds = target.getBoundingClientRect();
		const totWidth = bounds.right - bounds.left;
		const mousePosition = e.clientX - bounds.left;
		progress.set((mousePosition / totWidth) * 100);
	};

	const counter = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const extractRangeFromCounter = () => {
		const rounded = Math.floor($counter);
		return [rounded - 1, rounded, rounded + 1];
	};

	let range = extractRangeFromCounter();

	$: {
		if ($counter === range[0] || $counter === range[range.length - 1]) {
			range = extractRangeFromCounter();
		}
	}

	$: delta = -1 * (range[1] - $counter) * 60; //Counter height;

	const safeUpdateCounter = (newVal: number) => {
		const notSmalletThanRange = Math.max(newVal, Math.min(...range));
		const notBiggerThanRange = Math.min(notSmalletThanRange, Math.max(...range));
		return notBiggerThanRange;
	};

	let throttler: Throttler;
	onMount(() => {
		throttler = new Throttler();
	});

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.2,
			damping: 1
		}
	);

	let size = spring(1);

	const onMouseMoveCustomPointerContainer = (
		target: EventTarget & HTMLDivElement,
		clientX: number,
		clientY: number
	) => {
		const bounds = target.getBoundingClientRect();
		const x = clientX - bounds.left;
		const y = clientY - bounds.top;
		const totWidth = bounds.right - bounds.left;
		const totHeight = bounds.bottom - bounds.top;

		coords.set({ x: Math.min(x, totWidth - 10), y: Math.min(y, totHeight - 10) });
	};
</script>

<svelte:head><title>Motion</title></svelte:head>

<h1 class={clsx('text-center text-3xl font-semibold mb-4')}>Svelte Motion is just magic!</h1>
<h2 class={clsx('text-center text-lg mb-16')}>
	Improve the user experience and interactivity of you application with little to none development
	effort. (I apologize if you are on mobile, try this on desktop)
</h2>

<p class={clsx('text-center text-lg mb-8 font-semibold')}>How much do you like this?</p>
<Progressbar
	on:mousemove={onMouseMoveProgressbar}
	progress={$progress}
	size="lg"
	progressClass={clsx('bg-gradient-to-r from-red-500  via-yellow-300 to-green-500')}
/>

<p class={clsx('text-center text-lg mt-16 font-semibold')}>Boring counters? NO MORE!</p>
<p class={clsx('text-center text-lg mb-4')}>(Please don't spam! I was lazy...)</p>

<div class={clsx('flex items-center gap-8 justify-center mb-16')}>
	<Button on:click={() => counter.update((prev) => safeUpdateCounter(Math.max(prev - 1, 0)))}
		>-</Button
	>
	<div
		class={clsx(
			'text-6xl font-semibold h-[60px] w-[120px] overflow-hidden transition-all ease-in-out'
		)}
	>
		<div style={`transform: translateY(${delta}px)`} class={clsx('flex flex-col mt-[-60px]')}>
			<span>{range[2]}</span>
			<span>{range[1]}</span>
			<span>{range[0]}</span>
		</div>
	</div>
	<Button on:click={() => counter.update((prev) => safeUpdateCounter(prev + 1))}>+</Button>
</div>

<p class={clsx('text-center text-lg mb-4 font-semibold')}>Do you want a custom cursor?</p>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={clsx(
		'border-2 border-dashed border-blue-800 rounded-lg h-[300px] relative cursor-none grid place-items-center',
		'[&>btn]:!cursor-none'
	)}
	on:mousemove={(e) => {
		const currentTarget = e.currentTarget;
		throttler.throttle(() => {
			onMouseMoveCustomPointerContainer(currentTarget, e.clientX, e.clientY);
		}, 16);
	}}
	on:mousedown={() => size.set(3)}
	on:mouseup={() => size.set(1)}
>
	<CustomPointer x={$coords.x} y={$coords.y} size={$size} />
	<div class={clsx('flex items-center gap-2')}>
		<Button class={'!cursor-none'}>Enabled</Button>
		<Button class={'!cursor-none'} disabled>Disabled</Button>
	</div>
</div>
