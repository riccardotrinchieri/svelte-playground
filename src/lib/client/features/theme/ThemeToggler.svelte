<script lang="ts">
	import MoonIcon from '$lib/client/assets/icons/MoonIcon.svelte';
	import SunIcon from '$lib/client/assets/icons/SunIcon.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import { toggleTheme } from './theme-toggler';
	import { themeModeStore } from './themeModeStore';

	const toggle = (mode: 'dark' | 'light') => {
		themeModeStore.update(() => mode);
		toggleTheme();
	};
</script>

{#if $themeModeStore === 'light'}
	<Button on:click={() => toggle('dark')} variant={{ mode: 'ghost' }}><SunIcon /></Button>
{:else}
	<Button on:click={() => toggle('light')} variant={{ mode: 'ghost' }}><MoonIcon /></Button>
{/if}
