<script lang="ts">
	import { browser } from '$app/environment';
	import { Throttler } from '$lib/client/features/throttling';
	import clsx from 'clsx';
	import { onDestroy, onMount } from 'svelte';

	export let x: number;
	export let y: number;
	export let size: number;

	let hoveringElement: Element | null = null;

	let throttler: Throttler;
	onMount(() => {
		throttler = new Throttler();
		window.document.addEventListener('mousemove', getElementUnderCursor, { passive: true });
	});

	const getElementUnderCursor = (e: MouseEvent) => {
		throttler.throttle(() => {
			hoveringElement = window.document.elementFromPoint(e.clientX, e.clientY);
		}, 30);
	};

	onDestroy(() => {
		browser && window.document.removeEventListener('mousemove', getElementUnderCursor);
	});

	$: hoveringDisabled = hoveringElement?.getAttribute('aria-disabled') === 'true';
	$: hoveringClickable = !hoveringDisabled && hoveringElement?.tagName === 'BUTTON';
</script>

<div
	style={`top:${y}px; left:${x}px; transform: scale(${size});`}
	class={clsx('absolute z-[999] rounded-full h-[10px] w-[10px]', {
		'bg-blue-700': !hoveringClickable && !hoveringDisabled,
		'bg-red-500': hoveringDisabled,
		'bg-green-500': hoveringClickable
	})}
/>
