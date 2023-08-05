<script lang="ts">
	import KeyIcon from '$lib/client/assets/icons/KeyIcon.svelte';
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import Input from '$lib/client/components/input/Input.svelte';
	import clsx from 'clsx';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="w-full max-w-sm mb-8">
	<Input label={'Username'} placeholder={'Enter your username'}>
		<UserIcon slot="startAddon" />
	</Input>

	<Input type={'password'} label={'Password'} placeholder={'Enter your password'}>
		<KeyIcon slot="startAddon" />
	</Input>
</div>

<Button class="mb-2">Login</Button>
<span>
	You don't have an account yet? <a
		href="/signup"
		class={clsx('cursor-pointer', 'text-blue-500 hover:text-blue-700')}>Sign-up.</a
	>
</span>
