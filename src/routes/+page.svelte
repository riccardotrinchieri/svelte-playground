<script lang="ts">
	import SvelteLogo from '$lib/client/assets/icons/SvelteLogo.svelte';
	import Bubbles from '$lib/client/components/bubbles/Bubbles.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import ThemeToggler from '$lib/client/features/theme/components/ThemeToggler.svelte';
	import clsx from 'clsx';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main
	class={clsx(
		'w-full h-full relative bg-gradient-to-b from-blue-900 to-blue-500 flex flex-col items-center justify-center overflow-hidden'
	)}
>
	<div class={clsx('flex flex-col justify-center items-center gap-8')}>
		<div class={clsx('text-blue-950 relative z-10')}>
			<SvelteLogo size={250} />
		</div>
		<div
			class={clsx('flex flex-col gap-2 text-blue-50 max-w-2xl p-4 relative z-10 nightwind-prevent')}
		>
			<h1 class={clsx('text-2xl')}>Welcome to my Svelte playground!</h1>
			<h2>
				To start using the application you need to login or sign-up. <br /> Don't worry during the sign-up
				process you will only be asked to provide a username and a password, no personal information
				is required.
			</h2>
			<div class={clsx('flex items-center justify-center gap-2')}>
				<Button href={'/login'} variant={{ mode: 'outlined' }}>Login</Button>
				<Button href={'/signup'} variant={{ mode: 'outlined' }}>Sign-up</Button>
				<ThemeToggler />
			</div>
		</div>
	</div>

	<Bubbles animationDuration={5000} />
</main>
