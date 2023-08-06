<script lang="ts">
	import Bubbles from '$lib/client/components/bubbles/Bubbles.svelte';
	import Navigation from '$lib/client/components/navigation/Navigation.svelte';
</script>

<div class="w-full h-full flex">
	<div class="h-full relative">
		<Navigation />
	</div>
	<div class="h-full grow relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-500 p-4">
		<Bubbles animationDuration={5000} />
		<slot />
	</div>
</div>
