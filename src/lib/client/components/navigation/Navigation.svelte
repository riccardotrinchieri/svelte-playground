<script lang="ts">
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import ThemeToggler from '$lib/client/features/theme/components/ThemeToggler.svelte';
	import clsx from 'clsx';
	import Button from '../button/Button.svelte';
	import SettingsIcon from '$lib/client/assets/icons/SettingsIcon.svelte';
	import LogoutIcon from '$lib/client/assets/icons/LogoutIcon.svelte';
	import { goto } from '$app/navigation';
	import Divider from '../divider/Divider.svelte';
	import NavItem from './NavItem.svelte';
	import HomeIcon from '$lib/client/assets/icons/HomeIcon.svelte';
	import Bubbles from '../bubbles/Bubbles.svelte';
	import NavItemGroup from './NavItemGroup.svelte';
	import TableIcon from '$lib/client/assets/icons/TableIcon.svelte';
	import CloseIcon from '$lib/client/assets/icons/CloseIcon.svelte';
	import MenuIcon from '$lib/client/assets/icons/MenuIcon.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { windowSizeStore } from '$lib/client/features/window-size/windowSizeStore';

	let expanded = false;

	onMount(() => {
		expanded = !!$windowSizeStore && $windowSizeStore.width > 1024;
	});

	const logout = () => {
		fetch('/api/auth/logout', { method: 'POST', body: '' }).then(() => {
			goto('/auth/login');
		});
	};
</script>

<div
	style={`width:${expanded ? '300px' : '60px'}; min-width:${expanded ? '300px' : '60px'}`}
	class={clsx(
		'absolute z-50 top-0 lg:relative',
		'h-full max-w-full flex flex-col  p-6  sm:bg-gray-100 sm:shadow-2xl',
		{
			'bg-transparent shadow-none': !expanded,
			'bg-gray-100 shadow-2xl': expanded
		},
		'transition-all ease-in-out duration-700'
	)}
>
	<Button
		on:click={() => (expanded = !expanded)}
		class={clsx(' shrink-0 absolute right-1 top-1', {
			'!text-blue-50 nightwind-prevent hover:!bg-blue-900':
				!expanded && browser && $windowSizeStore && $windowSizeStore.width < 640
		})}
		variant={{ size: 'sm', mode: 'ghost' }}
	>
		{#if expanded}
			<CloseIcon size={18} />
		{:else}
			<MenuIcon size={18} />
		{/if}
	</Button>

	<div
		class={clsx('grow max-w-full flex flex-col relative gap-4', 'transition-all ease-in-out', {
			'duration-300 opacity-0 pointer-events-none -z-50': !expanded,
			'duration-1000 opacity-1 z-50': expanded
		})}
	>
		<div
			class={clsx(
				'shrink-0 self-center grid place-items-center p-6 rounded-full bg-blue-900 text-gray-100 shadow-md relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-500'
			)}
		>
			<Bubbles animationDuration={5000} />
			<UserIcon size={72} />
		</div>

		<div class={clsx('flex items-center gap-2 justify-center')}>
			<ThemeToggler />
			<Button variant={{ mode: 'ghost' }}><SettingsIcon /></Button>
			<Button variant={{ mode: 'ghost' }} on:click={logout}><LogoutIcon /></Button>
		</div>
		<div class="grow overflow-auto">
			<NavItem href={'/private/home'} label={'Home'}>
				<HomeIcon slot="icon" size={18} />
			</NavItem>
			<NavItemGroup
				label={'Tables'}
				children={[
					{
						label: 'Paginated Table',
						href: '/private/table/paginated'
					},
					{
						label: 'Virtualized Table',
						href: '/private/table/virtualized'
					}
				]}
			>
				<TableIcon slot="icon" size={18} />
			</NavItemGroup>
		</div>
	</div>
</div>
