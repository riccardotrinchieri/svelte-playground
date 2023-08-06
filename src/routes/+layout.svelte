<script>
	// @ts-nocheck

	import clsx from 'clsx';
	import './styles.css';
	import nightwind from 'nightwind/helper';
	import { onMount } from 'svelte';
	import { themeModeStore } from '$lib/client/features/theme';
	import { Toaster } from '$lib/client/features/toaster';

	onMount(() => {
		const nightwindScript = document.createElement('script');
		nightwindScript.innerHTML = nightwind.init();
		document.head.appendChild(nightwindScript);
	});
</script>

<Toaster
	containerClassName={clsx(
		'[&>.wrapper>.base]:bg-gray-900 [&>.wrapper>.base]:text-gray-50 font-mono'
	)}
/>

<div
	class={clsx(
		'fixed top-0 h-full w-full bg-gray-50 font-mono text-gray-900 text-center overflow-hidden',
		!$themeModeStore && 'hidden'
	)}
>
	<slot />
</div>

<style lang="postcss">
	:global(html, body) {
		height: theme(height.full);
	}
</style>
