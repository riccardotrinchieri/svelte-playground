<script lang="ts">
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import ThemeToggler from '$lib/client/features/theme/components/ThemeToggler.svelte';
	import clsx from 'clsx';
	import Button from '../button/Button.svelte';
	import SettingsIcon from '$lib/client/assets/icons/SettingsIcon.svelte';
	import LogoutIcon from '$lib/client/assets/icons/LogoutIcon.svelte';
	import { goto } from '$app/navigation';
	import NavItem from './NavItem.svelte';
	import HomeIcon from '$lib/client/assets/icons/HomeIcon.svelte';
	import Bubbles from '../bubbles/Bubbles.svelte';
	import NavItemGroup from './NavItemGroup.svelte';
	import TableIcon from '$lib/client/assets/icons/TableIcon.svelte';
	import CloseIcon from '$lib/client/assets/icons/CloseIcon.svelte';
	import MenuIcon from '$lib/client/assets/icons/MenuIcon.svelte';
	import { windowSizeStore } from '$lib/client/features/window-size/windowSizeStore';
	import MagicIcon from '$lib/client/assets/icons/MagicIcon.svelte';
	import { onMount } from 'svelte';
	import UnPinIcon from '$lib/client/assets/icons/UnPinIcon.svelte';
	import PinIcon from '$lib/client/assets/icons/PinIcon.svelte';

	let expanded = false;
	let exapanding = false;
	let expandedFixed = true;

	$: mouseMoveActionsEnabled = $windowSizeStore && $windowSizeStore.width > 1280;

	const logout = () => {
		fetch('/api/auth/logout', { method: 'POST', body: '' }).then(() => {
			goto('/auth/login');
		});
	};

	onMount(() => {
		const deafultExpanded = !!$windowSizeStore && $windowSizeStore.width > 1536;
		expanded = deafultExpanded;
		expandedFixed = deafultExpanded;
	});

	const openNav = () => {
		if (expanded || exapanding) {
			return;
		}
		exapanding = true;
		expanded = true;
		onAnimationEnd();
	};

	const closeNav = ({ onClick }: { onClick: boolean }) => {
		if (!onClick && expandedFixed) {
			return;
		}
		exapanding = true;
		expanded = false;
		onAnimationEnd();
	};

	const onAnimationEnd = () => {
		setTimeout(() => {
			exapanding = false;
		}, 700);
	};
</script>

<nav
	on:mouseleave={() => closeNav({ onClick: false })}
	style={`width:${expanded ? '300px' : '58px'}; min-width:${expanded ? '300px' : '58px'}`}
	class={clsx(
		'absolute z-50 top-0 left-0',
		'h-full max-w-full flex flex-col p-6',
		'transition-all ease-in-out duration-700',
		{
			'bg-transparent shadow-none': !expanded,
			'bg-gray-50 shadow-2xl': expanded
		}
	)}
>
	{#if expanded && mouseMoveActionsEnabled}
		<Button
			on:click={() => (expandedFixed = !expandedFixed)}
			class={clsx(' shrink-0 absolute left-1 top-1')}
			variant={{ size: 'sm', mode: 'ghost' }}
		>
			{#if expandedFixed}
				<UnPinIcon size={18} />
			{:else}
				<PinIcon size={18} />
			{/if}
		</Button>
	{/if}

	<Button
		on:click={() => {
			expanded ? closeNav({ onClick: true }) : openNav();
		}}
		class={clsx(' shrink-0 absolute right-1 top-1', {
			'!text-blue-50 nightwind-prevent hover:!bg-blue-900': !expanded
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
			'duration-300 opacity-1 z-50': expanded
		})}
	>
		<div
			class={clsx(
				'shrink-0 self-center grid place-items-center p-6 rounded-full text-gray-50 shadow-md relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-500'
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
			<NavItem href={'/private/motion'} label={'Motion'}>
				<MagicIcon slot="icon" size={18} />
			</NavItem>
		</div>
	</div>
</nav>
