<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import Button from '../button/Button.svelte';
	import clsx from 'clsx';

	export let href: string;
	export let label: string;
</script>

<Button {href} variant={{ mode: 'ghost' }}>
	<div
		class={clsx(
			'w-full flex items-center gap-2 justify-start whitespace-nowrap overflow-hidden text-ellipsis'
		)}
	>
		<slot name="icon" />
		{label}
		<div class="grow" />
	</div>
</Button>
