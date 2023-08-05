<script lang="ts">
	import KeyIcon from '$lib/client/assets/icons/KeyIcon.svelte';
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import Input from '$lib/client/components/input/Input.svelte';
	import clsx from 'clsx';

	export let form;
</script>

<svelte:head>
	<title>Sign-up</title>
</svelte:head>

<form method="POST" class="flex flex-col items-center">
	<div class="w-full max-w-sm mb-8">
		<Input
			name={'username'}
			label={'Username'}
			placeholder={'Enter a username'}
			error={form?.username}
		>
			<UserIcon slot="startAddon" />
		</Input>

		<Input
			name={'password'}
			type={'password'}
			label={'Password'}
			placeholder={'Enter a password'}
			error={form?.password}
		>
			<KeyIcon slot="startAddon" />
		</Input>
		<Input
			name={'confirmPassword'}
			type={'password'}
			placeholder={'Confirm the password'}
			error={form?.confirmPassword}
		>
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
</form>
