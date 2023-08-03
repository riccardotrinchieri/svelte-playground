<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { ButtonProps, ButtonVariant } from './types';
	import { buttonVariants } from './variants';
	import clsx from 'clsx';

	type $$Props = ButtonProps;

	export let href: $$Props['href'] = undefined;
	export let variant: $$Props['variant'] = undefined;
</script>

{#if href}
	<a {href} class={clsx(buttonVariants(variant))} {...$$restProps}><slot /></a>
{:else}
	<button {...$$restProps} class={clsx(buttonVariants(variant))} on:click>
		<slot />
	</button>
{/if}
