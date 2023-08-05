<script>
	// @ts-nocheck

	import clsx from 'clsx';
	import './styles.css';
	import nightwind from 'nightwind/helper';
	import { onMount } from 'svelte';
	import { themeModeStore } from '$lib/client/features/theme/themeModeStore';

	onMount(() => {
		const nightwindScript = document.createElement('script');
		nightwindScript.innerHTML = nightwind.init();
		document.head.appendChild(nightwindScript);
	});
</script>

<div
	class={clsx(
		'h-full w-full bg-gray-50 font-mono text-gray-900 text-center',
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
