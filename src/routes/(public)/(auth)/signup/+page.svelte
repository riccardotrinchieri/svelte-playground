<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import KeyIcon from '$lib/client/assets/icons/KeyIcon.svelte';
	import UserIcon from '$lib/client/assets/icons/UserIcon.svelte';
	import Button from '$lib/client/components/button/Button.svelte';
	import Input from '$lib/client/components/input/Input.svelte';
	import { toast } from '$lib/client/features/toaster/toast.svelte';
	import clsx from 'clsx';

	export let form;

	$: {
		if (browser && form?.status === 'success') {
			goto('/login');
			toast.success('User created successfully try to login!');
		}
	}

	$: {
		if (browser && form?.status === 'failed' && form.apiError) {
			toast.error('Something went wrong! Try again later');
		}
	}
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
			error={form?.errors?.username}
		>
			<UserIcon slot="startAddon" />
		</Input>

		<Input
			name={'password'}
			type={'password'}
			label={'Password'}
			placeholder={'Enter a password'}
			error={form?.errors?.password}
		>
			<KeyIcon slot="startAddon" />
		</Input>
		<Input
			name={'confirmPassword'}
			type={'password'}
			placeholder={'Confirm the password'}
			error={form?.errors?.confirmPassword}
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
