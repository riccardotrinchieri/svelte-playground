<script lang="ts">
	import Bubbles from '$lib/client/components/bubbles/Bubbles.svelte';
	import Navigation from '$lib/client/components/navigation/Navigation.svelte';
	import { windowSizeStore } from '$lib/client/features/window-size/windowSizeStore';
	import clsx from 'clsx';
</script>

<div class="w-full h-full flex">
	<div class={clsx('h-full relative bg-transparent', 'transition-all ease-in-out duration-700')}>
		<Navigation />
	</div>
	<div class="h-full grow relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-500 p-4">
		<Bubbles animationDuration={5000} />
		<div class={clsx('h-full pt-12 grid place-items-center')}>
			<div
				class={clsx(
					'bg-gray-50 rounded-lg shadow-xl  w-[90%] max-w-7xl max-h-[90%] h-full overflow-hidden relative z-40 p-2'
				)}
			>
				<div
					class={clsx(
						'bg-gray-50 rounded-lg shadow-xl p-6 w-full h-full overflow-auto relative z-40'
					)}
				>
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
