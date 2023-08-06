<script lang="ts">
	import Button from '../button/Button.svelte';
	import clsx from 'clsx';
	import ChevronRight from '$lib/client/assets/icons/ChevronRight.svelte';
	import NavItem from './NavItem.svelte';

	export let label: string;
	export let expanded = true;
	export let children: { href: string; label: string }[];
</script>

<Button variant={{ mode: 'ghost' }} class={'w-full'} on:click={() => (expanded = !expanded)}>
	<div class={clsx('w-full flex items-center gap-2 justify-start')}>
		<slot name="icon" />
		{label}
		<div class="grow" />
		<div class={clsx('grid place-items-center', 'transition-all ease-in', expanded && 'rotate-90')}>
			<ChevronRight size={18} />
		</div>
	</div>
</Button>
<div
	class={clsx(
		'pl-4',
		'transition-all ease-in-out duration-300',
		'grid',
		'[&>div]:overflow-hidden',
		{
			'opacity-100': expanded,
			'opacity-0': !expanded
		}
	)}
	style={`grid-template-rows: ${Number(expanded)}fr`}
>
	<div>
		{#each children as { label, href } (href)}
			<NavItem {label} {href} />
		{/each}
	</div>
</div>
