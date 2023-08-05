<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	type Bubble = {
		id: ReturnType<typeof crypto.randomUUID>;
		size: number;
		offsetX: number;
		toY: number;
	};

	export let animationDuration: number;

	let bubbles: Bubble[] = [];

	let interval: number;

	onMount(() => {
		interval = window.setInterval(() => {
			const id = crypto.randomUUID();
			bubbles = [
				...bubbles,
				{
					id,
					size: Math.ceil(Math.random() * 15),
					offsetX: Math.ceil(Math.random() * 100),
					toY: Math.ceil(Math.random() * 250)
				}
			];
			setTimeout(() => {
				bubbles = bubbles.filter((bubble) => bubble.id != id);
			}, animationDuration - 500);
		}, 20);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	function bubbleRise(node: any, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicOut(t);

				return `
					transform: scale(${eased}) translateY(-${t * 2000}px);
					opacity: ${t === duration ? 0 : 1}
				`;
			}
		};
	}
</script>

<div class="h-full w-full absolute">
	{#each bubbles as bubble (bubble.id)}
		<div
			in:bubbleRise={{ duration: 8000 }}
			class="rounded-full bg-blue-950 aspect-square absolute z-0"
			style="left:{bubble.offsetX}%; width:{bubble.size}px; bottom: 0; z-index:{Math.random() > 0.5
				? 0
				: 20}"
		/>
	{/each}
</div>
