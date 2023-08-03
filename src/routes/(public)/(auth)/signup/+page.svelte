<script lang="ts">
	import KeyIcon from '$lib/client/assets/icons/KeyIcon.svelte';
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import Input from '$lib/client/components/input/Input.svelte';
	import clsx from 'clsx';
</script>

<svelte:head>
	<title>Sign-up</title>
</svelte:head>

<div class="w-full max-w-sm mb-8">
	<Input label={'Username'} placeholder={'Enter a username'}>
		<UserIcon slot="startAddon" />
	</Input>

	<Input type={'password'} label={'Password'} placeholder={'Enter a password'}>
		<KeyIcon slot="startAddon" />
	</Input>
	<Input type={'password'} placeholder={'Confirm the password'}>
		<KeyIcon slot="startAddon" />
	</Input>
</div>

<Button class={clsx('mb-4')}>Sign-up</Button>
<span>
	Do you have an account? <a
		href="/login"
		class={clsx('cursor-pointer', 'text-blue-500 hover:text-blue-700')}>Login.</a
	>
</span>
