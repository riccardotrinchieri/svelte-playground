<script lang="ts">
	import type { ButtonProps } from './types';
	import { buttonVariants } from './variants';
	import clsx from 'clsx';

	type $$Props = ButtonProps;

	export let href: $$Props['href'] = undefined;
	export let variant: $$Props['variant'] = undefined;
</script>

{#if href}
	<a {href} {...$$restProps} class={clsx(buttonVariants(variant), $$restProps.class)}><slot /></a>
{:else}
	<button
		{...$$restProps}
		disabled={false}
		aria-disabled={$$restProps.disabled ? 'true' : 'false'}
		class={clsx(
			buttonVariants(variant),
			$$restProps.disabled && 'pointer-events-none',
			$$restProps.class
		)}
		on:click
	>
		<slot />
	</button>
{/if}
