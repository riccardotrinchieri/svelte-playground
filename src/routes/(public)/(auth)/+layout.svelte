<script lang="ts">
	import SvelteLogo from '$lib/client/assets/icons/SvelteLogo.svelte';
	import Bubbles from '$lib/client/components/bubbles/Bubbles.svelte';
</script>

<div class="h-full flex">
	<main class="h-full w-full md:w-1/2 flex flex-col items-center justify-center p-4">
		<slot />
	</main>
	<div
		class="h-full relative overflow-hidden hidden md:flex w-1/2 bg-gradient-to-b from-blue-950 to-blue-500 flex-col items-center justify-center p-4"
	>
		<div class="relative z-10 text-blue-950">
			<SvelteLogo size={250} />
		</div>
		<Bubbles animationDuration={5000} />
	</div>
</div>
