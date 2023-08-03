<script lang="ts">
	import SvelteLogo from '$lib/client/assets/icons/SvelteLogo.svelte';
	import Bubbles from '$lib/client/components/bubbles/Bubbles.svelte';
	import clsx from 'clsx';
</script>

<div class={clsx('h-full flex')}>
	<main class={clsx('h-full w-full md:w-1/2 flex flex-col items-center justify-center p-4')}>
		<slot />
	</main>
	<div
		class={clsx(
			'h-full relative overflow-hidden hidden md:flex w-1/2 bg-gradient-to-b from-blue-900 to-blue-500 flex-col items-center justify-center p-4'
		)}
	>
		<div class={clsx('relative z-10 text-blue-950')}>
			<SvelteLogo size={250} />
		</div>
		<Bubbles animationDuration={5000} />
	</div>
</div>
